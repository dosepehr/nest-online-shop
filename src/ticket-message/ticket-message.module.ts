import { Module } from '@nestjs/common';
import { TicketMessageService } from './ticket-message.service';
import { TicketMessageController } from './ticket-message.controller';

@Module({
  controllers: [TicketMessageController],
  providers: [TicketMessageService],
})
export class TicketMessageModule {}
