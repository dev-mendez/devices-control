import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsDate,
  Validate,
} from 'class-validator';

import { MaxPeripheralsByDevice } from './valitations/maxperipherals';

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

  @Validate(MaxPeripheralsByDevice)
  @IsNotEmpty()
  @IsString()
  idMasterDevice: string;
}
