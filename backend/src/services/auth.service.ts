import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../database";
import { SelectableUser } from "../database/tables";
import { CreateAccountRequestBody, LoginRequestBody } from "../types/auth";
import { generateCard } from "../utilities/card.utilities";

export namespace AuthService {
  export async function login(body: LoginRequestBody): Promise<string> {
    const exists = await db.selectFrom('user').where('email', '==', body.email).executeTakeFirst() as SelectableUser;
    if (exists) {
      const doesPasswordMatch = await bcrypt.compare(body.password, exists.password);
  
      if (doesPasswordMatch) {
        const payload = { userId: exists.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
      }
      else throw Error('wrong password!');
    }
    else throw Error('email not found!');
  }

  export async function createAccount(body: CreateAccountRequestBody): Promise<string> {
    // const alreadyExists = await db.selectFrom('user').where('email', '==', body.user.email).executeTakeFirst();
    // if (alreadyExists) throw Error('user already exists!');

    const insertAddressResult = await db.insertInto('address').values(body.address).executeTakeFirst();
  
    const creditCard = generateCard('CREDIT');
    const insertCreditCardResult = await db.insertInto('card').values(creditCard).executeTakeFirst();
  
    const debitCard = generateCard('DEBIT');
    const insertDebitCardResult = await db.insertInto('card').values(debitCard).executeTakeFirst();
  
    const password = body.user.password;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    body.user.addressId = insertAddressResult.insertId;
    body.user.creditCardId = insertCreditCardResult.insertId;
    body.user.debitCardId = insertDebitCardResult.insertId;
    body.user.password = hashedPassword;
  
    await db.insertInto('user').values(body.user).executeTakeFirstOrThrow();
  
    return await this.login({ email: body.user.email, password });
  }
}
