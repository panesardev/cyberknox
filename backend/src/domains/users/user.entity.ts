import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'cyberknox_users' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;
  
  @Column()
  firstName: string;
  
  @Column()
  lastName: string;
  
  @Column()
  addressId: number;
  
  @Column()
  checkingAccountId: number;
  
  @Column()
  savingsAccountId: number;

  @Column()
  creditCardId: number;
  
  @Column()
  debitCardId: number;
  
  @Column()
  createdAt: Date;
}
