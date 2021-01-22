import { UpdateDateColumn, CreateDateColumn } from "typeorm";

export abstract class DateTime {
  @CreateDateColumn({
    default: () => "CURRENT_TIMESTAMP",
    type: "timestamp",
    name: "createdAt",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    default: () => "CURRENT_TIMESTAMP",
    type: "timestamp",
    name: "updatedAt",
  })
  updatedAt!: Date;
}
