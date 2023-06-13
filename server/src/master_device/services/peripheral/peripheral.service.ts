import { AddPeripheralDto } from 'src/master_device/dto/addperipheral.dto';
import { Injectable } from '@nestjs/common';
import { IPeripheral } from '../../types/peripheral.td';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PeripheralService {
  constructor(
    @InjectModel('Peripheral')
    private readonly peripheralModel: Model<IPeripheral>,
  ) {}

  async addPeripheral(
    idGateway: string,
    addPeripheralDto: AddPeripheralDto,
  ): Promise<IPeripheral> {
    const newPeripheral = new this.peripheralModel(addPeripheralDto);
    newPeripheral.idGateway = idGateway;
    return await newPeripheral.save();
  }

  async deletePeripheral(id: string): Promise<IPeripheral> {
    const deletePeripheral = await this.peripheralModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    return deletePeripheral;
  }
}
