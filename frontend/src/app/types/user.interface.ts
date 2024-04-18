export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  addressId: string;
  creditCardId: string;
  debitCardId: string;
  password: string;
  createdAt: Date | string | undefined | never;
}
