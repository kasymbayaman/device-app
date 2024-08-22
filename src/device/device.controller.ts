import {
  Body,
  Controller,
  ParseUUIDPipe,
  Patch,
  Post,
  Get,
  Param,
  NotFoundException,
  Delete,
  Query,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { IDevice } from './device.interface';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { CreateDeviceDto } from './dto/create-device.dto';
import { QueryDevicesDto } from './dto/query-devices.dto';

@Controller('devices')
export class DeviceController {
  constructor(private readonly service: DeviceService) {}

  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.service.create(createDeviceDto);
  }

  @Patch(':id')
  updateDevice(
    @Body() updateDeviceDto: UpdateDeviceDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IDevice> {
    const device = this.service.updateOne(id, updateDeviceDto);

    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  @Get(':id')
  async getDevice(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IDevice> {
    const device = await this.service.findOne({ id });
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  @Delete(':id')
  deleteDevice(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.service.deleteOne(id);
  }

  @Get()
  getDevices(@Query() query: QueryDevicesDto) {
    return this.service.findMany(query);
  }
}
