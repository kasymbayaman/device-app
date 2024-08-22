import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDeviceDto {
  @IsUUID()
  brandId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
