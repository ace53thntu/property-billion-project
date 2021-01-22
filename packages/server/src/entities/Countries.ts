import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Provinces} from "./Provinces"

@Entity()
export class Countries {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @OneToMany(() => Provinces, province => province.country)
  provinces!: Provinces[];
}
