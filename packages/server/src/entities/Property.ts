import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { WardsEntity } from "./Wards";
import { UserEntity } from "./User";
import { FileEntity } from "./File";
import { PropertyAudienceEntity } from "./PropertyAudience";
import { PropertyTypeEntity } from "./PropertiesType";
import { PropertyServiceEntity } from "./PropertyService";
import { PropertyFeatureEntity } from "./PropertyFeature";
import { DateTime } from "./share/DateTime";

enum Status {
  DONE = "done",
  AVAILABLE = "available",
  WAITING = "waiting",
}

@Entity("property")
export class PropertyEntity extends DateTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "Property title.",
    length: 500,
  })
  title!: string;

  @Column({ nullable: true, comment: "Property description." })
  description!: string;

  @Column({ nullable: true, comment: "The area of the property." })
  area!: number;

  @Column()
  price!: number;

  @Column()
  status!: Status;

  @Column({ type: "decimal", nullable: true })
  feeElectric!: number;

  @Column({ type: "decimal", nullable: true })
  feeWater!: number;

  @Column({ type: "decimal", nullable: true })
  feeOther!: number;

  @Column({ type: "timestamp", nullable: true })
  expiredAt!: string;

  @Column()
  address!: string;

  @Column({ nullable: true })
  long!: string;

  @Column({ nullable: true })
  lat!: string;

  @Column({ nullable: true })
  slug!: string;

  /**
   * Relation columns
   */
  /**
   * Property n - 1 Wards
   */
  @ManyToOne(() => WardsEntity, (ward) => ward.properties)
  ward!: WardsEntity;

  @OneToMany(() => FileEntity, (file) => file.property)
  files!: FileEntity[];

  @OneToMany(() => PropertyServiceEntity, (ps) => ps.property)
  services!: PropertyServiceEntity[];

  @OneToMany(() => PropertyFeatureEntity, (ps) => ps.property)
  features!: PropertyFeatureEntity[];

  @ManyToOne(() => UserEntity, (user) => user.properties)
  user!: UserEntity;

  @ManyToOne(
    () => PropertyAudienceEntity,
    (propertyAudience) => propertyAudience.property
  )
  propertyAudience!: PropertyAudienceEntity;

  @ManyToOne(() => PropertyTypeEntity, (propertyType) => propertyType.property)
  propertyType!: PropertyTypeEntity;
}
