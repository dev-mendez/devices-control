import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CreatePeripheralDto {
  @IsNotEmpty()
  @IsNumber()
  uid: number;

  @IsNotEmpty()
  @IsString()
  vendor: string;

  @IsDate()
  createAt: Date;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  // @Validate(GatewayMaxDevices)
  @IsNotEmpty()
  @IsString()
  idMasterDevice: string;
}
