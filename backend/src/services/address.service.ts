import { AddressRepository } from "../database";
import { Address } from "../database/entities";

export namespace AddressService {
  export async function findById(id: Address['id']): Promise<Address> {
    return await AddressRepository.findOneBy({ id });
  }

  export async function create(address: Address): Promise<Address> {
    return await AddressRepository.save(address);
  }

  export async function update(address: Address): Promise<Address> {
    return await AddressRepository.save(address);
  }
}
