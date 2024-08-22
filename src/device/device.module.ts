import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from './device.entity';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity]), BrandModule],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
