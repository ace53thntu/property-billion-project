import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Roles } from "./Roles";
import { Properties } from "./Properties";
import { DateTime } from "./share/DateTime";
import { Tokens } from "./Tokens";

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

  @Column()
  phone!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  address1!: string;

  @Column({ nullable: true })
  address2!: string;

  @Column()
  gender!: Gender;

  @Column({ nullable: true })
  avatar!: string;

  @Column({ nullable: true })
  facebook!: string;

  @Column({ nullable: true })
  zalo!: string;

  @Column()
  status!: boolean;

  @ManyToOne(() => Roles, (role) => role.users)
  role!: Roles;

  @OneToMany(() => Properties, (property) => property.user)
  properties!: Properties[];

  @OneToMany(() => Tokens, (token) => token.user)
  tokens!: Tokens[];
}
