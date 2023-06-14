import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsDate,
  Validate,
} from 'class-validator';

import { MaxPeripheralsByDevice } from './validations/maxperipherals';

export class CreatePeripheralDto {
  @IsNotEmpty()
  @IsNumber()
  uid: number;

  @IsNotEmpty()
  @IsString()
  vendor: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsString()
  @Validate(MaxPeripheralsByDevice)
  idMasterDevice: string;
}
