import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Peripheral } from './peripheral.schema';
import mongoose from 'mongoose';

export type MasterDeviceDocument = MasterDevice & Document;

@Schema({
  timestamps: true,
})
export class MasterDevice {
  @Prop({
    unique: true,
    trim: true,
    required: true,
  })
  serialNumber: string;

  @Prop({
    trim: true,
    required: true,
  })
  name: string;

  @Prop({
    unique: true,
    trim: true,
    required: true,
  })
  ipV4: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Peripherals' }])
  Peripherals: [Peripheral];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const MasterDeviceSchema = SchemaFactory.createForClass(MasterDevice);
