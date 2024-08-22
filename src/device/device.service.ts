import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DeviceEntity } from './device.entity';
import { IDevice } from './device.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceRepository } from './device.repository';
import { QueryDevicesDto } from './dto/query-devices.dto';
import { BrandService, IBrandService } from '../brand/brand.service';

const DEFAULT_LIMIT = 100;
const DEFAULT_OFFSET = 0;

export interface IDeviceService {
  create(device: CreateDeviceDto): Promise<IDevice>;
  updateOne(id: string, device: UpdateDeviceDto): Promise<IDevice>;
  findOne(options: FindOptionsWhere<DeviceEntity>): Promise<IDevice>;
  deleteOne(id: string): Promise<void>;
  findMany(params: QueryDevicesDto): Promise<IDevice[]>;
}

@Injectable()
export class DeviceService implements IDeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: DeviceRepository,
    @Inject(BrandService)
    private readonly brandService: IBrandService,
  ) {}

  async create(device: CreateDeviceDto): Promise<IDevice> {
    const savedDevice = await this.deviceRepository.save({
      name: device.name,
      brandId: device.brandId,
    });

    return this.findOne({ id: savedDevice.id });
  }

  async updateOne(id: string, device: UpdateDeviceDto): Promise<IDevice> {
    const updatePayload = {};

    if (device.name) {
      updatePayload['name'] = device.name;
    }

    if (device.brandId) {
      updatePayload['brandId'] = device.brandId;
    }

    if (Object.keys(updatePayload).length !== 0) {
      await this.deviceRepository.update(id, updatePayload);
    }

    return this.deviceRepository.findOneBy({ id });
  }

  async findOne(options: FindOptionsWhere<DeviceEntity>): Promise<IDevice> {
    return this.deviceRepository.findOneBy(options);
  }

  async deleteOne(id: string): Promise<void> {
    await this.deviceRepository.delete(id);
  }

  async findMany(params: QueryDevicesDto): Promise<IDevice[]> {
    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
      name,
      brandName,
    } = params;
    const where = {};

    if (name) {
      where['name'] = name;
    }

    if (brandName) {
      const brand = await this.brandService.findOne({ name: brandName });
      if (!brand) {
        throw new NotFoundException(`Brand by name ${brandName} not found`);
      }

      where['brandId'] = brand.id;
    }

    return this.deviceRepository.find({ where, take: limit, skip: offset });
  }
}
