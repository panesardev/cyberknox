import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface UserTable {
  id: Generated<number>;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  addressId: bigint;
  creditCardId: bigint;
  debitCardId: bigint;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export type SelectableUser = Selectable<UserTable>;
export type InsertableUser = Insertable<UserTable>;
export type UpdateableUser = Updateable<UserTable>;

export interface AddressTable {
  id: Generated<number>;
  houseNumber: number;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

export type SelectableAddress = Selectable<AddressTable>;
export type InsertableAddress = Insertable<AddressTable>;
export type UpdateableAddress = Updateable<AddressTable>;

export interface CardTable {
  id: Generated<number>;
  number: bigint;
  cvv: number;
  expiry: string;
  type: 'CREDIT' | 'DEBIT';
}

export type SelectableCard = Selectable<CardTable>;
export type InsertableCard = Insertable<CardTable>;
export type UpdateableCard = Updateable<CardTable>;
