import { DocumentBuilder } from '@nestjs/swagger';
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Online Shop')
  .setDescription('Api of a simple Online Shop')
  .setVersion('1.0')
  .build();
