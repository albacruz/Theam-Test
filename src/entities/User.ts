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

  @Column({ type: "enum", enum: Role })
  role: Role;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Customer, (customer) => customer.createdBy, {
    onUpdate: "CASCADE",
  })
  createdCustomers: Customer[];
  createdBy: User["id"];

  @OneToMany(() => Customer, (customer) => customer.lastUpdatedBy, {
    onUpdate: "CASCADE",
  })
  updatedCustomers: Customer[];
  lastUpdatedBy: User["id"];
}
