import {
  Controller,
  Res,
  Get,
  Post,
  Delete,
  HttpStatus,
  Body,
  Param,
  ConflictException,
} from '@nestjs/common';
import { CreateMasterDeviceDto } from 'src/master_device/dto/createMasterDevice.dto';
import { MasterDeviceService } from 'src/master_device/services/device/masterdevice.service';
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
        message: 'Devices successfully fetched!',
        master_devices,
      });
    } catch {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching devices!',
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
        message: 'Device successfully created!',
        created_master_device,
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Serial Nº or IP must be unique, please double check!',
        );
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error creating this device!',
      });
    }
  }

  /** OKOK */
  @Get('/:id')
  async getMasterDevice(@Param('id') id: string, @Res() res): Promise<Device> {
    try {
      const fetched_device = await this.masterDeviceService.getMasterDevice(id);

      if (!fetched_device) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'This device is not found!' });
      } else if (fetched_device.isDeleted) {
        return res
          .status(HttpStatus.GONE)
          .json({ message: 'This device has gone!' });
      } else {
        return res.status(HttpStatus.OK).json({
          message: 'Device successfully fetched!',
          fetched_device,
        });
      }
    } catch {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error creating this device!',
      });
    }
  }

  /** OKOK */
  @Delete('/delete/:id')
  async deleteMasterDevice(@Param('id') id: string, @Res() res) {
    try {
      const fetched_device = await this.masterDeviceService.getMasterDevice(id);

      if (!fetched_device) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'There is no such device!' });
      } else if (fetched_device.isDeleted) {
        return res
          .status(HttpStatus.GONE)
          .json({ message: 'Ups! This device was already deleted!' });
      } else if (fetched_device.peripherals.length > 0) {
        return res.status(HttpStatus.CONFLICT).json({
          message: 'This device has peripherals, please delete them first!',
        });
      } else {
        const deleted_master_device =
          await this.masterDeviceService.deleteMasterDevice(id);

        return res.status(HttpStatus.OK).json({
          message: 'This device was successfully deleted!',
          deleted_master_device,
        });
      }
    } catch {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting this device!',
      });
    }
  }
}
