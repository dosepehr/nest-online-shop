import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard } from 'utils/guards/auth.guard';
import { Roles } from 'utils/decorators/roles.decorator';
import { UserRole } from 'utils/enums/user-role.enum';
import { RolesGuard } from 'utils/guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('admin/addresses')
export class AdminAddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  findAllForAdmin() {
    return this.addressService.findAllForAdmin();
  }
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  removeByAdmin(@Param('id') id: string) {
    return this.addressService.removeByAdmin(+id);
  }
}
