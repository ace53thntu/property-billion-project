import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {Properties} from "./Properties"
import {Features} from "./Features"

@Entity()
export class PropertiesFeatures {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Properties, property => property.propertiesServices)
  property!: Properties[];

  @ManyToOne(() => Features, feature => feature.propertiesServices)
  feature!: Features[];
}
