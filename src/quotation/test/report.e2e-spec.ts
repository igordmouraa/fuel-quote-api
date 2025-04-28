import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('ReportController (e2e)', () => {
  let app: INestApplication;
  let testGasStation: { id: number; name: string };
  let testQuotation: { id: number };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body: stationBody } = await request(app.getHttpServer())
      .post('/gas-station')
      .send({
        name: 'Posto Report',
        city: 'Rio de Janeiro',
        state: 'RJ',
      })
      .expect(201);

    testGasStation = { id: stationBody.id, name: stationBody.name };

    const { body: quotationBody } = await request(app.getHttpServer())
      .post('/quotation')
      .send({
        gasStationId: testGasStation.id,
        gasType: 'ethanol',
        price: 4.2,
        date: '2025-03-15T14:30:00Z',
      })
      .expect(201);

    testQuotation = { id: quotationBody.id };
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/quotation/report (POST)', () => {
    it('should generate fuel report', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/quotation/report')
        .send({
          gasType: 'ethanol',
          initialDate: '2025-03-01T00:00:00Z',
          finalDate: '2025-03-31T23:59:59Z',
          city: 'Rio de Janeiro',
        })
        .expect(201);

      expect(body).toMatchObject({
        quotations: [
          {
            gasType: 'ethanol',
            date: '2025-03-15T14:30:00.000Z',
            price: 4.2,
            gasStation: testGasStation.name,
          },
        ],
        total: 4.2,
      });
    });
  });
});
