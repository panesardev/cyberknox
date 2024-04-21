import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cyberknox_cards' })
export class Card {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('bigint')
  number: bigint;

  @Column()
  cvv: number;

  @Column()
  expiry: string;

  @Column()
  type: 'CREDIT' | 'DEBIT';
}