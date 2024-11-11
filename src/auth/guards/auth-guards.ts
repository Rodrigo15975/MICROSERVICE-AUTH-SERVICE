import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { HandledRpcException } from '../common/handle-errorst'
import { env } from 'process'

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context.switchToRpc().getData<string>()

    try {
      await this.jwtService.verifyAsync(token, {
        secret: env.AUTH_KEY,
        ignoreExpiration: false,
      })
    } catch (error) {
      console.error({ error })
      throw HandledRpcException.rpcException(
        'Token invalid',
        HttpStatus.BAD_REQUEST,
      )
    }

    return true
  }
}
