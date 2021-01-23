import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { DateTime } from "./share/DateTime";
import { Users } from "./Users";

@Entity()
export class Tokens extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  valid!: boolean;

  @Column()
  expiration!: Date;

  @ManyToOne(() => Users, (user) => user.tokens)
  user!: Users;
}
