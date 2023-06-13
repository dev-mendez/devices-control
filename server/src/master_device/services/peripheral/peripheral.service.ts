import { AddPeripheralDto } from 'src/master_device/dto/addperipheral.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface Peripheral {
  uid: number;
  vendor: string;
  status: boolean;
  idGateway: string;
  isDeleted: boolean;
}

@Injectable()
export class PeripheralService {
  constructor(
    @InjectModel('Peripheral')
    private readonly peripheralModel: Model<Peripheral>,
  ) {}

  async addPeripheral(
    idGateway: string,
    addPeripheralDto: AddPeripheralDto,
  ): Promise<Peripheral> {
    const newPeripheral = new this.peripheralModel(addPeripheralDto);
    newPeripheral.idGateway = idGateway;
    return await newPeripheral.save();
  }

  async deletePeripheral(id: string): Promise<Peripheral> {
    const deletePeripheral = await this.peripheralModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    return deletePeripheral;
  }
}
