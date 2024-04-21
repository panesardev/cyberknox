import { UserRepository } from "../../../src/database";
import { User } from "./user.entity";

export namespace UserService {
  export async function findById(id: User['id']): Promise<User> {
    return await UserRepository.findOneBy({ id });
  }
  
  export async function findByEmail(email: User['email']): Promise<User> {
    return await UserRepository.findOneBy({ email });
  }

  export async function create(user: User): Promise<User> {
    user.createdAt = new Date();
    return await UserRepository.save(user);
  }

  export async function update(user: User): Promise<User> {
    return await UserRepository.save(user);
  }
  
  export async function remove(user: User): Promise<void> {
    await UserRepository.delete(user);
  }
}
