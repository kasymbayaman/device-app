import { Repository } from 'typeorm';
import { DeviceEntity } from './device.entity';

export type DeviceRepository = Pick<
  Repository<DeviceEntity>,
  'save' | 'update' | 'delete' | 'findOneBy'
>;
