import { UserRepository } from "../database";
import { User } from "../database/entities";

export namespace UserService {
  export async function findById(id: User['id']): Promise<User> {
    const { password, ...rest } = await UserRepository.findOneBy({ id });
    return rest as User;
  }
  
  export async function findByEmail(email: User['email']): Promise<User> {
    const { password, ...rest } = await UserRepository.findOneBy({ email });
    return rest as User;
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