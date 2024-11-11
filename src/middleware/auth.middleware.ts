import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class MiddlewareAuth implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...')
    console.log(req, res)

    next()
  }
}
