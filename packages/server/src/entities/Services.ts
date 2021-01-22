import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {PropertiesServices} from "./PropertiesServices"

@Entity()
export class Services {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({nullable: true})
  description!: string;

  @OneToMany(() => PropertiesServices, ps => ps.service)
  propertiesServices!: PropertiesServices[];
}
