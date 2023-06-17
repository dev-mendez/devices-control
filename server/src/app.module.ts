import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterDeviceModule } from './master_device/masterdevice.module';

@Module({
  imports: [
    MasterDeviceModule,
    MongooseModule.forRoot('mongodb://localhost:27017/devices-control'),
  ],
})
export class AppModule {}
