import { Injectable } from '@nestjs/common';
import { CreateTicketMessageDto } from './dto/create-ticket-message.dto';
import { UpdateTicketMessageDto } from './dto/update-ticket-message.dto';

@Injectable()
export class TicketMessageService {
  create(createTicketMessageDto: CreateTicketMessageDto) {
    return 'This action adds a new ticketMessage';
  }

  findAll() {
    return `This action returns all ticketMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketMessage`;
  }

  update(id: number, updateTicketMessageDto: UpdateTicketMessageDto) {
    return `This action updates a #${id} ticketMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketMessage`;
  }
}
