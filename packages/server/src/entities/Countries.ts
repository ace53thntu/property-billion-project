import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Provinces } from "./Provinces";
import { DateTime } from "./share/DateTime";
@Entity()
export class Countries extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @OneToMany(() => Provinces, (province) => province.country)
  provinces!: Provinces[];
}
