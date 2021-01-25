import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { DateTime } from "./share/DateTime";
import { UserEntity } from "./User";

@Entity("session")
export class SessionEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: "An unique session key." })
  key!: string;

  @Column({ comment: "User password." })
  passwordHash!: string;

  @OneToOne(() => UserEntity, (user) => user.session, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "userId" })
  user!: UserEntity;
}
