import { LaunchService } from './../modules/launches/services/launches.service';
import { MainModule } from './../modules/main.module';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LaunchEntity } from '../modules/launches/entities/launches.entity';
import { log } from 'console';

describe('Launch Routes', () => {
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

  it('GET /launches should return all launches', async () => {
    const response = await axiosInstance.get('/launches');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const launches: LaunchEntity[] = response.body;
    launches.forEach((launch) => {
      expect(launch).toHaveProperty('id');
      expect(launch).toHaveProperty('name');
      expect(launch).toHaveProperty('dateUtc');
      expect(launch).toHaveProperty('success');
    });
  });

  it('GET /launches/:id should return a specific launch', async () => {
    const response = await axiosInstance.get('/launches/5eb87cdbffd86e000604b32d');

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('dateUtc');
    expect(response.body).toHaveProperty('success');
  });

  it('GET /launches/success should return successful launches', async () => {
    const response = await axiosInstance.get('/launches/success');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);

    const launches: LaunchEntity[] = response.body;
    launches.forEach((launch) => {
      expect(launch.success).toBe(true);
    });
  });

  it('GET /launches/failure should return failed launches', async () => {
    const response = await axiosInstance.get('/launches/failure');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);

    const launches: LaunchEntity[] = response.body;
    launches.forEach((launch) => {
      expect(launch.success).toBe(false);
    });
  });

  it('GET /launches/capsule/:id should return launches by capsule ID', async () => {
    const response = await axiosInstance.get('/launches/capsule/5e9e2c5bf35918ed873b2664');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /launches/payload/:id should return launches by payload ID', async () => {
    const response = await axiosInstance.get('/launches/payload/5eb0e4b5b6c3bb0006eeb1e1');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /launches/rocket/:id should return launches by rocket ID', async () => {
    const response = await axiosInstance.get('/launches/rocket/5e9d0d95eda69973a809d1ec');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /launches/launchpad/:id should return launches by launchpad ID', async () => {
    const response = await axiosInstance.get('/launches/launchpad/5e9e4502f5090995de566f86');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /launches/launchpad/name/:name should return launches by launchpad name', async () => {
    const response = await axiosInstance.get('/launches/launchpad/name/VAFB');
  
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
  
    const launchpadIdToFind = '5e9e4502f509092b78566f87';
    const launches: LaunchEntity[] = response.body;
    const launchpadFound = launches.some((launch) => launch.launchpad as any === launchpadIdToFind);
  
    expect(launchpadFound).toBe(true);
  });
  

  it('GET /launches/core/:id should return launches by core ID', async () => {
    const response = await axiosInstance.get('/launches/core/5e9e289df35918033d3b2623');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /launches/search/time should return launches within a time period', async () => {
  const startYear = 2012;
  const endYear = 2019;

  const response = (await axiosInstance.post('/launches/search/time').send({
    start_date: startYear,
    end_date: endYear,
  }));

  expect(response.status).toBe(HttpStatus.OK);
  expect(Array.isArray(response.body)).toBe(true);

  const launches: LaunchEntity[] = response.body;
  const areWithinTimePeriod = launches.every((launch) => {
    const launchYear = new Date(launch.dateUnix * 1000).getFullYear();
    return launchYear >= startYear && launchYear <= endYear;
  });

  expect(areWithinTimePeriod).toBe(true);
});
});

// errors
describe('LaunchController (e2e)', () => {
  let app: INestApplication;
  let service: LaunchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<LaunchService>(LaunchService);
  });

  it('/GET all launches error', () => {
    jest.spyOn(service, 'getAllLaunches').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/launches')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launches success error', () => {
    jest.spyOn(service, 'getRocketsSuccess').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/launches/success')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launches failure error', () => {
    jest.spyOn(service, 'getRocketsFailure').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/launches/failure')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/POST search by time error', () => {
    jest.spyOn(service, 'getLaunchesByTimePeriod').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .post('/launches/search/time')
      .send({ start_date: 1234567890, end_date: 1234567899 })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launches by capsule ID error', () => {
    jest.spyOn(service, 'getLaunchesByCapsuleId').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/launches/capsule/1')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launches by payload ID error', () => {
    jest.spyOn(service, 'getLaunchesByPayloadId').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/launches/payload/1')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launches by launchpad ID error', () => {
    jest.spyOn(service, 'getLaunchesByLaunchpadId').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/launches/launchpad/1')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launches by launchpad name error', () => {
    jest.spyOn(service, 'getLaunchesByLaunchpadName').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/launches/launchpad/name/test_name')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launches by rocket ID error', () => {
    jest.spyOn(service, 'getLaunchesByRocketId').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/launches/rocket/1')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launches by core ID error', () => {
    jest.spyOn(service, 'getLaunchesByCoreId').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/launches/core/1')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/GET launch by ID error', () => {
    jest.spyOn(service, 'getLaunchById').mockImplementationOnce(() => {
      throw new Error();
    });

    return request(app.getHttpServer())
      .get('/launches/1')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });


  afterEach(async () => {
    await app.close();
  });
});
