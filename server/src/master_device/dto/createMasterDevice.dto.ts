import { IsNotEmpty, Matches, Validate } from 'class-validator';
import { SerialNumberIsUnique } from './validations/uniqueserialnumber';

export class CreateMasterDeviceDto {
  @Validate(SerialNumberIsUnique)
  serialNumber: string;

  @IsNotEmpty()
  name: string;

  @Matches(
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    {
      message: 'IPV4 address is not valid!',
    },
  )
  ipV4: string;
}
