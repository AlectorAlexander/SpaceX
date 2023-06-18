import { MainModule } from './../modules/main.module';
import { CapsulesService } from './../modules/capsules/services/capsules.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CapsulesEntity } from '../modules/capsules/entities/capsules.entity';

describe('Capsules Routes', () => {
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

  it('GET /capsules should return all capsules', async () => {
    const response = await axiosInstance.get('/capsules');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const capsules: CapsulesEntity[] = response.body;
    capsules.forEach((capsule) => {
      expect(capsule).toHaveProperty('id');
      expect(capsule).toHaveProperty('serial');
      expect(capsule).toHaveProperty('status');
    });
  });

  it('GET /capsules/:id should return a specific capsule', async () => {
    const response = await axiosInstance.get('/capsules/5e9e2c5bf35918ed873b2664');

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('serial');
    expect(response.body).toHaveProperty('status');
  });

  it('GET /capsules/by-times-used should return capsules ordered by times used', async () => {
    const response = await axiosInstance.get('/capsules/by-times-used');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);

    const capsules: CapsulesEntity[] = response.body;
    let maxTimesUsed = capsules[0].reuse_count;
    capsules.forEach((capsule) => {
      expect(capsule.reuse_count).toBeLessThanOrEqual(maxTimesUsed);
      maxTimesUsed = capsule.reuse_count;
    });
  });
});


describe('CapsulesController (e2e)', () => {
  let app: INestApplication;
  let service: CapsulesService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    service = moduleFixture.get<CapsulesService>(CapsulesService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all capsules error', () => {
    jest.spyOn(service, 'getAllCapsules').mockImplementation(() => Promise.reject(new Error()));

    return request(app.getHttpServer())
      .get('/capsules')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET capsules by times used error', () => {
    jest.spyOn(service, 'getCapsulesByTimesUsed').mockImplementation(() => Promise.reject(new Error()));

    return request(app.getHttpServer())
      .get('/capsules/by-times-used')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET capsule by id error', () => {
    jest.spyOn(service, 'getCapsuleById').mockImplementation(() => Promise.reject(new Error()));

    return request(app.getHttpServer())
      .get('/capsules/123')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  afterEach(async () => {
    await app.close();
  });

});

