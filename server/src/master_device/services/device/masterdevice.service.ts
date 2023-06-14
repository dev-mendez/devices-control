import { CreateMasterDeviceDto } from '../../dto/createmasterdevice.dto';
import { Device } from '../../types/device.td';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MasterDeviceService {
  constructor(
    @InjectModel('MasterDevice')
    private readonly masterDeviceModel: Model<Device>,
  ) {}

  async getMasterDevices(): Promise<Device[]> {
    const allMasterDevices = await this.masterDeviceModel.find({
      isDeleted: false,
    });
    return allMasterDevices;
  }

  async getMasterDevice(id: string): Promise<Device> {
    const selectedMasterDevice = await this.masterDeviceModel
      .findById(id)
      .populate({ path: 'peripherals', match: { isDeleted: false } });

    return selectedMasterDevice;
  }

  async createMasterDevice(
    createMasterDeviceDto: CreateMasterDeviceDto,
  ): Promise<Device> {
    const newMasterDevice = new this.masterDeviceModel(createMasterDeviceDto);
    return await newMasterDevice.save();
  }

  async deleteMasterDevice(id: string): Promise<Device> {
    const deleteMasterDevice = await this.masterDeviceModel
      .findByIdAndUpdate(id, { isDeleted: true })
      .populate({
        path: 'peripherals',
        match: { isDeleted: false },
      });
    return deleteMasterDevice;
  }

  async updateMasterDevice(
    id: string,
    createMasterDeviceDto: CreateMasterDeviceDto,
  ): Promise<Device> {
    const updatedMasterDevice = this.masterDeviceModel
      .findByIdAndUpdate(id, createMasterDeviceDto, { new: true })
      .populate({
        path: 'peripherals',
        match: { isDeleted: false },
      });
    return updatedMasterDevice;
  }

  // async findById(idMasterDevice: string): Promise<Device> {
  //   const foundMasterDevice = await this.masterDeviceModel
  //     .findById(idMasterDevice)
  //     .populate({
  //       path: 'peripherals',
  //       match: { isDeleted: false },
  //     });
  //   return foundMasterDevice;
  // }

  async getNumberPeripheral(idMasterDevice: string): Promise<number> {
    const masterDevice = await this.masterDeviceModel
      .findById(idMasterDevice)
      .populate({
        path: 'peripherals',
        match: { isDeleted: false },
      });
    if (masterDevice) return masterDevice.peripherals.length;
    return 0;
  }

  // async findBySN(serialNumber: string): Promise<Device> {
  //   const masterDeviceBySerialNumber = await this.masterDeviceModel
  //     .findOne({
  //       serialNumber,
  //     })
  //     .populate({
  //       path: 'Peripheral',
  //       match: { isDeleted: false },
  //     });
  //   return masterDeviceBySerialNumber;
  // }
}
