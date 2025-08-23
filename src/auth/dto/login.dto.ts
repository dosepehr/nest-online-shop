import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Identifier number is required' })
  @IsString()
  @MinLength(4, { message: 'Identifier must be at least 4 characters' })
  @MaxLength(20, { message: 'Identifier must be at most 10 characters' })
  identifier: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(20, { message: 'Password must be at most 20 characters' })
  password: string;
}
