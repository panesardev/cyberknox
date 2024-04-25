import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AccountService } from '../accounts/account.service';
import { AddressService } from '../addresses/address.service';
import { CardService } from '../cards/card.service';
import { UserService } from '../users/user.service';
import { CreateAccountRequestBody, ExtendedJwtPayload, LoginRequestBody } from "./auth.interface";

export namespace AuthService {
  export async function login(body: LoginRequestBody): Promise<string> {
    const exists = await UserService.findByEmail(body.email);
    if (exists) {
      const doesPasswordMatch = await compare(body.password, exists.password);
  
      if (doesPasswordMatch) {
        const payload: ExtendedJwtPayload = { userId: exists.id };
        const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
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
    const hashedPassword = await hash(password, 10);
    body.user.password = hashedPassword;
  
    await UserService.create(body.user);

    return await login({ email: body.user.email, password });
  }
}
