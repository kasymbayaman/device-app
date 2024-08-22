import { BaseEntity } from '../database/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { IDevice } from './device.interface';
import { IBrand } from 'src/brand/brand.interface';
import { BrandEntity } from 'src/brand/brand.entity';

@Entity({ name: 'device' })
export class DeviceEntity extends BaseEntity implements IDevice {
  @Index({ unique: true })
  @Column({ type: 'uuid' })
  name: string;

  @Column({ type: 'uuid' })
  @Index()
  brandId: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.devices)
  brand: IBrand;
}
