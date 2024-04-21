import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cyberknox_transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @Column()
  accountId: number;

  @Column()
  type: 'WITHDRAWAL' | 'DEPOSIT';

  @Column()
  amount: number;

  @Column()
  createdAt: Date;
}
