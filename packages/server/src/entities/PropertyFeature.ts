import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PropertyEntity } from "./Property";
import { FeatureEntity } from "./Feature";
import { DateTime } from "./share/DateTime";

@Entity("property_feature")
export class PropertyFeatureEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PropertyEntity, (property) => property.features)
  property!: PropertyEntity[];

  @ManyToOne(() => FeatureEntity, (feature) => feature.propertyFeature)
  feature!: FeatureEntity[];
}
