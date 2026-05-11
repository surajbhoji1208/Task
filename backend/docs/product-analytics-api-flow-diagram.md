# Product Ratings & Review Analytics — API Flow Diagrams

---

## 📁 Module Overview

| Module | Base Path | Auth Required |
|---|---|---|
| Products | `/v1/products` | Yes (JWT) |
| Analytics | `/v1/analytics` | Yes (JWT) |
| Import | `/v1/import` | Yes (JWT) |

---

## 1. Import Module

### **File Upload & Import Flow**

```
┌──────────────────────────────┐
│   IMPORT PRODUCTS/REVIEWS    │
│   POST /v1/import/products   │
└──────────────┬───────────────┘
               │ multipart/form-data { file: <CSV|XLS|XLSX> }
               ▼
┌──────────────────────────────────────────────────────┐
│ JwtAuthGuard → validates Bearer token                 │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│ FileInterceptor (multer memoryStorage)                │
│   • extension filter: .csv / .xls / .xlsx            │
│   • max size: 10 MB                                   │
└──────────────────────┬───────────────────────────────┘
                       │
               ┌───────┴───────┐
               │               │
      File missing         File present
               │               │
               ▼               ▼
  BadRequest (400)   ImportController.importProducts()
  ERR_IMPORT_FILE_REQUIRED
                       │
                       ▼
             ImportService.importProducts()
                       │
                       ├─ 1. Create ImportHistory (status=PROCESSING)
                       │
                       ├─ 2. parseFile()
                       │       ├─ .csv  → parseCsvBuffer() via csv-parse/sync
                       │       ├─ .xlsx → parseXlsxBuffer() via xlsx (SheetJS)
                       │       └─ .xls  → parseXlsxBuffer() via xlsx (SheetJS)
                       │           └─ BadRequest if parse fails → ERR_IMPORT_PARSE_FAILED
                       │
                       ├─ 3. validateHeaders()
                       │       └─ Ensure: product_id, product_name, category exist
                       │           └─ BadRequest if missing → ERR_IMPORT_MISSING_HEADERS
                       │
                       ├─ 4. processRows() — QueryRunner Transaction
                       │       ├─ For each row:
                       │       │   ├─ Extract top-level category (split by |)
                       │       │   ├─ Upsert Category by name (cached per import batch)
                       │       │   ├─ Upsert Product by external_product_id
                       │       │   │   ├─ Exists → UPDATE fields, skipped++
                       │       │   │   └─ Not exists → INSERT, imported++
                       │       │   └─ Insert Reviews (split comma-separated user_name / title / content)
                       │       │       └─ Skip if duplicate (product_id + user_name + review_title)
                       │       ├─ COMMIT on success
                       │       └─ ROLLBACK on failure
                       │
                       ├─ 5. Update ImportHistory (status=COMPLETED)
                       │       totalRecords, importedRecords, skippedRecords, failedRecords
                       │
                       └─ 6. Return ImportHistoryResponseDto
                               {
                                 id, fileName, totalRecords, importedRecords,
                                 skippedRecords, failedRecords, status, createdAt
                               }
```

### **Get Import History Flow**

```
┌──────────────────────────────┐
│   GET /v1/import/history     │
│   ?pageNumber=1&pageSize=10  │
└──────────────┬───────────────┘
               │
               ▼
         JwtAuthGuard
               │
               ▼
  ImportService.getImportHistory()
               │
               ▼
  importHistoryRepo.findAndCount()
  ORDER BY created_at DESC, paginated
               │
               ▼
  CommonSearchResponseDto<ImportHistoryResponseDto>
  { results: [...], page, pageSize, totalCount }
```

---

## 2. Products Module

### **List Products Flow**

