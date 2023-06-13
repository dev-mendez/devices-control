import { IsString, IsBoolean, IsArray } from 'class-validator';

export class CreateMasterDeviceDto {
  @IsString()
  serialNumber: string;

  @IsString()
  name: string;

  @IsString()
  ipV4: string;

  @IsArray()
  peripherals: [];

  @IsBoolean()
  isDeleted: boolean;
}
