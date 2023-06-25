import { Test } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import {
  MasterDevice,
  MasterDeviceSchema,
} from '../src/master_device/schemas/masterdevice.schema';

import {
  Peripheral,
  PeripheralSchema,
} from '../src/master_device/schemas/peripheral.schema';

import mongoose, { Connection, connect, Model } from 'mongoose';
import masterDeviceFakeData from './fakedata/master-device';
import { MasterDeviceModule } from '../src/master_device/masterdevice.module';
import * as dotenv from 'dotenv';

dotenv.config({});

const env = {
  SERVER_URL: process.env.SERVER_URL,
};

describe('MasterDeviceController (e2e)', () => {
  type TPeripheral = {
    /*Just for testing purpose*/
    uid?: number | string;
    vendor?: string;
    status?: boolean;
    idMasterDevice: string | unknown;
  };

  let app: INestApplication;
  let moduleFixture;
  let mongoConnection: Connection;
  let masterDeviceModel: Model<MasterDevice>;
  let peripheralModel: Model<Peripheral>;

  afterEach(async () => {
    const collections = mongoose.connection.collections;
    masterDeviceModel.deleteMany({});
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  afterAll((done) => {
    app.close();
    done();
  });

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            mongoConnection = (await connect(uri)).connection;
            return {
              uri: uri,
            };
          },
        }),
        MasterDeviceModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    useContainer(app.select(MasterDeviceModule), { fallbackOnErrors: true });
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => new BadRequestException(errors),
      }),
    );
    // app.useGlobalFilters(new ValidationExceptionFilter());
    masterDeviceModel = mongoConnection.model(
      'MasterDevices',
      MasterDeviceSchema,
    );
    peripheralModel = mongoConnection.model('Peripherals', PeripheralSchema);

    await app.init();
  });

  const createPeripheral = async () => {
    let peripheral: TPeripheral;

    const masterDeviceDB = await masterDeviceModel.create(
      masterDeviceFakeData[0],
    );

    return (peripheral = {
      uid: 231,
      vendor: 'Nokia',
      status: true,
      idMasterDevice: masterDeviceDB._id,
    });
  };

  it('/peripheral (POST) endpoint insert a new peripheral', async () => {
    const peripheral = await createPeripheral();

    const { status } = await request(env.SERVER_URL)
      .post('peripheral/create')
      .send(peripheral);

    expect(status).toEqual(201);
  });

  it('/peripheral (POST) bad request with empty uid', async () => {
    const peripheral = await createPeripheral();
    peripheral.uid = null;

    const { status } = await request(env.SERVER_URL)
      .post('peripheral/create')
      .send(peripheral);

    expect(status).toEqual(400);
  });

  it('/device (POST) bad request with empty vendor', async () => {
    const peripheral = await createPeripheral();
    peripheral.vendor = null;

    const { status } = await request(env.SERVER_URL)
      .post('peripheral/create')
      .send(peripheral);

    expect(status).toEqual(400);
  });
  it('/device (POST) bad request with empty vendor', async () => {
    const peripheral = await createPeripheral();
    peripheral.vendor = null;

    const { status } = await request(env.SERVER_URL)
      .post('peripheral/create')
      .send(peripheral);

    expect(status).toEqual(400);
  });

  it('/device (POST) bad request with empty idMasterDevice', async () => {
    const peripheral = await createPeripheral();
    peripheral.idMasterDevice = null;

    const { status } = await request(env.SERVER_URL)
      .post('peripheral/create')
      .send(peripheral);

    expect(status).toEqual(400);
  });
});
