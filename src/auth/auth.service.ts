import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { compareHash, generateHash } from 'utils/funcs/password';
import { LoginDto } from './dto/login.dto';
import { SuccessResponse } from 'utils/interfaces/api-responses.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async register(registerDTO: RegisterDto): Promise<SuccessResponse> {
    const hash = await generateHash(registerDTO.password);
    const user = this.userRepository.create({ ...registerDTO, password: hash });
    await this.userRepository.save(user);
    return {
      status: true,
      message: 'User registered successfully',
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
