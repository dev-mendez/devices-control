import { IsNotEmpty, IsString, Matches, Validate } from 'class-validator';
import { SerialNumberIsUnique } from './valitations/uniqueserialnumber';

export class CreateMasterDeviceDto {
  @IsNotEmpty()
  @IsString()
  @Validate(SerialNumberIsUnique)
  serialNumber: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    {
      message: 'IPV4 address is not valid!',
    },
  )
  ipV4: string;
}
