import { IsString, IsArray } from 'class-validator';

export class AddPeripheralDto {
  @IsString()
  uid: number;

  @IsString()
  vendor: string;

  @IsArray()
  status: boolean;

  @IsString()
  idGateway: string;

  @IsArray()
  isDeleted: boolean;
}
