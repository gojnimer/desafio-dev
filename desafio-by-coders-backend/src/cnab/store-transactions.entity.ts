import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum CnabOperationType {
  'Débito' = 1,
  'Boleto' = 2,
  'Financiamento' = 3,
  'Crédito' = 4,
  'Recebimento Empréstimo' = 5,
  'Vendas' = 6,
  'Recebimento TED' = 7,
  'Recebimento DOC' = 8,
  'Aluguel' = 9,
}

@Entity()
export class StoreTransactions {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Tipo da Operação',
    enum: CnabOperationType,
  })
  @Column()
  type: number;

  @ApiProperty({
    description: 'Data da operação',
  })
  @Column()
  date: string;

  @ApiProperty({
    description: 'Hora da operação',
  })
  @Column()
  timestamp: string;

  @ApiProperty({
    description: 'Valor da operação',
  })
  @Column()
  value: number;

  @ApiProperty({
    description: 'Documento do propietário',
  })
  @Column()
  ownerDocument: string;

  @ApiProperty({
    description: 'Cartão usado na operação',
  })
  @Column()
  bankCard: string;

  @ApiProperty({
    description: 'Nome do propietário',
  })
  @Column()
  ownerName: string;

  @ApiProperty({
    description: 'Nome da loja',
  })
  @Column()
  storeName: string;
}
