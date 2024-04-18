import { InsertableCard } from "../database/tables";

export function generateCard(type: InsertableCard['type']): InsertableCard {
  const randomNumber = Math.floor(Math.random() * (10**16 - 10**15 + 1)) + 10**15;
  let numberString = randomNumber.toString();
  numberString = numberString.padStart(16, '0');
  const number = BigInt(numberString);

  const cvv = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  
  const today = new Date();
  today.setFullYear(today.getFullYear() + 5);
  const expiry = `${today.getMonth()}/${today.getFullYear()}`;

  return { number, cvv, expiry, type };
}

