import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class AddPeripheralDto {
  @IsNotEmpty()
  @IsNumber()
  uid: number;

  @IsNotEmpty()
  @IsString()
  vendor: string;

  createAt: Date;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  // @Validate(GatewayMaxDevices)
  @IsNotEmpty()
  @IsBoolean()
  idMasterDevice: string;
}
