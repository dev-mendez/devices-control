import { CreatePeripheralDto } from 'src/master_device/dto/createperipheral.dto';
import { Injectable } from '@nestjs/common';
import { IPeripheral } from '../../types/peripheral.td';
import { Device } from 'src/master_device/types/device.td';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PeripheralService {
  constructor(
    @InjectModel('MasterDevice')
    private readonly masterDeviceModel: Model<Device>,
    @InjectModel('Peripheral')
    private readonly peripheralModel: Model<IPeripheral>,
  ) {}

  async addPeripheral(
    idMasterDevice: string,
    addPeripheralDto: CreatePeripheralDto,
  ): Promise<IPeripheral> {
    const newPeripheral = new this.peripheralModel(addPeripheralDto);
    newPeripheral.idMasterDevice = idMasterDevice;

    const savedPheripheral = await newPeripheral.save();

    await this.masterDeviceModel.findOneAndUpdate(
      { _id: idMasterDevice },
      { $push: { peripherals: savedPheripheral } },
    );
    return savedPheripheral;
  }

  async deletePeripheral(id: string): Promise<IPeripheral> {
    const deletePeripheral = await this.peripheralModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    return deletePeripheral;
  }
}
