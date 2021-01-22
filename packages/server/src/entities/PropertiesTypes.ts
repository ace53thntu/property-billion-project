import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Properties} from "./Properties"

@Entity()
export class PropertiesTypes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Properties, property => property.propertyType)
  properties!: Properties[];
}
