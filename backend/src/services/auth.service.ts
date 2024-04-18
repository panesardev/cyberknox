import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateAccountRequestBody, LoginRequestBody } from "../types/auth";
import { UserService } from './user.service';
import { AddressService } from './address.service';
import { CardService } from './card.service';

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
    const { id: creditCardId } = await CardService.create('CREDIT');
    const { id: debitCardId } = await CardService.create('DEBIT');
    
    const password = body.user.password;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    body.user.addressId = addressId;
    body.user.creditCardId = creditCardId;
    body.user.debitCardId = debitCardId;
    body.user.password = hashedPassword;
  
    await UserService.create(body.user);
  
    return await this.login({ email: body.user.email, password });
  }
}
