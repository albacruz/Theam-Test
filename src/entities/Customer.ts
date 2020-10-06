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

  @Column()
  createdBy: number;

  @Column({ nullable: true })
  lastUpdatedBy: number;

  @ManyToOne(() => User, (user) => user.createdCustomers)
  @JoinColumn({ name: "createdBy", referencedColumnName: "id" })
  userCr: User;

  @ManyToOne(() => User, (user) => user.updatedCustomers, {
    onUpdate: "RESTRICT",
    nullable: true,
  })
  @JoinColumn({ name: "lastUpdatedBy", referencedColumnName: "id" })
  userUp: User;
}
