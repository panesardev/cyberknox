import 'reflect-metadata';
import { DataSource } from "typeorm";
import { User } from './domains/users/user.entity';
import { Account } from './domains/accounts/account.entity';
import { Address } from './domains/addresses/address.entity';
import { Card } from './domains/cards/card.entity';
import { Transaction } from './domains/transactions/transaction.entity';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: true,
  entities: [User, Account, Address, Card, Transaction],
})

export const UserRepository = AppDataSource.getRepository(User);
export const AccountRepository = AppDataSource.getRepository(Account);
export const AddressRepository = AppDataSource.getRepository(Address);
export const CardRepository = AppDataSource.getRepository(Card);
export const TransactionRepository = AppDataSource.getRepository(Transaction);
