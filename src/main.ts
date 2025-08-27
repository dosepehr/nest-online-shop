import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from 'config/swagger.config';
import { QueryExceptionFilter } from 'utils/filters/query-exception.filter';

async function bootstrap() {
  // app global pipes
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new QueryExceptionFilter());

  // swagger config
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  // global port
  const PORT = process.env.PORT ?? 3000;
  console.log(`app is running on port ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
