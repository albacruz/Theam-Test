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

  @Column({ nullable: true, name: "createdBy" })
  createdBy: number;

  @Column({ nullable: true })
  lastUpdatedBy: number;

  @ManyToOne(() => User, (user) => user.customers, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "createdBy", referencedColumnName: "id" })
  userid: User["id"];
}
