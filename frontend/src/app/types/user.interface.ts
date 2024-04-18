export interface User {
  id: bigint;
  email: string;
  firstName: string;
  lastName: string;
  addressId: string;
  creditCardId: string;
  debitCardId: string;
  password: string;
  createdAt: Date | string | undefined | never;
}
