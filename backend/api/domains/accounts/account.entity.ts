import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cyberknox_accounts' })
export class Account {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  type: 'SAVINGS' | 'CHECKING';

  @Column()
  balance: number;
}