```
┌──────────────────────────────────────────────────────┐
│   GET /v1/products                                    │
│   ?searchText=cable                                   │
│   &category=Computers                                 │
│   &minRating=4                                        │
│   &minReviewCount=100                                 │
│   &pageNumber=1&pageSize=10                           │
│   &sortBy=rating&sortDirection=DESC                   │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
                 JwtAuthGuard
                       │
                       ▼
            ValidationPipe (ListProductRequestDto)
                       │
                       ▼
        ProductService.findList(searchRequest)
                       │
                       ├─ Check cache (GetCacheKey)
                       │   └─ Cache HIT → return AppResponse from cache
                       │
                       └─ Cache MISS
                           │
                           ▼
            ProductRepository.findProducts()
               QueryBuilder with:
               • LEFT JOIN category
               • WHERE category.name ILIKE (if category filter)
               • WHERE product.rating >= minRating (if set)
               • WHERE product.ratingCount >= minReviewCount (if set)
               • WHERE product.productName ILIKE (if searchText)
               • ORDER BY SORT_MAP[sortBy] (whitelist)
               • SKIP / TAKE (pagination)
                           │
                           ▼
              Map → ProductResponseDto[]
                           │
                           ▼
              CommonSearchResponseDto { results, page, pageSize, totalCount }
                           │
                           ├─ Set cache (60 min TTL)
                           │
                           └─ Return AppResponse<CommonSearchResponseDto<ProductResponseDto>>
```

### **Get Product by ID Flow**

```
┌──────────────────────────────┐
│   GET /v1/products/:id       │
└──────────────┬───────────────┘
               │ ParseUUIDPipe validates id format
               ▼
         JwtAuthGuard
               │
               ▼
  ProductService.findById(id)
               │
               ▼
  ProductRepository.findById()
    QueryBuilder:
    • SELECT product fields
    • LEFT JOIN category
    • LEFT JOIN EACH review
    • WHERE product.id = :id
               │
       ┌───────┴───────┐
       │               │
   Not found      Found
       │               │
       ▼               ▼
  NotFoundException   ProductResponseDto (with reviews[])
  ERR_MODULE_NOT_FOUND
                       │
                       └─ AppResponse<ProductResponseDto>
```

---

## 3. Analytics Module

All analytics endpoints follow the same caching pattern:

```
GET /v1/analytics/<endpoint>
         │
         ▼
   JwtAuthGuard
         │
         ▼
   AnalyticsService.<method>()
         │
         ├─ Check cache (60 min TTL)
         │   └─ HIT → return cached AppResponse
         │
         └─ MISS
             │
             ▼
   AnalyticsRepository query (GROUP BY / aggregates)
             │
             ▼
   Map raw results → Response DTOs
             │
             ├─ Set cache
             │
             └─ Return AppResponse
```

### **Products Per Category**

```
GET /v1/analytics/products-per-category
         │
         ▼
   SELECT category.name, COUNT(product.id)
   FROM product
   INNER JOIN category ON product.category_id = category.id
   GROUP BY category.id, category.name
   ORDER BY product_count DESC
         │
         ▼
   ProductsPerCategoryDto[] = [{ categoryName, productCount }]
```

### **Top Reviewed Products**

```
GET /v1/analytics/top-reviewed
         │
         ▼
   SELECT product fields, category.name
   FROM product
   LEFT JOIN category ON product.category_id = category.id
   WHERE product.ratingCount IS NOT NULL
   ORDER BY product.ratingCount DESC, product.rating DESC
   LIMIT 10
         │
         ▼
   TopReviewedProductDto[] = [{ id, productName, categoryName, rating, ratingCount, discountedPrice }]
```

### **Discount Distribution**

```
GET /v1/analytics/discount-distribution
         │
         ▼
   SELECT
     CASE WHEN discount_percentage < 0.25 THEN '0%-25%'
          WHEN discount_percentage < 0.50 THEN '25%-50%'
          WHEN discount_percentage < 0.75 THEN '50%-75%'
          ELSE '75%-100%'
     END AS discount_range,
     COUNT(*) AS product_count,
     AVG(rating) AS avg_rating
   FROM product
   WHERE discount_percentage IS NOT NULL
   GROUP BY discount_range
   ORDER BY discount_range ASC
         │
         ▼
   DiscountBucketDto[] = [{ discountRange, productCount, avgRating }]
```

