import { Document } from 'mongoose';
import { CreateMasterDeviceDto } from '../dto/createmasterdevice.dto';

export interface Device extends Document {
  readonly serialNumber: string;
  readonly name: string;
  readonly ipV4: string;
  readonly peripherals?: Array<CreateMasterDeviceDto>;
  readonly isDeleted: boolean;
}
