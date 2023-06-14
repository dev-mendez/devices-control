import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MasterDeviceService } from '../../services/device/masterdevice.service';

@ValidatorConstraint({ name: 'SerialNumberIsUnique', async: true })
@Injectable()
export class SerialNumberIsUnique implements ValidatorConstraintInterface {
  constructor(private masterDeviceService: MasterDeviceService) {}

  async validate(serialNumber: string) {
    const result = await this.masterDeviceService.findBySN(serialNumber);
    return result === null;
  }

  defaultMessage(_) {
    return 'The serial number must be unique.';
  }
}
