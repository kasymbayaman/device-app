import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CoreModule } from './core/core.module';
import { DeviceModule } from './device/device.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [DatabaseModule, CoreModule, DeviceModule, BrandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
