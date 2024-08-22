import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { BrandService, IBrandService } from './brand.service';
import { IBrand } from './brand.interface';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brands')
export class BrandController {
  constructor(
    @Inject(BrandService)
    private readonly service: IBrandService,
  ) {}

  @Get()
  getBrands() {
    return this.service.findAll();
  }

  @Get(':id')
  async getBrand(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IBrand> {
    const brand = await this.service.findOne({ id });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.service.create(createBrandDto);
  }
}
