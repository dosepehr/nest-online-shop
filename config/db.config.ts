import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const dbConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'online-shop',
  entities: [
    join(__dirname, '..', 'src', '**', 'entities', '*.entity.{ts,js}'),
  ],

  synchronize: true,
} satisfies TypeOrmModuleOptions;
