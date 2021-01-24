import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { DateTime } from "./share/DateTime";
import { Users } from "./Users";

@Entity()
export class Sessions extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: "An unique session key." })
  key!: string;

  @Column({ comment: "User password." })
  passwordHash!: string;

  @OneToOne(() => Users, (user) => user.session, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "userId" })
  user!: Users;
}
