import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PeripheralDocument = Peripheral & Document;

@Schema({ timestamps: true })
export class Peripheral {
  @Prop({ required: true, index: true })
  uid: number;

  @Prop({ required: true })
  vendor: string;

  @Prop({ default: false })
  status: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  idMasterDevice: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const PeripheralSchema = SchemaFactory.createForClass(Peripheral);
