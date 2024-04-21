import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cyberknox_addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  houseNumber: number;
  
  @Column()
  street: string;
  
  @Column()
  city: string;
  
  @Column()
  country: string;
  
  @Column()
  postalCode: string;
}