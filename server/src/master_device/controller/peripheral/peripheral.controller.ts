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
import { AddPeripheralDto } from '../../dto/addperipheral.dto';

@Controller('peripheral')
export class PeripheralController {
  constructor(private readonly peripheralService: PeripheralService) {}

  @Post('/add')
  async addPeripheral(@Body() req: AddPeripheralDto, @Res() res) {
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
      const deletedPeripheral = await this.peripheralService.deletePeripheral(
        id,
      );
      res.status(HttpStatus.OK).json({
        message: 'Peripheral successfully deleted',
        deletedPeripheral,
      });
    } catch {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting peripheral',
      });
    }
  }
}
