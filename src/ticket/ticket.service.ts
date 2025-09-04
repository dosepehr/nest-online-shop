import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { SuccessResponse } from 'utils/interfaces/api-responses.interface';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}
  async create(
    user: User,
    createTicketDto: CreateTicketDto,
  ): Promise<SuccessResponse> {
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    });
    await this.ticketRepository.save(ticket);
    return {
      status: true,
      message: 'Ticket is created',
    };
  }

  async findAll(user: User): Promise<SuccessResponse<Ticket[]>> {
    const tickets = await this.ticketRepository.find({
      where: { user: { id: user.id } },
    });
    return {
      status: true,
      data: tickets,
    };
  }

  async findOne(id: number, user: User): Promise<SuccessResponse<Ticket>> {
    const ticket = await this.ticketRepository.findOne({
      where: { user: { id: user.id }, id },
    });
    if (!ticket) {
      throw new NotFoundException();
    }
    return {
      status: true,
      data: ticket,
    };
  }
}
