import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Customer } from "./Customer";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: Role })
  role: Role;

  @OneToMany(() => Customer, (customer) => customer.createdBy)
  createdCustomers: Customer[];
  createdBy: User["id"];

  @OneToMany(() => Customer, (customer) => customer.lastUpdatedBy)
  updatedCustomers: Customer[];
  lastUpdatedBy: User["id"];
}
