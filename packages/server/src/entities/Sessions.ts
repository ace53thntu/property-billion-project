import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { DateTime } from "./share/DateTime";
import { Users } from "./Users";

@Entity()
export class Sessions extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  key!: string;

  @Column()
  passwordHash!: string;

  @OneToOne(() => Users, (user) => user.session)
  user!: Users;
}
