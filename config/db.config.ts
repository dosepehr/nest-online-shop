import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

// TODO
// not recognize .env file
export const dbConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: 'root',
  password: '',
  database: 'online-shop',
  entities: [
    join(__dirname, '..', 'src', '**', 'entities', '*.entity.{ts,js}'),
  ],

  synchronize: true,
} satisfies TypeOrmModuleOptions;
