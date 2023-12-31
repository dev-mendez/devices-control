import { Document } from 'mongoose';

export interface IPeripheral extends Document {
  readonly uid: number;
  readonly vendor: string;
  readonly status: boolean;
  readonly isDeleted: boolean;
  idMasterDevice: string | unknown;
}
