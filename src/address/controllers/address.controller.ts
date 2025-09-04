import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'utils/guards/auth.guard';
import { RolesGuard } from 'utils/guards/roles.guard';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'utils/decorators/current-user.decorator';
import { AddressService } from '../address.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateAddressDto) {
    return this.addressService.create(user, dto);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.addressService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.addressService.findOne(+id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.addressService.update(+id, user, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.addressService.remove(+id, user);
  }
}
