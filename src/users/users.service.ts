import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SuccessResponse } from 'utils/interfaces/api-responses.interface';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { compareHash } from 'utils/funcs/password';

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
  async login(loginDto: LoginDto): Promise<SuccessResponse> {
    const user = await this.userRepository.findOne({
      where: [{ mobile: loginDto.identifier }, { name: loginDto.identifier }],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordMatch = await compareHash(loginDto.password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('User not found');
    }
    
    return {
      status: true,
      message: 'User logged in successfully',
    };
  }
}
