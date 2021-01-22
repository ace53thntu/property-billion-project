import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import {Districts} from "./Districts"
import {Countries} from "./Countries"

@Entity()
export class Provinces {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Countries, country => country.provinces)
  country!: Countries;

  @OneToMany(() => Districts, district => district.province)
  districts!: Districts[];
}
