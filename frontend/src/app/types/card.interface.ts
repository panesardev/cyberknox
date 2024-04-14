export interface Card {
  id: string;
  number: bigint;
  cvv: number;
  exp: string;
  type: CardType;
}

export type CardType = 'CREDIT' | 'DEBIT';
