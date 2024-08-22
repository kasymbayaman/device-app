import { IBrand } from 'src/brand/brand.interface';
import { IBaseEntity } from 'src/database/base.entity';

export interface IDevice extends IBaseEntity {
  name: string;
  brand: IBrand;
}
