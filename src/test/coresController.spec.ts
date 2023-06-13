import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '../modules/main.module';

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
