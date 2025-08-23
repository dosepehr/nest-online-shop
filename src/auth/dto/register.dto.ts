import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Mobile number is required' })
  @IsString()
  @Matches(/^09\d{9}$/, {
    message: 'Mobile number must be a valid Persian mobile (09*********)',
  })
  mobile: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters' })
  @MaxLength(10, { message: 'Name must be at most 10 characters' })
  name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(20, { message: 'Password must be at most 20 characters' })
  password: string;
}
