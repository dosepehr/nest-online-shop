import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':id')
  findOne(@Param('id') phone: string) {
    return this.usersService.findOneByPhone(phone);
  }

}
