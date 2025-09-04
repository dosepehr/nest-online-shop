import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from '../ticket.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { AuthGuard } from 'utils/guards/auth.guard';
import { CurrentUser } from 'utils/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@UseGuards(AuthGuard)
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(user, createTicketDto);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.ticketService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.ticketService.findOne(+id, user);
  }
}
