/* eslint-disable prettier/prettier */
import { StoreTransactions } from './../src/cnab/store-transactions.entity';
import { CnabService } from './../src/cnab/cnab.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CnabController (e2e)', () => {
  let app: INestApplication;
  const cnabService = {
    createMany: (data: StoreTransactions[]) =>
      data.map((transaction, i) => ({ id: i + 1, ...transaction })),
    findAll: async () => await Promise.resolve(mock),
    delete: async (id) => await Promise.resolve(id),
    clear: async () => await Promise.resolve(null)
  };
  const mock = [
    {
      id: 1,
      type: 1,
      date: '00000000',
      value: 200,
      ownerDocument: '00000000000',
      bankCard: '000000000000',
      timestamp: '000000',
      storeName: 'Test Store',
      ownerName: 'John Doe',
    },
  ];
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CnabService)
      .useValue(cnabService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cnab (Fetch all records from transaction table)', () => {
    return request(app.getHttpServer()).get('/cnab').expect(200).expect(mock);
  });

  it('/cnab (Write records on transaction table)', () => {
    return request(app.getHttpServer())
      .post('/cnab')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .send(mock.map(({ id, ...transaction }) => transaction))
      .expect(201)
      .expect(mock);
  });

  it('/cnab/delete (Delete one record by id)', () => {
    return request(app.getHttpServer()).delete('/cnab/delete/1').expect(200);
  });

  it('/cnab/clear (Clear all records)', () => {
    return request(app.getHttpServer()).delete('/cnab/clear').expect(200);
  });
});
