import { MainModule } from './../modules/main.module';
import { CoresService } from '../modules/cores/services/cores.service';
import { CoresController } from '../modules/cores/controller/cores.controller'
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Cores Routes', () => {
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

  it('GET /cores should return all cores', async () => {
    const response = await axiosInstance.get('/cores');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const cores = response.body;
    cores.forEach((core) => {
      expect(core).toHaveProperty('id');
      expect(core).toHaveProperty('serial');
      expect(core).toHaveProperty('status');
    });
  });

  it('GET /cores/:id should return a specific core', async () => {
    const response = await axiosInstance.get('/cores/5e9e28a7f3591817f23b2663');

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('serial');
    expect(response.body).toHaveProperty('status');
  });

  it('GET /cores/rtls-landings should return cores ordered by RTLS landings', async () => {
    const response = await axiosInstance.get('/cores/rtls-landings');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);

    const cores = response.body;
    let maxRtlsLandings = cores[0].rtls_landings;
    cores.forEach((core) => {
      expect(core.rtls_landings).toBeLessThanOrEqual(maxRtlsLandings);
      maxRtlsLandings = core.rtls_landings;
    });
  });

  it('GET /cores/asds-attempts should return cores ordered by ASDS attempts', async () => {
    const response = await axiosInstance.get('/cores/asds-attempts');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);

    const cores = response.body;
    let maxAsdsAttempts = cores[0].asds_attempts;
    cores.forEach((core) => {
      expect(core.asds_attempts).toBeLessThanOrEqual(maxAsdsAttempts);
      maxAsdsAttempts = core.asds_attempts;
    });
  });

  it('GET /cores/asds-landings should return cores ordered by ASDS landings', async () => {
    const response = await axiosInstance.get('/cores/asds-landings');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);

    const cores = response.body;
    let maxAsdsLandings = cores[0].asds_landings;
    cores.forEach((core) => {
      expect(core.asds_landings).toBeLessThanOrEqual(maxAsdsLandings);
      maxAsdsLandings = core.asds_landings;
    });
  });
});


// errors
describe('CoresController (e2e)', () => {
  let app: INestApplication;
  let service: CoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<CoresService>(CoresService);
  });

  it('/GET all cores error', () => {
    jest.spyOn(service, 'getAllCores').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/cores')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launches by rtls landings error', () => {
    jest.spyOn(service, 'getLaunchesByRtlsLandings').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/cores/rtls-landings')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launches by asds attempts error', () => {
    jest.spyOn(service, 'getLaunchesByAsdsAttempts').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/cores/asds-attempts')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launches by asds landings error', () => {
    jest.spyOn(service, 'getLaunchesByAsdsLandings').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/cores/asds-landings')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET core by id error', () => {
    jest.spyOn(service, 'getCoreById').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/cores/123')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  afterEach(async () => {
    await app.close();
  });
});
