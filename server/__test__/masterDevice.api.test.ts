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
    // gatewayModel.deleteMany({});
    const collections = mongoose.connection.collections;

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
      'MasterDeviceSchema',
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

  // it('/masterdevice (GET) detail endpoint', async () => {
  //   const masterDevice = masterDeviceDataFake[0];

  //   const resultDB = await masterDeviceModel.create(masterDevice);
  //   console.log(resultDB._id);
  //   console.log(resultDB._id.toString());
  //   // const {
  //   //   status,
  //   //   body: { name, serialNumber, ipV4 },
  //   // } = await request(env.SERVER_URL).post(`masterdevices/${resultDB._id}`);

  //   //get all data from the bd
  //   const result = await request(env.SERVER_URL).post(
  //     'masterdevices/6493e8fcad7af050596ef698',
  //   );
  //   console.log(result.body);
  //   expect(result.status).toBe(200);

  //   // expect(status).toBe(200);

  //   // expect(name).toEqual(gateWay.name);
  //   // expect(serialNumber).toEqual(gateWay.serialNumber);
  //   // expect(ipV4).toEqual(gateWay.ipV4);
  // });

  // it('/gateways (POST) endpoint inserted new gateways', async () => {
  //   const gateWay = masterDeviceDataFake[0];
  //   const {
  //     status,
  //     body: { name, serialNumber, ipV4 },
  //   } = await request(app.getHttpServer()).post('/gateway').send(gateWay);
  //   expect(status).toBe(201);

  //   expect(name).toEqual(gateWay.name);
  //   expect(serialNumber).toEqual(gateWay.serialNumber);
  //   expect(ipV4).toEqual(gateWay.ipV4);
  // });

  // it('/gateways (POST) bad request with invalid ipV4', async () => {
  //   const {
  //     status,
  //     body: { error },
  //   } = await request(app.getHttpServer()).post('/gateway').send({
  //     serialNumber: 'serial1',
  //     name: 'name1',
  //     ipV4: '270.4.17.5',
  //   });

  //   expect(status).toEqual(400);
  //   expect(error[0].message).toEqual('IPV4 is not valid');
  // });

  // it('/gateways (POST) bad request with empty name', async () => {
  //   const {
  //     status,
  //     body: { error },
  //   } = await request(app.getHttpServer()).post('/gateway').send({
  //     serialNumber: 'serial1',
  //     ipV4: '27.4.17.5',
  //   });

  //   expect(status).toEqual(400);
  //   expect(error[0].message).toEqual('name should not be empty');
  // });

  // it('/gateways (POST) bad request with empty serialNumber', async () => {
  //   const {
  //     status,
  //     body: { error },
  //   } = await request(app.getHttpServer()).post('/gateway').send({
  //     name: 'name1',
  //     ipV4: '27.4.17.5',
  //   });

  //   expect(status).toEqual(400);
  //   expect(error[0].message).toEqual('serialNumber should not be empty');
  // });

  // it('/gateways (POST) bad request with duplicate serialNumber', async () => {
  //   await masterDeviceModel.create({
  //     name: 'name2',
  //     ipV4: '27.4.16.5',
  //     serialNumber: 'serial1',
  //   });

  //   const {
  //     status,
  //     body: { error },
  //   } = await request(app.getHttpServer()).post('/gateway').send({
  //     name: 'name1',
  //     ipV4: '27.4.17.5',
  //     serialNumber: 'serial1',
  //   });

  //   expect(status).toEqual(400);
  //   expect(error[0].message).toEqual('serialNumber must be unique');
  // });
});
