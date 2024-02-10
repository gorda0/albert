import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { resolve } from 'path';
import helmet from 'helmet';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const envFilePath = process.env.ENV_FILE || '.env.development';

  config({ path: resolve(__dirname, '..', envFilePath) });

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const isProduction = process.env.NODE_ENV === 'production';

  app.enableCors({
    origin: [process.env.ALLOWED_ORIGIN],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: undefined,
  });

  app.use(helmet());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: isProduction,
      transform: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();
