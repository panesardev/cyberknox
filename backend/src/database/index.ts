import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Address, Card, User } from "./entities";

require('dotenv').config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: true,
  entities: [User, Address, Card],
})

export const UserRepository = AppDataSource.getRepository(User);
export const AddressRepository = AppDataSource.getRepository(Address);
export const CardRepository = AppDataSource.getRepository(Card);
