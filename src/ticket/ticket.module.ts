import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './controllers/ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ticket])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
