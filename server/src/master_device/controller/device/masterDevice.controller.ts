import {
  Controller,
  Request,
  Res,
  Req,
  Get,
  Post,
  Delete,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';

import { CreateMasterDeviceDto } from '../../dto/createmasterdevice.dto';
import { MasterDeviceService } from '../../services/device/masterdevice.service';
import { Device } from 'src/master_device/types/device.td';

@Controller('masterdevices')
export class MasterDeviceController {
  constructor(private readonly masterDeviceService: MasterDeviceService) {}

  // /** OKOK */
  @Get('/')
  async getMasterDevices(@Res() res): Promise<Device[]> {
    try {
      const master_devices: Device[] =
        await this.masterDeviceService.getMasterDevices();
      return res.status(HttpStatus.OK).json({
        message: 'Master devices successfully fetched ',
        master_devices,
      });
    } catch {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching master devices ',
      });
    }
  }

  /** OKOK */
  @Post('/create')
  async createMasterDevice(
    @Body() createMasterDeviceDto: CreateMasterDeviceDto,
    @Res() res,
  ) {
    try {
      const created_master_device =
        await this.masterDeviceService.createMasterDevice(
          createMasterDeviceDto,
        );
      return res.status(HttpStatus.OK).json({
        message: 'Master device successfully created ',
        created_master_device,
      });
    } catch {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating master device',
      });
    }
  }

  /** OKOK */
  @Get('/:id')
  async getMasterDevice(@Param('id') id: string, @Res() res): Promise<Device> {
    const fetched_device = await this.masterDeviceService.getMasterDevice(id);
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
      fetched_device,
    });
  }

  /** OKOK */
  @Delete('/delete/:id')
  async deleteMasterDevice(@Param('id') id: string, @Res() res) {
    const fetched_device = await this.masterDeviceService.getMasterDevice(id);
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
      const deleted_master_device =
        await this.masterDeviceService.deleteMasterDevice(id);
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
