import { StoreTransactions } from './../../cnab/store-transactions.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { CnabService } from '../../cnab/cnab.service';
import { mock } from '../testBed/mock';
describe('CnabService', () => {
  let service: CnabService;
  let connection: Connection;
  const nullAsyncFunction = jest
    .fn()
    .mockImplementation(async () => Promise.resolve(null));
  const mockGetRepository = {
    getRepository: jest.fn().mockImplementation(() => ({
      save: jest
        .fn()
        .mockImplementation(
          async (i) =>
            await (i.id ? Promise.reject(null) : Promise.resolve(null)),
        ),
      find: jest
        .fn()
        .mockImplementation(
          async () => await Promise.resolve(mock.defaultTransactionsList),
        ),
      clear: nullAsyncFunction,
      delete: nullAsyncFunction,
    })),
  };
  const mockConnection = () => ({
    transaction: jest.fn(),
    createQueryRunner: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: mockGetRepository,
    })),
    ...mockGetRepository,
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CnabService,
        {
          provide: Connection,
          useFactory: mockConnection,
        },
      ],
    }).compile();

    service = module.get<CnabService>(CnabService);
    connection = module.get<Connection>(Connection);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMany', () => {
    it('Should create a QueryRunner and write a bunch of new records on DB', async () => {
      await service.createMany(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mock.defaultTransactionsList.map(({ id, ...x }) => ({
          ...x,
        })) as StoreTransactions[],
      );
      expect(connection.createQueryRunner).toBeCalled();
    });
    it('Should create a QueryRunner and fall on catch block', async () => {
      await service.createMany(mock.defaultTransactionsList).catch((e) => e);
      expect(connection.createQueryRunner).toBeCalled();
    });
  });

  describe('findAll', () => {
    it('Should return all Transactions records on db', async () => {
      const fetch = await service.findAll();
      expect(connection.getRepository).toBeCalled();
      expect(fetch).toStrictEqual(mock.defaultTransactionsList);
    });
  });

  describe('clear and delete', () => {
    it('Should clear all transactions records on DB', async () => {
      const clear = await service.clear();
      expect(connection.getRepository).toBeCalled();
      expect(clear).toBeUndefined();
    });

    it('Should delete a specific record on DB', async () => {
      const _delete = await service.delete(1);
      expect(connection.getRepository).toBeCalled();
      expect(_delete).toBeUndefined();
    });
  });
});
