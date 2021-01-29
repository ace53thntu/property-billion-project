import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DateTime } from "./share/DateTime";

@Entity("auth_attempt")
export class AuthAttemptEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  email!: string;

  @Column()
  ip!: string;

  @Column({
    type: "timestamp",
  })
  time!: Date;
}
