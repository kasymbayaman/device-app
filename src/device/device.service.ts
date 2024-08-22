import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DeviceEntity } from './device.entity';
import { IDevice } from './device.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
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

    if (Object.keys(updatePayload).length > 0) {
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
}
