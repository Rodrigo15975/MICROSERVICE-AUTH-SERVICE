import { HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AuthData, RolesKey } from './auth/types/type-auth'
import { User } from './entities/user-schema'
import { HandledRpcException } from './auth/common/handle-errorst'
import { verifyPassword } from './common/argonHash'

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly modelUser: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(authData: AuthData) {
    return await this.verifyUserExisting(authData)
  }
  private async verifyUserExisting(authData: AuthData) {
    const { password, phone } = authData

    const user = await this.modelUser.findOne({
      phone,
    })

    await this.verifyUserActive(phone)

    if (!user)
      HandledRpcException.rpcException(
        `Credentials incorrect `,
        HttpStatus.BAD_REQUEST,
      )
    const verifyPassword = await this.verifPasswordHash(
      user?.password ?? '',
      password,
    )
    if (!verifyPassword)
      HandledRpcException.rpcException(
        'Credentials incorrect',
        HttpStatus.BAD_REQUEST,
      )

    return await this.getToken(user?.id, user?.role.role as RolesKey)
  }
  private async verifyUserActive(phone: string) {
    const user = await this.modelUser.findOne({
      phone,
    })

    if (!user?.user_active)
      return HandledRpcException.rpcException(
        'Usuario inactivo',
        HttpStatus.BAD_REQUEST,
      )
  }

  private async verifPasswordHash(hashPassword: string, password: string) {
    return await verifyPassword(hashPassword, password)
  }

  private async getToken(id: number, role: RolesKey) {
    const payload = { id, role }
    const auth = await this.jwtService.signAsync(payload)
    return auth
  }

  tokenVerifySuccess(token: string) {
    return {
      message: 'Autentication successfully',
      statusCode: HttpStatus.ACCEPTED,
      success: true,
      token: `Token valited ${token}`,
    }
  }

  async tokenDecoded(token: string) {
    return await this.jwtService.decode(token, {
      complete: true,
    })
  }
}
