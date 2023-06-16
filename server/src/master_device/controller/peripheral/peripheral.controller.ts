import {
  Controller,
  Param,
  Res,
  HttpStatus,
  Body,
  Post,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';

import { PeripheralService } from '../../services/peripheral/peripheral.service';
import { CreatePeripheralDto } from '../../dto/createperipheral.dto';
import { UpdatePeripheralDto } from '../../dto/updatePeripheral.dto';

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

  @Patch('/update/:_id')
  async updatePeripheral(
    @Body() updatePeripheralDto: UpdatePeripheralDto,
    @Res() res,
    @Param('_id') _id: string,
  ) {
    try {
      const updatePeripheral = await this.peripheralService.updatePeripheral(
        <string>_id,
        <UpdatePeripheralDto>updatePeripheralDto,
      );

      return res.status(HttpStatus.OK).json({
        message: 'Peripheral successfully updated!',
        updatePeripheral,
      });
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
          message: 'Peripheral not found!',
        });
      } else if (getPeripheral.isDeleted) {
        res.status(HttpStatus.GONE).json({
          message: 'Peripheral is already deleted!',
        });
      } else if (getPeripheral.status) {
        res.status(HttpStatus.CONFLICT).json({
          message: 'Peripheral is online! Turn off the peripheral first.',
        });
      } else {
        const deletedPeripheral = await this.peripheralService.deletePeripheral(
          id,
        );
        res.status(HttpStatus.OK).json({
          message: 'Peripheral successfully deleted!',
          deletedPeripheral,
        });
      }
    } catch {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting this peripheral!',
      });
    }
  }
}
