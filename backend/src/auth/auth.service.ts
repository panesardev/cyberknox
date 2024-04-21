import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";
import { UserService } from '../domains/users/user.service';
import { AddressService } from '../domains/addresses/address.service';
import { CardService } from '../domains/cards/card.service';
import { AccountService } from '../domains/accounts/account.service';

export namespace AuthService {
  export async function login(body: LoginRequestBody): Promise<string> {
    const exists = await UserService.findByEmail(body.email);
    if (exists) {
      const doesPasswordMatch = await bcrypt.compare(body.password, exists.password);
  
      if (doesPasswordMatch) {
        const payload = { userId: exists.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
      }
      else throw Error('wrong password!');
    }
    else throw Error('user not found!');
  }

  export async function createAccount(body: CreateAccountRequestBody): Promise<string> {
    const exists = await UserService.findByEmail(body.user.email);
    if (exists) throw Error('user already exists!');

    const { id: addressId } = await AddressService.create(body.address);
    body.user.addressId = addressId;

    const { id: creditCardId } = await CardService.create('CREDIT');
    body.user.creditCardId = creditCardId;

    const { id: debitCardId } = await CardService.create('DEBIT');
    body.user.debitCardId = debitCardId;

    const { id: checkingAccountId } = await AccountService.create('CHECKING');
    body.user.checkingAccountId = checkingAccountId;

    const { id: savingsAccountId } = await AccountService.create('SAVINGS');
    body.user.savingsAccountId = savingsAccountId;
    
    const password = body.user.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    body.user.password = hashedPassword;
  
    await UserService.create(body.user);

    return await login({ email: body.user.email, password });
  }
}
