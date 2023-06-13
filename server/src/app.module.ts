import { Module } from '@nestjs/common';
import { MasterDeviceModule } from './master_device/masterdevice.module';

@Module({
  imports: [MasterDeviceModule],
})
export class AppModule {}
