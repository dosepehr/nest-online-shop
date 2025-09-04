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

  //   @ManyToOne(() => User, (user) => user.tickets)
  //   user: User;
  @Column()
  lastAnswerAt: Date;

  @Column({ default: null })
  closedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
