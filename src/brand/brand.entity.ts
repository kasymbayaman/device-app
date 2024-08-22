import { BaseEntity } from '../database/base.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { IBrand } from './brand.interface';
import { DeviceEntity } from 'src/device/device.entity';
import { IDevice } from 'src/device/device.interface';

@Entity({ name: 'device_brand' })
export class BrandEntity extends BaseEntity implements IBrand {
  @Index({ unique: true })
  @Column()
  name: string;

  @OneToMany(() => DeviceEntity, (device) => device.brand)
  devices: IDevice[];
}
