import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PropertyEntity } from "./Property";
import { ServiceEntity } from "./Service";
import { DateTime } from "./share/DateTime";

@Entity("property_service")
export class PropertyServiceEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PropertyEntity, (property) => property.services)
  property!: PropertyEntity[];

  @ManyToOne(() => ServiceEntity, (service) => service.propertyService)
  service!: ServiceEntity[];
}
