import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { generateHash } from 'src/utils/funcs/password';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findOneByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { phone } });
  }

  async create(user: RegisterDto): Promise<User> {
    const hashedPassword = await generateHash(user.password);
    user.password = hashedPassword;
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
