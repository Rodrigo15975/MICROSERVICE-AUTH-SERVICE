import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST ?? 'localhost',
      port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
    },
  })

  const config = new DocumentBuilder()
    .setTitle('Documentación de Microservicio Auth Service')
    .setDescription('API de MICROSERSERVICIOS AUTH SERVICE')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('microservice-auth-service', app, document)

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
  await app.startAllMicroservices()
  const port = Number(process.env.PORT || 4003)

  await app.listen(port, () => {
    console.log('Listening in port ', port)
  })
}
bootstrap()
