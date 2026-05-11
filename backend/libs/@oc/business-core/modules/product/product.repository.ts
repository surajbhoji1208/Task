import { Product } from "@core-database";
import { SortDirection } from "@core-enums";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ListProductRequestDto } from "./dto/request/list-product.request.dto";

@Injectable()
export class ProductRepository extends Repository<Product> {
    constructor(
        @InjectRepository(Product)
        repository: Repository<Product>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findProducts(searchRequest: ListProductRequestDto): Promise<[Product[], number]> {
        const qb = this.createQueryBuilder("product")
            .select([
                "product.id",
                "product.externalProductId",
                "product.productName",
                "product.categoryId",
                "product.categoryPath",
                "product.discountedPrice",
                "product.actualPrice",
                "product.discountPercentage",
                "product.rating",
                "product.ratingCount",
                "product.createdAt",
                "product.updatedAt"
            ])
            .leftJoin("product.category", "category")
            .addSelect(["category.id", "category.name"]);

        if (searchRequest.category) {
            qb.andWhere("category.name ILIKE :category", { category: `%${searchRequest.category}%` });
        }

        if (searchRequest.minRating != null) {
            qb.andWhere("product.rating >= :minRating", { minRating: searchRequest.minRating });
        }

        if (searchRequest.minReviewCount != null) {
            qb.andWhere("product.ratingCount >= :minReviewCount", { minReviewCount: searchRequest.minReviewCount });
        }

        if (searchRequest.searchText) {
            qb.andWhere("product.productName ILIKE :q", { q: `%${searchRequest.searchText}%` });
        }

        const SORT_MAP: Record<string, string> = {
            productName: "product.productName",
            rating: "product.rating",
            ratingCount: "product.ratingCount",
            discountedPrice: "product.discountedPrice",
            actualPrice: "product.actualPrice",
            discountPercentage: "product.discountPercentage",
            createdAt: "product.createdAt",
            updatedAt: "product.updatedAt"
        };

        const orderByField = SORT_MAP[searchRequest.sortBy ?? ""] ?? "product.ratingCount";
        const orderDirection =
            searchRequest.sortDirection === SortDirection.ASC ? SortDirection.ASC : SortDirection.DESC;

        qb.orderBy(orderByField, orderDirection);

        const pageSize = searchRequest.pageSize || 10;
        const pageNumber = searchRequest.pageNumber || 1;

        if (!(pageNumber === 0 && pageSize === 0)) {
            qb.skip((pageNumber - 1) * pageSize).take(pageSize);
        }

        return qb.getManyAndCount();
    }

    async findById(id: string): Promise<Product | null> {
        return this.createQueryBuilder("product")
            .select([
                "product.id",
                "product.externalProductId",
                "product.productName",
                "product.categoryId",
                "product.categoryPath",
                "product.discountedPrice",
                "product.actualPrice",
                "product.discountPercentage",
                "product.rating",
                "product.ratingCount",
                "product.aboutProduct",
                "product.createdAt",
                "product.updatedAt"
            ])
            .leftJoin("product.category", "category")
            .addSelect(["category.id", "category.name"])
            .leftJoinAndSelect("product.reviews", "review")
            .andWhere("product.id = :id", { id })
            .getOne();
    }

    async findByExternalId(externalProductId: string): Promise<Product | null> {
        return this.createQueryBuilder("product")
            .select(["product.id", "product.externalProductId", "product.categoryId"])
            .andWhere("product.externalProductId = :externalProductId", { externalProductId })
            .getOne();
    }

}
