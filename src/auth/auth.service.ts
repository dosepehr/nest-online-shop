import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { compareHash, generateHash } from 'utils/funcs/password';
import { LoginDto } from './dto/login.dto';
import { SuccessResponse } from 'utils/interfaces/api-responses.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenInterface } from 'utils/interfaces/token.interface';
import { GetMeResponse } from 'utils/interfaces/get-me-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(
    registerDTO: RegisterDto,
  ): Promise<SuccessResponse<TokenInterface>> {
    const hash = await generateHash(registerDTO.password);
    const user = this.userRepository.create({ ...registerDTO, password: hash });
    await this.userRepository.save(user);
    const payload = { id: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      status: true,
      message: 'User registered successfully',
      data: {
        token: access_token,
      },
    };
  }
  async login(loginDto: LoginDto): Promise<SuccessResponse<TokenInterface>> {
    const user = await this.userRepository.findOne({
      where: [{ mobile: loginDto.identifier }, { name: loginDto.identifier }],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatch = await compareHash(loginDto.password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { id: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      status: true,
      message: 'User logged in successfully',
      data: {
        token: access_token,
      },
    };
  }

  async getMe(req): Promise<SuccessResponse<GetMeResponse>> {
    const { password, ...safeUser } = req.user;
    return {
      status: true,
      data: safeUser,
    };
  }
}
