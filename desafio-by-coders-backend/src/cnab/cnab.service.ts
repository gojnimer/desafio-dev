import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { StoreTransactions } from './store-transactions.entity';

@Injectable()
export class CnabService {
  constructor(private connection: Connection) {}

  async createMany(transactions: StoreTransactions[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        transactions.map(async (transaction) => {
          await queryRunner.manager
            .getRepository(StoreTransactions)
            .save(transaction);
        }),
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Ocorreu um erro ao adicionar os registros no banco.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<StoreTransactions[]> {
    return this.connection.getRepository(StoreTransactions).find();
  }

  async clear(): Promise<void> {
    await this.connection.getRepository(StoreTransactions).clear();
  }

  async delete(id: number): Promise<void> {
    await this.connection.getRepository(StoreTransactions).delete(id);
  }
}
