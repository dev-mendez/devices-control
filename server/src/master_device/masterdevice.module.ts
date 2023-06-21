import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MasterDeviceSchema } from 'src/master_device/schemas/masterdevice.schema';
import { PeripheralSchema } from 'src/master_device/schemas/peripheral.schema';
import { MasterDeviceController } from 'src/master_device/controller/device/masterDevice.controller';
import { PeripheralController } from 'src/master_device/controller/peripheral/peripheral.controller';
import { MasterDeviceService } from 'src/master_device/services/device/masterdevice.service';
import { PeripheralService } from 'src/master_device/services/peripheral/peripheral.service';
import { MaxPeripheralsByDevice } from 'src/master_device/dto/validations/maxperipherals';
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