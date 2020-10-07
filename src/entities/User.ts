import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
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

  @Column({ nullable: true })
  salt: string;

  @Column({ type: "enum", enum: Role })
  role: Role;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany((type) => Customer, (customer) => customer.userCr, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    eager: true,
  })
  createdCustomers: Customer[];

  @OneToMany((type) => Customer, (customer) => customer.userUp, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    eager: true,
  })
  updatedCustomers: Customer[];
}
