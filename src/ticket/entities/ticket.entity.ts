import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TicketType } from 'utils/enums/ticket-type.enum';
import { TicketMessage } from 'src/ticket-message/entities/ticket-message.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TicketType,
    default: TicketType.NOT_ANSWERED,
  })
  status: TicketType;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @OneToMany(() => TicketMessage, (ticketMessage) => ticketMessage.ticket)
  messages: TicketMessage[];

  @Column({ type: 'datetime', nullable: true })
  lastAnswerAt: Date;

  @Column({ type: 'datetime', nullable: true })
  closedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
