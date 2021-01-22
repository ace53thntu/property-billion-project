import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {Properties} from "./Properties"
import {Services} from "./Services"

@Entity()
export class PropertiesServices {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Properties, property => property.propertiesServices)
  property!: Properties[];

  @ManyToOne(() => Services, service => service.propertiesServices)
  service!: Services[];
}
