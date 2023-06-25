import mongoose, { connect, connection, Model } from 'mongoose';
import masterDeviceFakeData from '../__test__/fakedata/master-device';
import peripheralFakeData from '../__test__/fakedata/peripheral';
import {
  MasterDevice,
  MasterDeviceSchema,
} from './master_device/schemas/masterdevice.schema';
import {
  Peripheral,
  PeripheralSchema,
} from './master_device/schemas/peripheral.schema';
import * as dotenv from 'dotenv';

dotenv.config({});

const env = {
  API_PORT: process.env.API_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
};

(async function () {
  await connect(env.MONGODB_URI);

  const masterDeviceModel: Model<MasterDevice> = mongoose.model(
    'MasterDevices',
    MasterDeviceSchema,
  );
  const peripheralModel: Model<Peripheral> = mongoose.model(
    'Peripheral',
    PeripheralSchema,
  );

  await masterDeviceModel.deleteMany({});
  await peripheralModel.deleteMany({});

  for (let i = 0; i < masterDeviceFakeData.length; i++) {
    const masterDeviceDB = await masterDeviceModel.create(
      masterDeviceFakeData[i],
    );

    const rn = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
    
    for (let j = 0; j < rn; j++) {
      const peripheral = await peripheralModel.create(peripheralFakeData[i]);
      await masterDeviceModel.findOneAndUpdate(
        { _id: masterDeviceDB._id },
        { $push: { peripherals: peripheral } },
      );
    }
  }

  await connection.close();
})();
