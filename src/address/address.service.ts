import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { SuccessResponse } from 'utils/interfaces/api-responses.interface';
import { UserRole } from 'utils/enums/user-role.enum';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(
    user: User,
    createAddressDto: CreateAddressDto,
  ): Promise<SuccessResponse> {
    const address = this.addressRepository.create({
      ...createAddressDto,
      user,
    });
    await this.addressRepository.save(address);
    return {
      status: true,
      message: 'Address is created',
    };
  }

  async findAll(user: User): Promise<SuccessResponse<Address[]>> {
    const addresses = await this.addressRepository.find({
      where: { user: { id: user.id } },
      relations: ['user'],
    });

    return {
      status: true,
      data: addresses,
    };
  }
  async findAllForAdmin(): Promise<SuccessResponse<Address[]>> {
    const addresses = await this.addressRepository.find({
      relations: ['user'],
    });
    return {
      status: true,
      data: addresses,
    };
  }

  async findOne(id: number, user: User): Promise<SuccessResponse<Address>> {
    const address = await this.addressRepository.findOne({
      where: {
        user: { id: user.id },
        id,
      },
    });
    if (!address) {
      throw new NotFoundException();
    }
    return {
      status: true,
      data: address,
    };
  }

  async update(
    id: number,
    user: User,
    updateAddressDto: UpdateAddressDto,
  ): Promise<SuccessResponse> {
    const address = await this.addressRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!address) {
      throw new NotFoundException();
    }

    Object.assign(address, updateAddressDto);
    await this.addressRepository.save(address);

    return {
      status: true,
      message: 'Address updated successfully',
    };
  }

  async remove(id: number, user: User): Promise<SuccessResponse> {
    const address = await this.addressRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    await this.addressRepository.remove(address);

    return {
      status: true,
      message: 'Address deleted successfully',
    };
  }

  async removeByAdmin(id: number): Promise<SuccessResponse> {
    const address = await this.addressRepository.findOne({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    await this.addressRepository.remove(address);

    return {
      status: true,
      message: 'Address deleted successfully',
    };
  }
}
