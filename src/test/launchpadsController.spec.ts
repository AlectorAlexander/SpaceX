import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '../modules/main.module';

describe('Launchpads Routes', () => {
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

  it('GET /launchpads should return all launchpads', async () => {
    const response = await axiosInstance.get('/launchpads');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const launchpads = response.body;
    launchpads.forEach((launchpad) => {
      expect(launchpad).toHaveProperty('id');
      expect(launchpad).toHaveProperty('name');
      expect(launchpad).toHaveProperty('locality');
      expect(launchpad).toHaveProperty('region');
    });
  });

  it('GET /launchpads/:id should return a specific launchpad', async () => {
    const response = await axiosInstance.get('/launchpads/5e9e4502f509094188566f88');

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('locality');
    expect(response.body).toHaveProperty('region');
  });

  it('GET /launchpads/name/:name should return a launchpad by name', async () => {
    const response = await axiosInstance.get('/launchpads/name/Kwajalein Atoll');

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body[0]).toBeDefined();
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('locality');
    expect(response.body[0]).toHaveProperty('region');
  });

  it('GET /launchpads/locality/:locality should return a launchpad by locality', async () => {
    const response = await axiosInstance.get('/launchpads/locality/Vandenberg');

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body[0]).toBeDefined();
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('locality');
    expect(response.body[0]).toHaveProperty('region');
  });

  it('GET /launchpads/region/:region should return a launchpad by region', async () => {
    const response = await axiosInstance.get('/launchpads/region/California');

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body[0]).toBeDefined();
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('locality');
    expect(response.body[0]).toHaveProperty('region');
  });
});
