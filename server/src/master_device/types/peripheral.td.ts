import { Document } from 'mongoose';

export interface IPeripheral extends Document {
  readonly uid: number;
  readonly vendor: string;
  readonly createAt: Date;
  readonly status: boolean;
  idGateway: string;
}
