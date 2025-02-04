import { Controller, UseGuards } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
import {
  AUTH_LOGIN,
  DECODED_TOKEN,
  VERIFY_TOKEN,
} from './auth/common/auth-event-pattern'
import { AuthUserGuard } from './auth/guards/auth-guards'
import { AuthData } from './auth/types/type-auth'

@Controller()
@ApiTags('Auth-microservice')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(AUTH_LOGIN)
  signIn(@Payload() authData: AuthData) {
    return this.appService.signIn(authData)
  }

  // @UseInterceptors(Interceptor)
  // no era necesario el segudno guard
  // @UseGuards(AuthVerifyTokenGuard)
  //  estaba manejando mal los errores imprtante eso en microservicios
  // pero aprendi decoradores middleware y a manejar errores en microservicios
  // tambien interceptors, se ejecutan luego del guard
  @MessagePattern(VERIFY_TOKEN)
  @UseGuards(AuthUserGuard)
  verifyToken(@Payload() token: string) {
    return this.appService.tokenVerifySuccess(token)
  }

  @MessagePattern(DECODED_TOKEN)
  @UseGuards(AuthUserGuard)
  tokenDecoded(@Payload() token: string) {
    return this.appService.tokenDecoded(token)
  }
}
