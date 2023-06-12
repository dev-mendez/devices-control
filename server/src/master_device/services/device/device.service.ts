import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterDeviceDocument } from '../../schemas/masterdevice.schema';
import { Model } from 'mongoose';

interface MasterDevice {
  serialNumber: string;
  name: string;
  ipV4: string;
  devices: [];
  isDeleted: boolean;
}

interface CreateMasterDeviceDto {
  serialNumber: string;
  name: string;
  ipV4: string;
  devices: [];
  isDeleted: boolean;
}

interface updateMasterDeviceDto {
  serialNumber: string;
  name: string;
  ipV4: string;
  devices: [];
  isDeleted: boolean;
}

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel('MasterDevice')
    private readonly masterDeviceModel: Model<MasterDevice>,
  ) {}

  async getMasterDevices(): Promise<MasterDevice[]> {
    const allMasterDevices = await this.masterDeviceModel
      .find({
        isDeleted: false,
      })
      .populate({
        path: 'Peripheral',
        match: { isDeleted: false },
      });
    return allMasterDevices;
  }
  async getMasterDevice(id: string): Promise<MasterDevice> {
    const selectedGateway = await this.masterDeviceModel.findById(id).populate({
      path: 'Peripheral',
      match: { isDeleted: false },
    });
    return selectedGateway;
  }

  async createMasterDevice(
    createProductDTO: CreateMasterDeviceDto,
  ): Promise<MasterDevice> {
    const newGateway = new this.masterDeviceModel(createProductDTO);
    return await newGateway.save();
  }

  async deleteMasterDevice(id: string): Promise<MasterDevice> {
    const deleteMasterDevice = await this.masterDeviceModel
      .findByIdAndUpdate(id, { isDeleted: true })
      .populate({
        path: 'Peripheral',
        match: { isDeleted: false },
      });
    return deleteMasterDevice;
  }

  async updateMasterDevice(
    id: string,
    createProductDTO: updateMasterDeviceDto,
  ): Promise<MasterDevice> {
    const updatedMasterDevice = this.masterDeviceModel
      .findByIdAndUpdate(id, createProductDTO, { new: true })
      .populate({
        path: 'Peripheral',
        match: { isDeleted: false },
      });
    return updatedMasterDevice;
  }

  async findById(idGateWay: number): Promise<MasterDevice> {
    const foundMasterDevice = await this.masterDeviceModel
      .findById(idGateWay)
      .populate({
        path: 'Peripheral',
        match: { isDeleted: false },
      });
    return foundMasterDevice;
  }

  async getNumberPeripheral(idGateWay: number): Promise<number> {
    const gateway = await this.masterDeviceModel.findById(idGateWay).populate({
      path: 'Peripheral',
      match: { isDeleted: false },
    });
    if (gateway) return gateway.devices.length;
    return 0;
  }

  async findBySN(serialNumber: string): Promise<MasterDevice> {
    const masterDeviceBySerialNumber = await this.masterDeviceModel
      .findOne({
        serialNumber,
      })
      .populate({
        path: 'Peripheral',
        match: { isDeleted: false },
      });
    return masterDeviceBySerialNumber;
  }
}
