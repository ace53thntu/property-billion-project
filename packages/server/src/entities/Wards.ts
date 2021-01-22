import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import {Districts} from "./Districts"
import {Properties} from "./Properties"

@Entity()
export class Wards {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;
  
  @Column()
  name!: string;

  @ManyToOne(() => Districts, district => district.wards)
  district!: Districts;

  @OneToMany(() => Properties, property => property.ward)
  properties!: Properties[];
}
