import { DatabaseUniqueKey, ProductEntityConstant } from "@core-constants";
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique
} from "typeorm";
import { BaseModifiableEntityWithoutIdentity } from "../base-entities/base-modifiable-without-identity-entity";
import { Category } from "./category.entity";
import { Review } from "./review.entity";

@Entity("product")
@Unique(DatabaseUniqueKey.ProductExternalId, ["externalProductId"])
export class Product extends BaseModifiableEntityWithoutIdentity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index("IDX_PRODUCT_EXTERNAL_ID")
    @Column({
        type: "varchar",
        length: ProductEntityConstant.ExternalIdMaxLength,
        name: "external_product_id",
        nullable: false
    })
    externalProductId: string;

    @Index("IDX_PRODUCT_NAME")
    @Column({
        type: "varchar",
        length: ProductEntityConstant.NameMaxLength,
        name: "product_name",
        nullable: false
    })
    productName: string;

    @Column({ type: "uuid", name: "category_id", nullable: true })
    categoryId: string | null;

    @Column({
        type: "varchar",
        length: ProductEntityConstant.CategoryPathMaxLength,
        name: "category_path",
        nullable: true
    })
    categoryPath: string | null;

    @Column({
        type: "decimal",
        precision: 12,
        scale: 2,
        name: "discounted_price",
        nullable: true
    })
    discountedPrice: number | null;

    @Column({
        type: "decimal",
        precision: 12,
        scale: 2,
        name: "actual_price",
        nullable: true
    })
    actualPrice: number | null;

    @Column({
        type: "decimal",
        precision: 5,
        scale: 4,
        name: "discount_percentage",
        nullable: true
    })
    discountPercentage: number | null;

    @Index("IDX_PRODUCT_RATING")
    @Column({
        type: "decimal",
        precision: 3,
        scale: 1,
        name: "rating",
        nullable: true
    })
    rating: number | null;

    @Index("IDX_PRODUCT_RATING_COUNT")
    @Column({
        type: "integer",
        name: "rating_count",
        nullable: true
    })
    ratingCount: number | null;

    @Column({
        type: "text",
        name: "about_product",
        nullable: true
    })
    aboutProduct: string | null;

    @ManyToOne(() => Category, (category) => category.products, { nullable: true })
    @JoinColumn({ name: "category_id" })
    category: Category;

    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];
}
