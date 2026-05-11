import { DatabaseUniqueKey, ReviewEntityConstant } from "@core-constants";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BaseModifiableEntityWithoutIdentity } from "../base-entities/base-modifiable-without-identity-entity";
import { Product } from "./product.entity";

@Entity("review")
@Unique(DatabaseUniqueKey.ReviewProductUserTitle, ["productId", "userName", "reviewTitle"])
export class Review extends BaseModifiableEntityWithoutIdentity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index("IDX_REVIEW_PRODUCT_ID")
    @Column({ type: "uuid", name: "product_id", nullable: false })
    productId: string;

    @Column({
        type: "varchar",
        length: ReviewEntityConstant.UserNameMaxLength,
        name: "user_name",
        nullable: true
    })
    userName: string | null;

    @Column({
        type: "varchar",
        length: ReviewEntityConstant.ReviewTitleMaxLength,
        name: "review_title",
        nullable: true
    })
    reviewTitle: string | null;

    @Column({
        type: "text",
        name: "review_content",
        nullable: true
    })
    reviewContent: string | null;

    @ManyToOne(() => Product, (product) => product.reviews)
    @JoinColumn({ name: "product_id" })
    product: Product;
}
