import { CategoryEntityConstant, DatabaseUniqueKey } from "@core-constants";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BaseModifiableEntityWithoutIdentity } from "../base-entities/base-modifiable-without-identity-entity";
import { Product } from "./product.entity";

@Entity("category")
@Unique(DatabaseUniqueKey.CategoryName, ["name"])
export class Category extends BaseModifiableEntityWithoutIdentity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar",
        length: CategoryEntityConstant.NameMaxLength,
        name: "name",
        nullable: false
    })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
