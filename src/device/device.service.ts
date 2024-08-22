import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DeviceEntity } from './device.entity';
import { IDevice } from './device.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
  ) {}

  async createDevice(device: IDevice): Promise<IDevice> {
    return this.deviceRepository.save(device);
  }
}
