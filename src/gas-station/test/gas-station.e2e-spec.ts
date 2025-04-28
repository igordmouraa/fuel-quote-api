import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('GasStationController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/gas-station (POST)', () => {
    it('should create a gas station', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/gas-station')
        .send({
          name: 'Posto Ipiranga',
          city: 'São Paulo',
          state: 'SP',
        })
        .expect(201);

      expect(body).toMatchObject({
        id: expect.any(Number),
        name: 'Posto Ipiranga',
        city: 'São Paulo',
        state: 'SP',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});
