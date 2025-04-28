import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('QuotationController (e2e)', () => {
  let app: INestApplication;
  let testGasStation: { id: number };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/gas-station')
      .send({
        name: 'Posto Teste',
        city: 'São Paulo',
        state: 'SP',
      })
      .expect(201);

    testGasStation = { id: body.id };
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/quotation (POST)', () => {
    it('should create a quotation', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/quotation')
        .send({
          gas_station: testGasStation.id,
          gasType: 'gasoline',
          price: 5.79,
          date: '2025-04-01T10:00:00Z',
        })
        .expect(201);

      expect(body).toMatchObject({
        id: expect.any(Number),
        gasType: 'gasoline',
        price: 5.79,
        date: expect.stringMatching(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/),
        gas_station: testGasStation.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});
