export interface Card {
  id: number;
  number: bigint;
  cvv: number;
  expiry: string;
  type: 'CREDIT' | 'DEBIT';
}
