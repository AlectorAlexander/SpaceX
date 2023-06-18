import { PayloadsService } from './../modules/payloads/services/payloads.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '../modules/main.module';

describe('Payloads Routes', () => {
  let app: INestApplication;
  let axiosInstance: request.SuperTest<request.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    axiosInstance = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /payloads should return all payloads', async () => {
    const response = await axiosInstance.get('/payloads');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const payloads = response.body;
    payloads.forEach((payload) => {
      expect(payload).toHaveProperty('id');
      expect(payload).toHaveProperty('name');
      expect(payload).toHaveProperty('type');
    });
  });

  it('GET /payloads/:id should return a specific payload', async () => {
    const response = await axiosInstance.get('/payloads/5eb0e4b5b6c3bb0006eeb1e1');

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('type');
  });

  it('GET /payloads/name/:name should return a payload by name', async () => {
    const response = await axiosInstance.get('/payloads/name/TELSTAR_18V');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const payloads = response.body;
    payloads.forEach((payload) => {
      expect(payload).toHaveProperty('id');
      expect(payload).toHaveProperty('name');
      expect(payload).toHaveProperty('type');
    });
  });

  it('GET /payloads/type/:type should return a payload by type', async () => {
    const response = await axiosInstance.get('/payloads/type/Satellite');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const payloads = response.body;
    payloads.forEach((payload) => {
      expect(payload).toHaveProperty('id');
      expect(payload).toHaveProperty('name');
      expect(payload).toHaveProperty('type');
    });
  });
});


// errors

describe('PayloadsController (e2e)', () => {
  let app: INestApplication;
  let service: PayloadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<PayloadsService>(PayloadsService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/GET payloads', () => {
    it('should throw NotFoundException when fail to fetch payloads', async () => {
      jest.spyOn(service, 'getAllPayloads').mockImplementation(() => Promise.reject(new Error()));
      return request(app.getHttpServer())
        .get('/payloads')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/GET payloads/name/:name', () => {
    it('should throw NotFoundException when fail to fetch payload by name', async () => {
      jest.spyOn(service, 'getPayloadByName').mockImplementation(() => Promise.reject(new Error()));
      return request(app.getHttpServer())
        .get('/payloads/name/test_name')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/GET payloads/type/:type', () => {
    it('should throw NotFoundException when fail to fetch payload by type', async () => {
      jest.spyOn(service, 'getPayloadByType').mockImplementation(() => Promise.reject(new Error()));
      return request(app.getHttpServer())
        .get('/payloads/type/test_type')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/GET payloads/:id', () => {
    it('should throw NotFoundException when fail to fetch payload by id', async () => {
      jest.spyOn(service, 'getPayloadById').mockImplementation(() => Promise.reject(new Error()));
      return request(app.getHttpServer())
        .get('/payloads/test_id')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
