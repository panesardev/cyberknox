import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  
  @Column()
  firstName: string;
  
  @Column()
  lastName: string;
  
  @Column()
  addressId: number;
  
  @Column({ unique: true })
  creditCardId: number;
  
  @Column({ unique: true })
  debitCardId: number;
  
  @Column('date')
  createdAt: Date;
}

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  houseNumber: number;
  
  @Column()
  street: string;
  
  @Column()
  city: string;
  
  @Column()
  country: string;
  
  @Column()
  postalCode: string;
}

@Entity({ name: 'cards' })
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