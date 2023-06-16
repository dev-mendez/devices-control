import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdatePeripheralDto {
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
