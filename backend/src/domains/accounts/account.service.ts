import { AccountRepository } from "../../../src/database";
import { Account } from "./account.entity";

export namespace AccountService {
  export async function findById(id: Account['id']): Promise<Account> {
    return await AccountRepository.findOneBy({ id });
  }
  
  export async function create(type: Account['type']): Promise<Account> {
    const account = generateAccount(type);
    return await AccountRepository.save(account);
  }

  export async function update(account: Account): Promise<Account> {
    return await AccountRepository.save(account);
  }

  export async function remove(id: Account['id']): Promise<void> {
    const account = await findById(id);
    await AccountRepository.delete(account);
  }
  
  function generateAccount(type: Account['type']): Account {
    return {
      type,
      balance: 0.00,
    };
  }
}