### **Category Average Rating**

```
GET /v1/analytics/category-avg-rating
         │
         ▼
   SELECT category.name, AVG(product.rating), COUNT(*), SUM(product.ratingCount)
   FROM product
   INNER JOIN category ON product.category_id = category.id
   WHERE product.rating IS NOT NULL
   GROUP BY category.id, category.name
   ORDER BY avg_rating DESC
         │
         ▼
   CategoryAvgRatingDto[] = [{ categoryName, avgRating, productCount, totalRatings }]
```

### **Review Engagement Metrics**

```
GET /v1/analytics/review-engagement
         │
         ▼
   Query 1 (product table):
     SELECT COUNT(*), SUM(ratingCount), AVG(rating), MAX(ratingCount), MIN(ratingCount)
     WHERE ratingCount IS NOT NULL
         │
   Query 2 (review table):
     SELECT COUNT(*) as total_reviews
         │
         ▼
   ReviewEngagementDto = {
     totalProducts, totalReviews,
     avgReviewsPerProduct,
     totalRatings, avgRating,
     maxRatingCount, minRatingCount
   }
```

---

## 🗄️ Database Schema

```
┌─────────────┐      ┌──────────────────────────┐      ┌────────────────────┐
│  category   │      │        product            │      │      review        │
├─────────────┤      ├──────────────────────────┤      ├────────────────────┤
│ id (uuid PK)│◄─────│ id (uuid PK)             │◄─────│ id (uuid PK)       │
│ name        │      │ external_product_id       │      │ product_id (FK)    │
│ created_by  │      │ product_name              │      │ user_name          │
│ updated_by  │      │ category_id (FK)          │      │ review_title       │
│ deleted_by  │      │ category_path             │      │ review_content     │
│ created_at  │      │ discounted_price          │      │ created_by         │
│ updated_at  │      │ actual_price              │      │ updated_by         │
│ deleted_at  │      │ discount_percentage       │      │ deleted_by         │
└─────────────┘      │ rating                    │      │ created_at         │
                     │ rating_count              │      │ updated_at         │
                     │ about_product             │      │ deleted_at         │
                     │ created_by                │      └────────────────────┘
                     │ updated_by                │
                     │ deleted_by                │      ┌────────────────────┐
                     │ created_at                │      │  import_history    │
                     │ updated_at                │      ├────────────────────┤
                     │ deleted_at                │      │ id (uuid PK)       │
                     └──────────────────────────┘      │ file_name          │
                                                        │ total_records      │
                                                        │ imported_records   │
                                                        │ skipped_records    │
                                                        │ failed_records     │
                                                        │ status (enum)      │
                                                        │ error_message      │
                                                        │ created_at         │
                                                        │ updated_at         │
                                                        └────────────────────┘
```

---

## ⚡ API Integration Priority

### Phase 1 — Data Ingestion
1. `POST /v1/import/products` — Upload dataset (CSV/Excel)
2. `GET /v1/import/history` — Verify import success

### Phase 2 — Analytics
3. `GET /v1/analytics/products-per-category`
4. `GET /v1/analytics/top-reviewed`
5. `GET /v1/analytics/category-avg-rating`
6. `GET /v1/analytics/discount-distribution`
7. `GET /v1/analytics/review-engagement`

### Phase 3 — Product Browsing
8. `GET /v1/products` — Browse with filters
9. `GET /v1/products/:id` — Product detail with reviews

---

## 🛡️ Error Handling

```
┌─────────────────────────────────┐
│  ALL ENDPOINTS                  │
└───────────┬─────────────────────┘
            │
            ├─► Unauthorized (401)   → ERR_INVALID_CREDENTIALS / token missing
            ├─► Bad Request (400)    → Validation / file format errors
            ├─► Not Found (404)      → ERR_MODULE_NOT_FOUND
            └─► Internal Error (500) → Caught by AllHttpExceptionFilter → Sentry
```
