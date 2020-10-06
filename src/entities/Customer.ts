import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  photo: string;

  @ManyToOne(() => User, (user) => user.createdCustomers)
  @JoinColumn({ name: "createdBy", referencedColumnName: "id" })
  createdBy: User["id"];

  @ManyToOne(() => User, (user) => user.updatedCustomers, {
    onUpdate: "RESTRICT",
    nullable: true,
  })
  @JoinColumn({ name: "lastUpdatedBy", referencedColumnName: "id" })
  lastUpdatedBy: User["id"];
}
