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
import {
  MasterDeviceSchema,
  MasterDevice,
} from 'src/master_device/schemas/masterdevice.schema';

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

    masterDeviceModel = mongoConnection.model(
      'masterdevices',
      MasterDeviceSchema,
    );

    await app.init();
    await app.listen(80);
  });

  it('/masterdevices (GET) returned all the master-devices', async () => {
    for (let i = 0; i < masterDeviceDataFake.length; i++) {
      await masterDeviceModel.create(masterDeviceDataFake[i]);
    }

    const result = await request(app.getHttpServer()).get('/masterdevices');

    expect(result.status).toBe(200);
  });

  it('/masterdevices (GET) return a specific master-device', async () => {
    const masterDevice = masterDeviceDataFake[0];
    const resultDB = await masterDeviceModel.create(masterDevice);

    const {
      status,
      body: {
        fetched_device: { name, serialNumber, ipV4 },
      },
    } = await request(app.getHttpServer()).get(
      `/masterdevices/${resultDB._id.toString()}`,
    );

    expect(name).toEqual(masterDevice.name);
    expect(serialNumber).toEqual(masterDevice.serialNumber);
    expect(ipV4).toEqual(masterDevice.ipV4);
    expect(status).toBe(200);
  });

  it('/masterdevices (POST) ipv4 invalid', async () => {
    const {
      status,
      body: {
        message: { ...constraints },
      },
    } = await request(app.getHttpServer()).post('/masterdevices/create').send({
      serialNumber: '231asd12',
      name: 'Main_server',
      ipV4: '1.31.1.256',
    });

    expect(constraints[0].constraints.matches).toEqual(
      'IPV4 address is not valid!',
    );
    expect(status).toEqual(400);
  });

  it('/masterdevices (POST)  name can not be empty', async () => {
    const {
      status,
      body: { message },
    } = await request(app.getHttpServer()).post('/masterdevices/create').send({
      name: '',
      serialNumber: '12ssd1',
      ipV4: '27.4.17.5',
    });

    console.log(message[0].constraints.isNotEmpty);

    expect(message[0].constraints.isNotEmpty).toEqual(
      'name should not be empty',
    );
    expect(status).toEqual(400);
  });

  it('/masterdevices (POST) serialNumber can not be empty', async () => {
    const {
      status,
      body: { message },
    } = await request(app.getHttpServer()).post('/masterdevices/create').send({
      name: 'Main_server',
      serialNumber: '',
      ipV4: '1.31.1.21',
    });

    console.log(message[0].constraints.isNotEmpty);

    expect(message[0].constraints.isNotEmpty).toEqual(
      'serialNumber should not be empty',
    );
    expect(status).toEqual(400);
  });

  it('/masterdevices (POST) duplicate serial numbers', async () => {
    await masterDeviceModel.create({
      name: 'name2',
      serialNumber: '21',
      ipV4: '27.4.16.5',
    });

    const {
      status,
      body: { message },
    } = await request(app.getHttpServer()).post('/masterdevices/create').send({
      name: 'Main_server',
      serialNumber: '21',
      ipV4: '1.31.1.21',
    });

    console.log(message);

    expect(message).toEqual(
      'Serial Nº or IP must be unique, please double check!',
    );
    expect(status).toEqual(409);
  });

  it('/masterdevices (POST) duplicate IpV4', async () => {
    await masterDeviceModel.create({
      name: 'name2',
      serialNumber: '21',
      ipV4: '1.1.1.5',
    });

    const {
      status,
      body: { message },
    } = await request(app.getHttpServer()).post('/masterdevices/create').send({
      name: 'Main_server',
      serialNumber: '23',
      ipV4: '1.1.1.5',
    });

    console.log(message);

    expect(message).toEqual(
      'Serial Nº or IP must be unique, please double check!',
    );
    expect(status).toEqual(409);
  });
});
