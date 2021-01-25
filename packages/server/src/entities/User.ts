import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { RoleEntity } from "./Role";
import { PropertyEntity } from "./Property";
import { DateTime } from "./share/DateTime";
import { SessionEntity } from "./Session";

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

@Entity("user")
export class UserEntity extends DateTime {
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

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role!: RoleEntity;

  @OneToMany(() => PropertyEntity, (property) => property.user)
  properties!: PropertyEntity[];

  @OneToOne(() => SessionEntity, (session) => session.user)
  session!: SessionEntity;
}
