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
    if (user.role === UserRole.ADMIN) {
      // Admin can see all addresses
      const addresses = await this.addressRepository.find({
        relations: ['user'],
      });
      return {
        status: true,
        data: addresses,
      };
    }

    // Regular users can only see their own addresses
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

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
