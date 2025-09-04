import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'config/db.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { TicketModule } from './ticket/ticket.module';
import { TicketMessageModule } from './ticket-message/ticket-message.module';
import { TicketMessageModule } from './ticket-message/ticket-message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    AuthModule,
    AddressModule,
    TicketModule,
    TicketMessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
