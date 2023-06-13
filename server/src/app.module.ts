import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterDeviceModule } from './master_device/masterdevice.module';

@Module({
  imports: [
    MasterDeviceModule,
    MongooseModule.forRoot(
      'mongodb://admin:123@localhost:27017/devices-control?authSource=admin',
    ),
  ],
})
export class AppModule {}
