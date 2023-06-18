import { RocketsService } from './../modules/rockets/services/rockets.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '../modules/main.module';

describe('Rockets Routes', () => {
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

  it('GET /rockets should return all rockets', async () => {
    const response = await axiosInstance.get('/rockets');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /rockets/:id should return a specific rocket', async () => {
    const response = await axiosInstance.get('/rockets/5e9d0d95eda69955f709d1eb'); 

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
  });

  it('GET /rockets/name/:name should return rockets by name', async () => {
    const response = await axiosInstance.get('/rockets/name/Falcon'); 

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /rockets/company/:company should return rockets by company', async () => {
    const response = await axiosInstance.get('/rockets/company/SpaceX'); 
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
  it('GET /rockets/country/:country should return rockets by country', async () => {
    const response = await axiosInstance.get('/rockets/country/Republic_of_the_Marshall_Islands')
  
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
  it('GET /rockets/success should return successful rockets', async () => {
    const response = await axiosInstance.get('/rockets/success');
  
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
  it('GET /rockets/failure should return failed rockets', async () => {
    const response = await axiosInstance.get('/rockets/failure');
  
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
  it('GET /rockets/active should return active rocket', async () => {
    const response = await axiosInstance.get('/rockets/active');
  
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });
  
  it('GET /rockets/falcon should return Falcon rockets', async () => {
    const response = await axiosInstance.get('/rockets/falcon');
  
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
  it('GET /rockets/high-success-rate should return rockets with high success rate', async () => {
    const response = await axiosInstance.get('/rockets/high-success-rate');
  
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
  it('GET /rockets/with-images should return rockets with images', async () => {
    const response = await axiosInstance.get('/rockets/with-images');
  
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
  it('GET /rockets/launched-after/:date should return rockets launched after a specific date', async () => {
    const response = await axiosInstance.get('/rockets/launched-after/2021-01-01'); // use a valid date
  
    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
});

// errors

describe('RocketsController (e2e)', () => {
  let app: INestApplication;
  let service: RocketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<RocketsService>(RocketsService);
  });

  afterEach(async () => {
    await app.close();
  });


  describe('/GET rockets', () => {
    it('should throw an exception when it fails to fetch all rockets', async () => {
      jest.spyOn(service, 'getAllRockets').mockImplementation(() => Promise.reject(new Error()));
      return request(app.getHttpServer())
        .get('/rockets')
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('/GET rockets/pending', () => {
    it('should throw an exception when it fails to fetch the next pending rocket', async () => {
      jest.spyOn(service, 'getRocketPending').mockImplementation(() => Promise.reject(new Error()));
      return request(app.getHttpServer())
        .get('/rockets/pending')
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
  describe('/GET rockets/name/:name', () => {
    it('should throw an exception when it fails to fetch rocket by name', async () => {
        jest.spyOn(service, 'getRocketByName').mockImplementation(() => Promise.reject(new Error()));
        return request(app.getHttpServer())
            .get('/rockets/name/falcon')
            .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
});

describe('/GET rockets/company/:company', () => {
    it('should throw an exception when it fails to fetch rocket by company', async () => {
        jest.spyOn(service, 'getRocketByCompany').mockImplementation(() => Promise.reject(new Error()));
        return request(app.getHttpServer())
            .get('/rockets/company/spacex')
            .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
});

describe('/GET rockets/country/:country', () => {
    it('should throw an exception when it fails to fetch rocket by country', async () => {
        jest.spyOn(service, 'getRocketByCountry').mockImplementation(() => Promise.reject(new Error()));
        return request(app.getHttpServer())
            .get('/rockets/country/usa')
            .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
});


describe('/GET rockets/:id', () => {
    it('should throw an exception when it fails to fetch rocket by id', async () => {
        jest.spyOn(service, 'getRocketById').mockImplementation(() => Promise.reject(new Error()));
        return request(app.getHttpServer())
            .get('/rockets/123')
            .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
});

});

