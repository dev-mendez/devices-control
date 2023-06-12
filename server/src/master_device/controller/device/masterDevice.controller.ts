import {
  Controller,
  Res,
  Get,
  Post,
  Delete,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { CreateMasterDeviceDto } from 'src/master_device/dto/createMasterDevice.dto';

import { DeviceService } from 'src/master_device/services/device/device.service';

@Controller('masterDevice')
export class MasterDeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('/')
  async getMasterDevices(@Res() res) {
    try {
      const master_device = await this.deviceService.getMasterDevices();
      return res.status(HttpStatus.OK).json({
        message: 'Master devices successfully fetched ',
        master_device,
      });
    } catch {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching master devices ',
      });
    }
  }

  @Post('/create')
  async createMasterDevice(
    @Body() createMasterDeviceDto: CreateMasterDeviceDto,
    @Res() res,
  ) {
    try {
      const created_master_device = await this.deviceService.createMasterDevice(
        createMasterDeviceDto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Master device successfully created ',
        created_master_device,
      });
    } catch {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating master device ',
      });
    }
  }

  @Get('/:id')
  async getMasterDevice(@Param('id') id: string, @Res() res) {
    const fetched_device = await this.deviceService.getMasterDevice(id);
    if (!fetched_device) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Master device not found' });
    }
    if (fetched_device.isDeleted) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Master device not found' });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Master device successfully fetched',
    });
  }

  @Delete('/delete/:id')
  async deleteMasterDevice(@Param('id') id: string, @Res() res) {
    const fetched_device = await this.deviceService.getMasterDevice(id);
    if (!fetched_device) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Master device not found' });
    }
    if (fetched_device.isDeleted) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Master device not found' });
    }
    try {
      const deleted_master_device = await this.deviceService.deleteMasterDevice(
        id,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Master device successfully deleted',
        deleted_master_device,
      });
    } catch {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error deleting master device ',
      });
    }
  }
}
