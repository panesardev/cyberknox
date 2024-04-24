import { TransactionRepository } from "../../database";
import { Account } from "../accounts/account.entity";
import { Transaction } from "./transaction.entity";

export namespace TransactionService {
  export async function findAllByAccountId(accountId: Account['id']): Promise<Transaction[]> {
    return await TransactionRepository.findBy({ accountId });
  }
  
  export async function create(transaction: Transaction): Promise<Transaction> {
    return await TransactionRepository.save(transaction);
  }
}
