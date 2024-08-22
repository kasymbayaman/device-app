import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';
import { IBrand } from './brand.interface';
import { CreateBrandDto } from './dto/create-brand.dto';

export interface IBrandService {
  findAll(): Promise<IBrand[]>;
  findOne(options: FindOptionsWhere<BrandEntity>): Promise<IBrand | null>;
  create(brand: CreateBrandDto): Promise<IBrand>;
}

@Injectable()
export class BrandService implements IBrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private repository: Repository<BrandEntity>,
  ) {}

  async findAll(): Promise<BrandEntity[]> {
    return this.repository.find();
  }

  async findOne(
    options: FindOptionsWhere<BrandEntity>,
  ): Promise<IBrand | null> {
    return this.repository.findOneBy(options);
  }

  async create(brand: CreateBrandDto): Promise<IBrand> {
    return this.repository.save({
      name: brand.name,
    });
  }
}
