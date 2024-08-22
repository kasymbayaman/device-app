import { BaseEntity } from '../database/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { IDevice } from './device.interface';
import { IBrand } from 'src/brand/brand.interface';
import { BrandEntity } from 'src/brand/brand.entity';

@Entity({ name: 'device' })
@Index(['brandId', 'name'], { unique: true })
export class DeviceEntity extends BaseEntity implements IDevice {
  @Index({ unique: true })
  @Column()
  name: string;

  @Column({ type: 'uuid' })
  brandId: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.devices, { eager: true })
  brand: IBrand;
}
