import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
