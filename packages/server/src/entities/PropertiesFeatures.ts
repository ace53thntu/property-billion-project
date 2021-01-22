import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Properties } from "./Properties";
import { Features } from "./Features";
import { DateTime } from "./share/DateTime";

@Entity()
export class PropertiesFeatures extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Properties, (property) => property.propertiesServices)
  property!: Properties[];

  @ManyToOne(() => Features, (feature) => feature.propertiesServices)
  feature!: Features[];
}
