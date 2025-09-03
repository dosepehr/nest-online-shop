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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AuthGuard } from 'utils/guards/auth.guard';
import { Roles } from 'utils/decorators/roles.decorator';
import { UserRole } from 'utils/enums/user-role.enum';
import { RolesGuard } from 'utils/guards/roles.guard';

import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'utils/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  create(
    @CurrentUser() user: User,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressService.create(user, createAddressDto);
  }

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  findAll(@CurrentUser() user: User) {
    return this.addressService.findAll(user);
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.addressService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
