import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MasterDeviceService } from '../../services/device/masterdevice.service';

@ValidatorConstraint({ name: 'MaxPeripheralsByDevice', async: true })
@Injectable()
export class MaxPeripheralsByDevice implements ValidatorConstraintInterface {
  constructor(private masterDeviceService: MasterDeviceService) {}

  async validate(idMasterDevice: string) {
    const peripherals_amount =
      await this.masterDeviceService.getAmountPeripheral(idMasterDevice);
    console.log(peripherals_amount);
    return peripherals_amount <= 9;
  }

  defaultMessage(_) {
    return 'The device has reached the maximum number of peripherals connected, 10';
  }
}
