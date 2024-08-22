import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateDeviceDto {
  @IsOptional()
  @IsUUID()
  brandId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
}
