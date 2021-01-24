import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Roles } from "./Roles";
import { Properties } from "./Properties";
import { DateTime } from "./share/DateTime";
import { Sessions } from "./Sessions";

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

@Entity()
export class Users extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true, nullable: true })
  phone!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  address1!: string;

  @Column({ nullable: true })
  address2!: string;

  @Column({ default: Gender.Male })
  gender!: Gender;

  @Column({ nullable: true })
  avatar!: string;

  @Column({ nullable: true })
  facebook!: string;

  @Column({ nullable: true })
  zalo!: string;

  @Column({ default: true })
  status!: boolean;

  @ManyToOne(() => Roles, (role) => role.users)
  role!: Roles;

  @OneToMany(() => Properties, (property) => property.user)
  properties!: Properties[];

  @OneToOne(() => Sessions, (session) => session.user)
  session!: Sessions;
}
