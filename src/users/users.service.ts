import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SuccessResponse } from 'utils/interfaces/api-responses.interface';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async register(registerDTO: RegisterDto): Promise<SuccessResponse> {
    const user = this.userRepository.create(registerDTO);
    await this.userRepository.save(user);
    return {
      message: 'User registered successfully',
      status: true,
    };
  }
}
