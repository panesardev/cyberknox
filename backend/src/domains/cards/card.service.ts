import { CardRepository } from "../../../src/database";
import { Card } from "./card.entity";

export namespace CardService {
  export async function findById(id: Card['id']): Promise<Card> {
    return await CardRepository.findOneBy({ id });
  }

  export async function create(type: Card['type']): Promise<Card> {
    const card = generateCard(type);
    return await CardRepository.save(card);
  }

  export async function remove(id: Card['id']): Promise<void> {
    const card = await findById(id);
    await CardRepository.delete(card);
  }

  function generateCard(type: Card['type']): Card {
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
}

