import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {PropertiesFeatures} from "./PropertiesFeatures"

@Entity()
export class Features {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({nullable: true})
  description!: string;

  @OneToMany(() => PropertiesFeatures, ps => ps.feature)
  propertiesServices!: PropertiesFeatures[];
}
