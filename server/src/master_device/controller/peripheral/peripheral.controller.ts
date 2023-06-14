import {
  Controller,
  Param,
  Res,
  HttpStatus,
  Body,
  Post,
  Delete,
} from '@nestjs/common';

import { PeripheralService } from '../../services/peripheral/peripheral.service';
import { CreatePeripheralDto } from '../../dto/createperipheral.dto';

@Controller('peripheral')
export class PeripheralController {
  constructor(private readonly peripheralService: PeripheralService) {}

  @Post('/create')
  async createPeripheral(@Body() req: CreatePeripheralDto, @Res() res) {
    try {
      const { idMasterDevice, ...rest } = req;
      const newPeripheral = await this.peripheralService.addPeripheral(
        idMasterDevice,
        req,
      );
      res
        .status(HttpStatus.CREATED)
        .json({ message: 'Device successfully created!', newPeripheral });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }

  @Delete('/delete/:id')
  async deletePeripheral(@Param('id') id: string, @Res() res) {
    try {
      const getPeripheral = await this.peripheralService.getPeripheral(id);

      if (!getPeripheral) {
        res.status(HttpStatus.NOT_FOUND).json({
          message: 'Peripheral not found.',
        });
      } else if (getPeripheral.isDeleted) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Peripheral is already deleted.',
        });
      } else if (getPeripheral.status) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Peripheral is online. Turn off the peripheral first.',
        });
      } else {
        const deletedPeripheral = await this.peripheralService.deletePeripheral(
          id,
        );
        res.status(HttpStatus.OK).json({
          message: 'Peripheral successfully deleted.',
          deletedPeripheral,
        });
      }
    } catch {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting peripheral.',
      });
    }
  }
}
