import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Properties} from "./Properties"

@Entity()
export class PropertiesAudiences {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({nullable: true})
  slug!: string;

  @OneToMany(() => Properties, property => property.propertyAudience)
  properties!: Properties[];
}
