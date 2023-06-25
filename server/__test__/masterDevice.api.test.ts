import { Test } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { MasterDeviceModule } from 'src/master_device/masterdevice.module';
import mongoose, { Connection, connect, Model } from 'mongoose';
import masterDeviceDataFake from './fakedata/master-device';
// import { ValidationExceptionFilter } from './../src/exception-filter';
import {
  MasterDeviceSchema,
  MasterDevice,
} from 'src/master_device/schemas/masterdevice.schema';
import * as dotenv from 'dotenv';

dotenv.config({});

const env = {
  SERVER_URL: process.env.SERVER_URL,
};

describe('MasterDeviceController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture;
  let mongoConnection: Connection;
  let masterDeviceModel: Model<MasterDevice>;

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
    await app.init();
  });

  it('/masterdevices (GET) returned all the master-devices', async () => {
    for (let i = 0; i < masterDeviceDataFake.length; i++) {
      await masterDeviceModel.create(masterDeviceDataFake[i]);
    }
    const result = await request(env.SERVER_URL).get('masterdevices');
    expect(result.status).toBe(200);
  });
});
