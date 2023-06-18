import { MasterDeviceController } from './controller/device/masterdevice.controller';
import { PeripheralController } from './controller/peripheral/peripheral.controller';

import { MaxPeripheralsByDevice } from './dto/validations/maxperipherals';

import { PeripheralService } from './services/peripheral/peripheral.service';
import { MasterDeviceService } from './services/device/masterdevice.service';

import { MasterDeviceSchema } from './schemas/masterdevice.schema';
import { PeripheralSchema } from './schemas/peripheral.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MasterDevice',
        schema: MasterDeviceSchema,
      },
      {
        name: 'Peripheral',
        schema: PeripheralSchema,
      },
    ]),
  ],
  controllers: [MasterDeviceController, PeripheralController],
  providers: [MasterDeviceService, PeripheralService, MaxPeripheralsByDevice],
})
export class MasterDeviceModule {}
