import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PropertiesServices } from "./PropertiesServices";
import { DateTime } from "./share/DateTime";

@Entity()
export class Services extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => PropertiesServices, (ps) => ps.service)
  propertiesServices!: PropertiesServices[];
}
