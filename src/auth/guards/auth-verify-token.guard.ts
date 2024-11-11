import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { HandledRpcException } from '../common/handle-errorst'

@Injectable()
export class AuthVerifyTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.switchToRpc().getData<string>()
    const decodedToken = this.jwtService.decode(token)

    if (!decodedToken)
      throw HandledRpcException.rpcException(
        'Invalid token',
        HttpStatus.BAD_REQUEST,
      )

    return true
  }
}
