import { DocumentBuilder } from '@nestjs/swagger';
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Task Management')
  .setDescription('Api of a simple Task management system')
  .setVersion('1.0')
  .build();
