import { createKysely } from '@vercel/postgres-kysely';
import { AddressTable, CardTable, UserTable } from './tables';

require('dotenv').config();

export interface Database {
  user: UserTable,
  address: AddressTable,
  card: CardTable,
}

export const db = createKysely<Database>({
  connectionString: process.env.POSTGRES_URL,
});
