import { StoreTransactions } from './../../cnab/store-transactions.entity';
import { CnabService } from '../../cnab/cnab.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CnabController } from '../../cnab/cnab.controller';
import { Connection } from 'typeorm';
import { mock } from '../testBed/mock';

describe('CnabController', () => {
  let cnabController: CnabController;
  let cnabService: CnabService;
  const mockConnection = () => ({
    transaction: jest.fn(),
    createQueryRunner: jest.fn(),
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CnabController],
      providers: [
        CnabService,
        {
          provide: Connection,
          useFactory: mockConnection,
        },
      ],
    }).compile();

    cnabController = module.get<CnabController>(CnabController);
    cnabService = module.get<CnabService>(CnabService);
  });

  it('should be defined', () => {
    expect(cnabController).toBeDefined();
    expect(cnabService).toBeDefined();
  });

  describe('getTransactions', () => {
    it('Should return all transaction records', async () => {
      jest
        .spyOn(cnabService, 'findAll')
        .mockImplementation(() =>
          Promise.resolve(mock.defaultTransactionsList),
        );

      expect(await cnabController.getTransactions()).toStrictEqual(
        mock.defaultTransactionsList,
      );
    });
  });

  describe('createTransaction', () => {
    it('Should write a array of Transactions records on DB', async () => {
      jest
        .spyOn(cnabService, 'createMany')
        .mockImplementation(() => Promise.resolve(null));
      await cnabController.createTransactions(
        mock.defaultTransactionsList.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id, ...rest }) => rest,
        ) as StoreTransactions[],
      );
      expect(cnabService.createMany).toBeCalled();
    });
  });

  describe('getTransactions', () => {
    it('Should delete a transaction record', async () => {
      jest
        .spyOn(cnabService, 'delete')
        .mockImplementation(() => Promise.resolve(null));
      await cnabController.deleteTransaction(1);
      expect(cnabService.delete).toBeCalled();
    });
  });

  describe('getTransactions', () => {
    it('Should clear transactions table', async () => {
      jest
        .spyOn(cnabService, 'clear')
        .mockImplementation(() => Promise.resolve(null));
      await cnabController.clearTransactions();
      expect(cnabService.clear).toBeCalled();
    });
  });
});
