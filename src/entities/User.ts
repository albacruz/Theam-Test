import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
