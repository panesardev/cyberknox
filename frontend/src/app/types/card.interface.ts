export interface Card {
  id: bigint;
  number: bigint;
  cvv: number;
  expiry: string;
  type: 'CREDIT' | 'DEBIT';
}
