import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterDeviceController } from './master_device/controller/device/masterDevice.controller';
import { PeripheralController } from './master_device/controller/peripheral/peripheral.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/devices-control')],
  controllers: [MasterDeviceController, PeripheralController],
  providers: [],
})
export class AppModule {}
