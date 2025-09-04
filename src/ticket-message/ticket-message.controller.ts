import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketMessageService } from './ticket-message.service';
import { CreateTicketMessageDto } from './dto/create-ticket-message.dto';
import { UpdateTicketMessageDto } from './dto/update-ticket-message.dto';

@Controller('ticket-message')
export class TicketMessageController {
  constructor(private readonly ticketMessageService: TicketMessageService) {}

  @Post()
  create(@Body() createTicketMessageDto: CreateTicketMessageDto) {
    return this.ticketMessageService.create(createTicketMessageDto);
  }

  @Get()
  findAll() {
    return this.ticketMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketMessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketMessageDto: UpdateTicketMessageDto) {
    return this.ticketMessageService.update(+id, updateTicketMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketMessageService.remove(+id);
  }
}
