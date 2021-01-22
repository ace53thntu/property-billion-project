import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Properties } from "./Properties";
import { Services } from "./Services";
import { DateTime } from "./share/DateTime";
@Entity()
export class PropertiesServices extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Properties, (property) => property.propertiesServices)
  property!: Properties[];

  @ManyToOne(() => Services, (service) => service.propertiesServices)
  service!: Services[];
}
