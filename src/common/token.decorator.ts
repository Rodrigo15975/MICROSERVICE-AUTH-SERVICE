import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const TokenValidation = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToRpc().getData() // Contexto del microservicio
    console.log(request)

    // const token = request.token // Aquí asumimos que el token viene en el contexto
    console.log(data)
  },
)
