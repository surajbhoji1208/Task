# Architecture Rules — Node Backend v3 (Oneclick Boilerplate)

> **Target audience:** Every developer contributing to this repository.
> **Purpose:** Single source of truth for how this backend is structured, why it is structured that way, and what every developer must follow.

---

## Table of Contents

1. [Quick Start for New Developers](#-quick-start-for-new-developers)
2. [Project Overview](#-project-overview)
3. [Folder Structure](#-folder-structure)
4. [Module Architecture](#-module-architecture)
5. [Request Flow Architecture](#-request-flow-architecture)
6. [Authentication & Authorization](#-authentication--authorization)
7. [Database Architecture](#-database-architecture)
8. [DTO & Validation Rules](#-dto--validation-rules)
9. [API Design Standards](#-api-design-standards)
10. [Common Layer](#-common-layer)
11. [Caching Strategy](#-caching-strategy)
12. [Performance Profiling](#-performance-profiling)
13. [Email & External Services](#-email--external-services)
14. [Audit Trail System](#-audit-trail-system)
15. [Environment & Configuration](#-environment--configuration)
16. [AWS Secrets Manager](#-aws-secrets-manager)
17. [Error Handling & i18n](#-error-handling--i18n)
18. [Logging Strategy](#-logging-strategy)
19. [Security Patterns](#-security-patterns)
20. [Testing Strategy](#-testing-strategy)
21. [Common Mistakes & Fixes](#-common-mistakes--fixes)
22. [Naming Conventions](#-naming-conventions)
23. [Architecture Decision Guide](#-architecture-decision-guide)
24. [Developer Checklist](#-developer-checklist)

---

## 🚀 Quick Start for New Developers

### What this backend does

This is a **production-grade NestJS REST API boilerplate** for single-tenant applications. It ships with a fully wired auth system (JWT + optional OTP), user management, caching, profiling, audit trails, email delivery, and AWS S3 integration.

### How the code is organized

The codebase is split into **three distinct areas**:

| Area | Path | What lives here |
|---|---|---|
| Application layer | `src/` | Thin NestJS modules, controllers only |
| Business logic library | `libs/@oc/business-core/` | Services, repositories, business DTOs |
| Infrastructure library | `libs/@oc/server-core/` | Database, guards, filters, validators, shared modules |

Controllers live in `src/modules/`. The business logic they call lives in `libs/@oc/business-core/modules/`. Everything else (guards, filters, entities, utilities) lives in `libs/@oc/server-core/`.

### How to add a new feature

1. Create the entity in `libs/@oc/server-core/database/entities/`
2. Create a migration with `npm run migration:create:db-changes --name=<name>`
3. Create the business module folder in `libs/@oc/business-core/modules/<feature>/`
4. Add DTOs, service, and repository inside that folder
5. Create the NestJS module + controller in `src/modules/<feature>/`
6. Register the NestJS module in `src/app.module.ts`

### How requests flow

```
HTTP Request
  → LanguageMiddleware + AuditMiddleware (global)
  → ThrottlerGuard (global, 60 req/s)
  → JwtAuthGuard (route-level, optional)
  → ValidationPipe (global, transform: true)
  → Controller
  → Service (business-core)
  → Repository (business-core)
  → TypeORM → PostgreSQL
  → Response via AppResponse<T>
  → ReqResInterceptor (translates success message)
  → ProfilerInterceptor (records timing)
```

---

## 📋 Project Overview

### Architecture Style

**Modular Layered Architecture** with a two-tier library system.

- The `src/` layer is intentionally thin — controllers delegate immediately to services.
- Business logic is fully isolated in `libs/@oc/business-core/`, making it portable and testable.
- Cross-cutting concerns (auth, caching, filters, validators) are isolated in `libs/@oc/server-core/`.

### Tech Stack

| Concern | Technology |
|---|---|
| Framework | NestJS 11 (Express platform) |
| Language | TypeScript 5 |
| ORM | TypeORM 0.3 |
| Database | PostgreSQL (via `pg`) |
| Authentication | Custom JWT guard (`@nestjs/jwt`) |
| Password hashing | bcrypt |
| Caching | `@nestjs/cache-manager` (in-memory) |
| Email | `@nestjs-modules/mailer` (Handlebars templates) |
| File storage | AWS S3 (via `aws-sdk`) |
| Secrets | AWS Secrets Manager (`@aws-sdk/client-secrets-manager`) |
| Validation | `class-validator` + custom validator decorators |
| Serialization | `class-transformer` |
| API docs | `@nestjs/swagger` |
| Rate limiting | `@nestjs/throttler` |
| Error tracking | Sentry (`@sentry/nestjs`) |
| Scheduling | `@nestjs/schedule` |
| Config validation | Joi |
| HTTP security | Helmet, CORS whitelist |
| Compression | `compression` |
| Git hooks | Husky + lint-staged + pretty-quick |
| API docs generator | Compodoc |

### Core Design Principles

1. **Thin controllers** — Controllers only accept HTTP input, call a service, and return the response.
2. **Fat services** — All business logic lives in services inside `business-core`.
3. **Repository pattern** — Database queries are in repositories, never in services directly.
4. **Standardized responses** — Every API response is an `AppResponse<T>` instance.
5. **Translated messages** — Every user-facing string (success or error) goes through the `Translation` utility.
6. **Audit by default** — Every modifiable entity automatically tracks `createdBy`, `updatedBy`, `deletedBy` via a TypeORM subscriber.
7. **Soft deletes everywhere** — Nothing is hard-deleted; the `deletedAt` column is set instead.
8. **Custom validators** — Field validation uses custom decorators from `@core-custom-validators`, not raw `class-validator` decorators.

---

## 📁 Folder Structure

```
node-backend-v3/
│
├── config/                          # Environment & validation config
│   ├── configuration.ts             # Parses process.env into typed config object
│   ├── validation.ts                # Joi schema — all env vars validated at boot
│   └── env/
│       └── development.env          # Development environment variables
│
├── src/                             # NestJS application entry point
│   ├── main.ts                      # Bootstrap: guards, interceptors, Swagger, Sentry
│   ├── app.module.ts                # Root module — imports all feature modules
│   ├── app.controller.ts            # Root health-check controller
│   ├── app-cluster.service.ts       # Cluster mode support
│   └── modules/
│       ├── auth/
│       │   ├── auth.module.ts       # Module wiring
│       │   └── auth.controller.ts   # HTTP endpoints only
│       ├── user/
│       │   ├── user.module.ts
│       │   └── user.controller.ts
│       └── profiler/
│           ├── profiling.module.ts
│           └── profiling.controller.ts
│
├── libs/@oc/
│   │
│   ├── business-core/               # Business logic (portable, framework-agnostic)
│   │   ├── dto/
│   │   │   └── common-dto/          # Shared response shapes (AppResponse, CommonSearchResponseDto)
│   │   └── modules/
│   │       ├── auth/
│   │       │   ├── auth.service.ts
│   │       │   ├── auth.repository.ts   # Facade over OTP/Token/ResetPassword repos
│   │       │   ├── otp.repository.ts
│   │       │   ├── token.repository.ts
│   │       │   ├── reset-password-token.repository.ts
│   │       │   └── dto/
│   │       │       ├── request/
│   │       │       └── response/
│   │       └── user/
│   │           ├── user.service.ts
│   │           ├── user.repository.ts
│   │           └── dto/
│   │               ├── request/
│   │               └── response/
│   │
│   └── server-core/                 # Infrastructure & cross-cutting concerns
│       ├── config/
│       │   ├── typeorm.config.ts    # Async TypeORM configuration factory
│       │   ├── swagger.config.ts    # Swagger DocumentBuilder
│       │   └── mail.config.ts
│       ├── constants/
│       │   ├── entity.constant.ts   # Column length constants (e.g. FirstNameMaxLength)
│       │   ├── entity-key.constant.ts
│       │   ├── permissions.constant.ts
│       │   └── success.constant.ts  # Standardized success message keys
│       ├── custom-decorators/
│       │   ├── api-response.decorator.ts  # @ApiResponseStatus composite Swagger decorator
│       │   ├── get-user.decorator.ts      # @GetUser() param decorator
│       │   └── field-validator.decorator.ts
│       ├── custom-guards/
│       │   └── jwt-auth.guard.ts    # Custom JWT guard (no Passport)
│       ├── custom-validators/       # All field-level validation decorators
│       │   ├── validate-not-empty.ts
│       │   ├── validate-optional.ts
│       │   ├── validate-type.ts
│       │   ├── validate-email.ts
│       │   ├── validate-max-length.ts
│       │   ├── validate-min-length.ts
│       │   ├── validate-max-value.ts
│       │   ├── validate-min-value.ts
│       │   ├── validate-enum-type.ts
│       │   ├── validate-alpha-numeric.ts
│       │   ├── validate-check-only-space.ts
│       │   ├── validate-date-not-future.ts
│       │   ├── validate-unique-array-item.ts
│       │   ├── validate-file-size.ts
│       │   ├── validate-file-type.ts
│       │   └── validate-active-record.ts
│       ├── database/
│       │   ├── base-entities/
│       │   │   ├── identity.ts                           # UUID primary key
│       │   │   ├── base-creatable-entity.ts
│       │   │   ├── base-modifiable-entity.ts             # Includes Identity + audit fields
│       │   │   └── base-modifiable-without-identity-entity.ts
│       │   ├── entities/
│       │   │   ├── user.entity.ts
│       │   │   ├── token.entity.ts
│       │   │   ├── otp.entity.ts
│       │   │   └── reset-password-token.entity.ts
│       │   ├── migrations/
│       │   │   ├── database-changes/  # Schema changes
│       │   │   └── seeds/             # Seed data
│       │   ├── subscribers/
│       │   │   └── audit.subscriber.ts
│       │   └── data-source.ts         # TypeORM DataSource for CLI usage
│       ├── enums/                     # Application-wide enums
│       ├── filters/
│       │   └── all-exceptions.filter.ts
│       ├── generic-service/
│       │   └── audit-context.service.ts
│       ├── interceptors/
│       │   ├── req-res.interceptor.ts   # Translates success messages
│       │   └── profiler.interceptor.ts  # Records endpoint timing
│       ├── interfaces/
│       │   ├── app-response.interface.ts
│       │   └── dynamic-validation-option.interface.ts
│       ├── middleware/
│       │   ├── language.middleware.ts
│       │   └── audit.middleware.ts
│       ├── shared-modules/
│       │   ├── shared.module.ts   # @Global() module — exports all shared services
│       │   ├── cache/             # AppCacheModule + AppCacheService
│       │   ├── jwt/               # AppJwtModule + AppJwtService
│       │   ├── mailer/            # AppMailerModule + AppMailerService
│       │   ├── profiler/          # AppProfilerModule + ProfilerService
│       │   └── s3/                # AppS3Module + AppS3Service
│       └── utilities/
│           ├── app-aws-secrets.utility.ts
│           ├── cache.utility.ts         # GetCacheKey helper
│           ├── generate-otp.utility.ts
│           ├── logger.utility.ts        # GenerateLogPrefix helper
│           ├── module-name-mapper.utility.ts
│           ├── translation.utility.ts   # Translation.Translator()
│           ├── exceptions/
│           │   ├── database-exception.utility.ts
│           │   └── sentry-exception.utility.ts
│           └── i18n/
│               └── en/
│                   ├── error.json       # All error message keys
│                   └── success.json     # All success message keys
```

### Path Aliases

All imports use path aliases defined in `tsconfig.json`. Never use relative `../../` imports that cross library boundaries.

| Alias | Resolves to |
|---|---|
| `@core-config` | `libs/@oc/server-core/config/` |
| `@core-database` | `libs/@oc/server-core/database/` |
| `@core-enums` | `libs/@oc/server-core/enums/` |
| `@core-constants` | `libs/@oc/server-core/constants/` |
| `@core-interfaces` | `libs/@oc/server-core/interfaces/` |
| `@core-utilities` | `libs/@oc/server-core/utilities/` |
| `@core-custom-decorators` | `libs/@oc/server-core/custom-decorators/` |
| `@core-custom-validators` | `libs/@oc/server-core/custom-validators/` |
| `@core-custom-guards` | `libs/@oc/server-core/custom-guards/` |
| `@core-filters` | `libs/@oc/server-core/filters/` |
| `@core-interceptors` | `libs/@oc/server-core/interceptors/` |
| `@core-middleware` | `libs/@oc/server-core/middleware/` |
| `@core-generic-services` | `libs/@oc/server-core/generic-service/` |
| `@core-shared-modules` | `libs/@oc/server-core/shared-modules/` |
| `@business-core-dto` | `libs/@oc/business-core/dto/` |
| `@business-core-modules` | `libs/@oc/business-core/modules/` |

---

## 🧩 Module Architecture

### Pattern Overview

Every feature follows this layered pattern:

```
src/modules/<feature>/
  <feature>.module.ts        ← NestJS module wiring (no logic)
  <feature>.controller.ts    ← HTTP boundary (no logic, only delegation)

libs/@oc/business-core/modules/<feature>/
  <feature>.service.ts       ← All business logic
  <feature>.repository.ts    ← All database queries
  dto/
    request/                 ← Input DTOs with validation decorators
    response/                ← Output DTOs with serialization

libs/@oc/server-core/database/entities/
  <feature>.entity.ts        ← TypeORM entity with base class
```

### Controller Responsibility

- Accept HTTP request parameters (`@Body`, `@Query`, `@Param`)
- Validate route-level access via `@UseGuards`
- Extract authenticated user via `@GetUser()`
- Call one service method
- Return the `Promise<AppResponse<T>>` directly

```typescript
// src/modules/user/user.controller.ts
@Get(':id')
@ApiResponseStatus('Get user by ID', [HttpStatus.OK, HttpStatus.NOT_FOUND], USER_MODULE_NAME, UserResponseDto)
async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<AppResponse<UserResponseDto>> {
    return this.userService.findById(id);
}
```

**Controllers must not**: contain `if/else` business decisions, call repositories directly, construct response objects, or throw exceptions based on business rules.

### Service Responsibility

- Implement all business logic
- Orchestrate one or more repositories
- Throw NestJS HTTP exceptions (`NotFoundException`, `BadRequestException`, etc.)
- Build and return `AppResponse<T>` instances
- Manage cache via `AppCacheService`
- Call external services (`AppMailerService`, `AppS3Service`)

```typescript
// libs/@oc/business-core/modules/user/user.service.ts
async findById(id: string): Promise<AppResponse<UserResponseDto>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
        throw new NotFoundException({ message: 'ERR_MODULE_NOT_FOUND', module: MapToModuleName(ModuleName.USER) });
    }
    return new AppResponse(SuccessConstant.DetailFetch, new UserResponseDto(user), { module: MapToModuleName(ModuleName.USER) });
}
```

### Repository Responsibility

- Extend `Repository<Entity>` from TypeORM
- Inject the TypeORM repository via constructor injection
- Implement all `QueryBuilder` queries and complex filters
- Never throw business exceptions — return `null` or empty arrays
- Never contain business logic

```typescript
// libs/@oc/business-core/modules/user/user.repository.ts
@Injectable()
export class UserRepository extends Repository<User> {
    constructor(@InjectRepository(User) repository: Repository<User>) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findById(id: string): Promise<User | null> {
        return this.createQueryBuilder('user')
            .select(['user.id', 'user.firstName', 'user.lastName', 'user.email', ...])
            .andWhere('user.id = :id', { id })
            .getOne();
    }
}
```

**Always use explicit `select()`** in queries — never load the entire entity including sensitive fields like `password` and `salt` unless required.

### Facade Repository Pattern (Auth)

The `AuthRepository` is a **facade** that aggregates three child repositories (`OtpRepository`, `TokenRepository`, `ResetPasswordTokenRepository`). Services interact only with the facade.

```typescript
// Single entry point for all auth DB operations
@Injectable()
export class AuthRepository {
    constructor(
        private readonly otpRepository: OtpRepository,
        private readonly resetPasswordTokenRepository: ResetPasswordTokenRepository,
        private readonly tokenRepository: TokenRepository
    ) {}
}
```

### Module Wiring

Feature modules declare their entities, import `AppCacheModule` if caching is needed, and export only their service (never their repository).

```typescript
@Module({
    imports: [TypeOrmModule.forFeature([User]), AppCacheModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService]  // ← ONLY the service is exported
})
export class UserModule {}
```

### Cross-Module Communication

When `AuthService` needs user data, it injects `UserService` — never `UserRepository` directly. This enforces module boundaries.

```typescript
// AuthModule imports UserModule to access UserService
imports: [TypeOrmModule.forFeature([...]), UserModule],
providers: [AuthService, AuthRepository, ...]
```

---

## 🔄 Request Flow Architecture

### Full Lifecycle

```
Incoming HTTP Request
        │
        ▼
LanguageMiddleware         (reads language_code from headers/body)
        │
        ▼
AuditMiddleware            (extracts JWT, sets userId in AuditContextService)
        │
        ▼
ThrottlerGuard             (global: 60 requests/second max)
        │
        ▼
JwtAuthGuard               (route-level: verifies Bearer token, attaches user to request)
        │
        ▼
ValidationPipe             (global: class-validator on all DTOs, transform: true)
        │
        ▼
Controller Method          (delegates to service)
        │
        ▼
Service Method             (business logic, throws HTTP exceptions on failure)
        │
        ▼
Repository Method          (TypeORM QueryBuilder)
        │
        ▼
PostgreSQL
        │
        ▼
AppResponse<T>             (standardized response wrapper)
        │
        ▼
ReqResInterceptor          (translates success message key → localized string)
        │
        ▼
ProfilerInterceptor        (records response time, cache hits/misses)
        │
        ▼
JSON Response to Client
```

### Exception Path

When any layer throws an exception:

```
Exception thrown
        │
        ▼
AllHttpExceptionFilter     (catches ALL exceptions)
        │
        ▼
captureExceptionInSentry   (if Sentry enabled)
        │
        ▼
handleDatabaseError()      (converts QueryFailedError → HTTP 400)
        │
        ▼
Translation.Translator()   (translates error key → localized message)
        │
        ▼
{ message, developerErrors } JSON Response
```

---

## 🛡 Authentication & Authorization

### JWT Strategy

This project uses a **custom JWT guard** — not Passport. The guard is in `libs/@oc/server-core/custom-guards/jwt-auth.guard.ts`.

**Token flow:**

1. User logs in → `AuthService.loginUser()` validates credentials
2. If OTP is enabled: OTP is generated, stored in DB, emailed to user
3. OTP verified → `AppJwtService.generateJWTToken()` creates access + refresh tokens
4. Tokens are stored in the `token` table for revocation support
5. Every authenticated request carries `Authorization: Bearer <access_token>`
6. `JwtAuthGuard` verifies the token and attaches the user payload to `request.user`

```typescript
// libs/@oc/server-core/custom-guards/jwt-auth.guard.ts
const payload = this.jwtService.verify(token);
request.user = {
    id: payload.sub,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    status: payload.status,
    userType: payload.userType
};
```

### Token Payload

```typescript
{
    sub: user.id,      // used as standard JWT subject
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType   // used for role checks
}
```

### Accessing the Authenticated User

Use the `@GetUser()` custom param decorator in controllers:

```typescript
@GetUser() user: User                    // full user object
@GetUser('id') userId: string            // single field
@GetUser('userType') role: UserTypeEnum  // single field
```

### Applying the Guard

Apply `JwtAuthGuard` at the **controller class level** (preferred for all-protected controllers) or at the **method level** for mixed controllers:

```typescript
// Entire controller is protected
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController { ... }

// Mixed — specific routes protected
export class AuthController {
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getProfile() { ... }
}
```

### User Types (Roles)

```typescript
// libs/@oc/server-core/enums/user-type.enum.ts
export enum UserTypeEnum {
    SUPER_ADMIN = 2,
    ADMIN = 3,
    USER = 4
}
```

Role checks are performed in service methods using the `userType` from the JWT payload. There is no RBAC decorator currently — role enforcement is handled manually in service logic.

### OTP System

OTP is configurable via `OTP_ENABLED` environment variable.

| `OTP_ENABLED` | Behavior |
|---|---|
| `false` | Login returns JWT tokens immediately |
| `true` | Login sends OTP email; tokens issued only after `/auth/otp-verify` |

OTP types: `REGISTER = 1`, `LOGIN = 2`, `FORGOT_PASSWORD = 3`

---

## 🗄 Database Architecture

### ORM

**TypeORM 0.3** with PostgreSQL. All entity files are in `libs/@oc/server-core/database/entities/`.

### Base Entity Hierarchy

```
BaseEntity (TypeORM)
    └── Identity                           (uuid PK)
            └── BaseModifiableEntity       (Identity + audit fields)

BaseEntity (TypeORM)
    └── BaseModifiableEntityWithoutIdentity  (audit fields, no PK — used when entity defines its own PK)
```

**Audit fields on every entity** (via the base classes):

| Column | Type | Description |
|---|---|---|
| `created_by` | uuid | User ID who created the record |
| `updated_by` | uuid | User ID who last updated |
| `deleted_by` | uuid | User ID who soft-deleted |
| `created_at` | timestamptz | Auto-set by TypeORM |
| `updated_at` | timestamptz | Auto-set by TypeORM |
| `deleted_at` | timestamptz | Soft delete timestamp |

### Defining an Entity

```typescript
@Entity('my_table')
export class MyEntity extends BaseModifiableEntityWithoutIdentity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, name: 'column_name', nullable: false })
    columnName: string;
}
```

Always use:
- `snake_case` column names via the `name` property
- `camelCase` TypeScript property names
- Named constants from `@core-constants` for column lengths instead of magic numbers

### Repository Pattern

All repositories extend `Repository<Entity>` and inject the TypeORM repository via the constructor:

```typescript
export class MyRepository extends Repository<MyEntity> {
    constructor(@InjectRepository(MyEntity) repository: Repository<MyEntity>) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}
```

### Query Best Practices

- Always use `createQueryBuilder()` with explicit `select()` — never `.find()` or `.findOne()` for sensitive entities
- Use a `SORT_MAP` whitelist for sortable fields to prevent SQL injection via sort field names
- Always use parameterized queries (`:param` style), never string interpolation
- Use `softRemove()` for deletes — never `delete()` or `remove()`

### Migrations

| Command | Purpose |
|---|---|
| `npm run migration:create:db-changes --name=<name>` | Create blank schema migration |
| `npm run migration:create:seeds --name=<name>` | Create seed data migration |
| `npm run migration:generate --name=<name>` | Auto-generate migration from entity changes |
| `npm run migration:run` | Run all pending migrations |
| `npm run migration:revert` | Revert last migration |

Migrations live in `libs/@oc/server-core/database/migrations/`. Schema changes go in `database-changes/`, seed data goes in `seeds/`.

**Never use `DATABASE_SYNC=true` in production.** It is only acceptable for local development.

### Soft Deletes

All entities support soft delete via the `deletedAt` column. Use `userRepository.softRemove(entity)` — TypeORM will automatically populate `deletedAt`. The `AuditSubscriber` will populate `deletedBy` after the soft remove.

### TypeORM Audit Subscriber

`libs/@oc/server-core/database/subscribers/audit.subscriber.ts` is a global event subscriber registered in `typeOrmConfig`. It listens to `beforeInsert`, `beforeUpdate`, and `afterSoftRemove` events and auto-populates audit columns using the static `AuditContext.getUserId()`.

---

## 📦 DTO & Validation Rules

### DTO Naming Convention

| Type | Suffix | Example |
|---|---|---|
| Request (create) | `CreateXxxRequestDto` | `CreateUserRequestDto` |
| Request (update) | `UpdateXxxRequestDto` | `UpdateUserRequestDto` |
| Request (list) | `ListXxxRequestDto` | `ListUserRequestDto` |
| Request (dropdown) | `XxxDropdownRequestDto` | `UserDropdownRequestDto` |
| Response | `XxxResponseDto` | `UserResponseDto` |

### DTO Location

Request DTOs: `libs/@oc/business-core/modules/<feature>/dto/request/`
Response DTOs: `libs/@oc/business-core/modules/<feature>/dto/response/`

### Validation Decorators

**Never use raw `class-validator` decorators.** Always use the custom wrappers from `@core-custom-validators`. They integrate with the i18n error translation system.

| Custom Decorator | Purpose |
|---|---|
| `@ValidateNotEmpty()` | Field must not be empty |
| `@ValidateOptional()` | Field is optional (marker decorator) |
| `@ValidateType()` | Type check (string, number, boolean, etc.) |
| `@ValidateEmail()` | Valid email format |
| `@ValidateMinLength(n)` | Minimum string length |
| `@ValidateMaxLength(n)` | Maximum string length |
| `@ValidateMinValue(n)` | Minimum numeric value |
| `@ValidateMaxValue(n)` | Maximum numeric value |
| `@ValidateEnumType(Enum)` | Value must be a valid enum member |
| `@ValidateAlphaNumeric()` | Only alphanumeric characters |
| `@ValidateCheckOnlySpace()` | Rejects strings that are only whitespace |
| `@ValidateDateNotFuture()` | Date must not be in the future |
| `@ValidateUniqueArrayItem()` | Array items must be unique |
| `@ValidateFileSize()` | File upload size limit |
| `@ValidateFileType()` | File MIME type validation |
| `@ValidateActiveRecord()` | DB-level existence check |

### Required Field Pattern

Stack validators in this order: `@ValidateNotEmpty` → constraints → `@ValidateType`.

```typescript
@ApiProperty({ description: 'User password', example: 'password123' })
@ValidateNotEmpty({ constraints: { field: 'password' } })
@ValidateMinLength(UserEntityConstant.PasswordMinLength, { constraints: { field: 'password' } })
@ValidateMaxLength(UserEntityConstant.PasswordMaxLength, { constraints: { field: 'password' } })
@ValidateType({ constraints: { field: 'password', type: FieldTypeEnum.String } })
password: string;
```

### Optional Field Pattern

Use `@ValidateOptional()` as the first decorator, then add any additional constraints:

```typescript
@ApiPropertyOptional({ description: 'Phone number' })
@ValidateOptional({ constraints: { field: 'Phone number' } })
@ValidateMaxLength(UserEntityConstant.PhoneNumberMaxLength, { constraints: { field: 'Phone number' } })
@ValidateType({ constraints: { field: 'phoneNumber', type: FieldTypeEnum.String } })
phoneNumber?: string;
```

### Response DTO Pattern

Response DTOs use constructor mapping to explicitly control what is exposed. **Sensitive fields (`password`, `salt`) must never appear in response DTOs.**

```typescript
export class UserResponseDto {
    constructor(user: any) {
        this.id = user.id;
        this.firstName = user.firstName;
        // password intentionally omitted
    }

    @ApiProperty({ description: "User's unique identifier" })
    id: string;
    ...
}
```

### Global ValidationPipe

Registered in `main.ts` with `transform: true` — this auto-transforms plain request objects into DTO class instances, enabling `class-validator` and `class-transformer` to work.

---

## ⚡ API Design Standards

### URL Structure

All routes are prefixed with `/v1` (set globally in `main.ts`).

```
POST   /v1/auth/login
POST   /v1/auth/register
POST   /v1/auth/otp-verify
GET    /v1/users
GET    /v1/users/dropdown
GET    /v1/users/:id
POST   /v1/users
PUT    /v1/users/:id
DELETE /v1/users/:id
```

### Standardized Response Shape

Every API response wraps data in `AppResponse<T>`:

```typescript
// Success response
{
    "message": "User retrieved successfully",
    "data": { ... }  // single object or CommonSearchResponseDto
}

// List response (via CommonSearchResponseDto)
{
    "message": "Users list retrieved successfully",
    "data": {
        "results": [...],
        "page": 1,
        "pageSize": 10,
        "totalCount": 42
    }
}

// Error response (via AllHttpExceptionFilter)
{
    "message": "Email address is required",
    "developerErrors": [
        {
            "key": "ERR_REQUIRED",
            "errorType": "ui",
            "actualError": "Email is required",
            "displayError": "Email is required"
        }
    ]
}
```

### Constructing Responses

Use `SuccessConstant` keys — never hardcode strings:

```typescript
import { SuccessConstant } from '@core-constants';

return new AppResponse(SuccessConstant.AddSuccessAction, new UserResponseDto(saved), { module: MapToModuleName(ModuleName.USER) });
return new AppResponse(SuccessConstant.UpdateSuccessAction, new UserResponseDto(updated), { module: MapToModuleName(ModuleName.USER) });
return new AppResponse(SuccessConstant.RemoveSuccessAction, {}, { module: MapToModuleName(ModuleName.USER) });
return new AppResponse(SuccessConstant.DetailFetch, new UserResponseDto(user), { module: MapToModuleName(ModuleName.USER) });
return new AppResponse(SuccessConstant.ListFetch, paginatedResponse, { module: MapToModuleName(ModuleName.USER) });
```

### Pagination

All list endpoints accept `ListXxxRequestDto` which extends the common search request DTO with:

- `pageNumber` (default: 1)
- `pageSize` (default: 10)
- `searchText`
- `sortBy`
- `sortDirection` (ASC | DESC)

Pass `pageNumber=0` and `pageSize=0` to fetch all records (no pagination).

### UUID Path Parameters

Always use `ParseUUIDPipe` for UUID route parameters:

```typescript
@Get(':id')
findOne(@Param('id', ParseUUIDPipe) id: string) { ... }
```

### Swagger Documentation

Use the `@ApiResponseStatus()` composite decorator on every endpoint. It automatically registers Swagger response schemas for all specified HTTP status codes.

```typescript
@ApiResponseStatus(
    'Get user by ID',                                          // summary
    [HttpStatus.OK, HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST], // statuses
    USER_MODULE_NAME,                                          // module name
    UserResponseDto                                            // response DTO
)
```

`HttpStatus.INTERNAL_SERVER_ERROR` and `HttpStatus.SERVICE_UNAVAILABLE` are always appended automatically.

---

## 🔧 Common Layer

### Custom Decorators

| Decorator | File | Usage |
|---|---|---|
| `@GetUser()` | `custom-decorators/get-user.decorator.ts` | Extract authenticated user from request |
| `@ApiResponseStatus()` | `custom-decorators/api-response.decorator.ts` | Composite Swagger response decorator |

### Guards

| Guard | File | Scope |
|---|---|---|
| `JwtAuthGuard` | `custom-guards/jwt-auth.guard.ts` | Route-level |
| `ThrottlerGuard` | `@nestjs/throttler` | Global (60 req/s) |

### Interceptors

| Interceptor | File | Scope | Purpose |
|---|---|---|---|
| `ReqResInterceptor` | `interceptors/req-res.interceptor.ts` | Global | Translates success message keys to i18n strings |
| `ProfilerInterceptor` | `interceptors/profiler.interceptor.ts` | Global | Records per-endpoint timing and cache stats |

### Filters

| Filter | File | Scope | Purpose |
|---|---|---|---|
| `AllHttpExceptionFilter` | `filters/all-exceptions.filter.ts` | Global | Catches all exceptions, translates errors, reports to Sentry |

### Middleware

| Middleware | File | Applied To | Purpose |
|---|---|---|---|
| `LanguageMiddleware` | `middleware/language.middleware.ts` | All routes | Language detection hook (extensible) |
| `AuditMiddleware` | `middleware/audit.middleware.ts` | All routes | Extracts JWT, sets userId in `AuditContextService` |

### Utilities

| Utility | Function | Purpose |
|---|---|---|
| `logger.utility.ts` | `GenerateLogPrefix(funcName)` | Consistent log prefix generation |
| `cache.utility.ts` | `GetCacheKey(module, key, isList, filters)` | MD5-hashed deterministic cache keys |
| `translation.utility.ts` | `Translation.Translator(lang, file, key, params)` | i18n message resolution |
| `module-name-mapper.utility.ts` | `MapToModuleName(ModuleName.X)` | Enum → human-readable name |
| `generate-otp.utility.ts` | `GenerateOtpNumber.generateOtp()` | 6-digit OTP generator |
| `app-aws-secrets.utility.ts` | `preloadSecrets()` | Loads AWS Secrets Manager into `process.env` at boot |

---

## 🧠 Caching Strategy

### Cache Implementation

The project uses **in-memory caching** via `@nestjs/cache-manager`. There is no Redis dependency in the current setup. The `AppCacheModule` registers the cache globally with a 1-hour default TTL and a maximum of 100 items.

### AppCacheService

`AppCacheService` wraps the cache manager and adds:

1. **Profiler integration** — every get/set records a cache hit or miss to `ProfilerService`
2. **Module-scoped key tracking** — list cache keys are registered per module, enabling bulk invalidation

```typescript
// Getting from cache
const cached = await this.appCacheService.get<CommonSearchResponseDto<T>>(cacheKey);

// Setting with TTL (in minutes) and module registration
await this.appCacheService.set(cacheKey, response, 360, { module: this.USER_CACHE_MODULE });

// Invalidating all list caches for a module on write operations
await this.appCacheService.clearListCachesByModule(this.USER_CACHE_MODULE);
```

### Cache Key Convention

Cache keys are generated with `GetCacheKey()` from `@core-utilities`:

```typescript
// Simple key
GetCacheKey('User', 'detail')             // → "User-detail"

// List key with filter fingerprint
GetCacheKey('User', 'dropdown', true, searchRequest)  // → "User-dropdown-<md5hash>"
```

### Invalidation Pattern

On any write operation (create, update, delete), clear all list caches for that module:

```typescript
// After create/update/delete in UserService:
await this.appCacheService.clearListCachesByModule(this.USER_CACHE_MODULE);
```

Dropdown data is cached for 6 minutes (360 seconds). The cache is invalidated whenever a user record changes.

### When to Cache

- **Cache:** List queries, dropdown data, expensive read-only aggregations
- **Do not cache:** Single-record fetches by ID, auth operations, mutation results

---

## 📊 Performance Profiling

The project has a built-in API profiler that requires no external tools.

### How It Works

`ProfilerInterceptor` wraps every request using Node.js `AsyncLocalStorage` to track per-request cache hits/misses and response time. `ProfilerService` accumulates statistics in memory.

### Accessing Profiler Data

| Endpoint | Description |
|---|---|
| `GET /v1/profiler` | All endpoints with stats |
| `GET /v1/profiler/summary` | Aggregated totals |
| `GET /v1/profiler/slow` | Endpoints averaging >500ms |
| `GET /v1/profiler/errors` | Endpoints with >5% error rate |
| `POST /v1/profiler/clear` | Reset all stats |
| `GET /v1/profiler-ui` | Interactive HTML dashboard |

Requests slower than 1000ms are automatically logged as warnings by `ProfilerService`.

---

## 📧 Email & External Services

### Email (AppMailerService)

Templates are Handlebars (`.hbs`) files in `libs/@oc/server-core/email-templates/`. The service is available globally via `SharedModule`.

```typescript
// Inject in any service
constructor(private readonly appMailerService: AppMailerService) {}

// Send OTP email
await this.appMailerService.LoginOtpSend(user, otpCode);

// Send onboarding email
await this.appMailerService.sendUserOnboardingEmail(savedUser);
```

### AWS S3 (AppS3Service)

```typescript
// Upload file
await this.appS3Service.uploadS3(fileBuffer, bucketPath, fileName, mimeType);

// Generate presigned URL for read
const url = await this.appS3Service.generatePresignedUrl(key, expiresIn, bucketName);

// Delete file
await this.appS3Service.deleteFileFromS3(key, bucketName);
```

---

## 🔍 Audit Trail System

Every entity that extends `BaseModifiableEntity` or `BaseModifiableEntityWithoutIdentity` automatically gets audit columns populated.

### Flow

1. `AuditMiddleware` runs on every request
2. It extracts the JWT token from the `Authorization` header
3. It calls `AuditContextService.setUserId(payload.sub)` which also sets `AuditContext.setUserId()` (static)
4. TypeORM's `AuditSubscriber` listens on `beforeInsert`, `beforeUpdate`, and `afterSoftRemove`
5. It reads `AuditContext.getUserId()` and sets the appropriate audit field

This is completely transparent to the service layer — developers do not need to manually set `createdBy`, `updatedBy`, or `deletedBy`.

---

## ⚙ Environment & Configuration

### Configuration Loading

1. `main.ts` boots → calls `preloadSecrets()` if `ENVIRONMENT=development` (loads from AWS Secrets Manager)
2. `ConfigModule.forRoot()` reads `config/env/<NODE_ENV>.env`
3. `config/configuration.ts` parses and structures `process.env` into a typed object
4. `config/validation.ts` (Joi schema) validates all required variables at startup — the app will fail to boot if any required variable is missing

### Accessing Config

Inject `ConfigService` and use typed paths:

```typescript
constructor(private readonly configService: ConfigService) {}

const port = this.configService.get<number>('server.port');
const jwtSecret = this.configService.get<string>('jwt.secret');
const otpEnabled = this.configService.get<boolean>('app.otp.enabled', false);
```

### Config Namespaces

| Namespace | Key Examples |
|---|---|
| `server` | `server.port`, `server.env`, `server.origin` |
| `db` | `db.host`, `db.port`, `db.username`, `db.password`, `db.database` |
| `jwt` | `jwt.secret`, `jwt.expire_in`, `jwt.expire_in_remember_me` |
| `refresh_token` | `refresh_token.secret`, `refresh_token.expire_in` |
| `email` | `email.host`, `email.user`, `email.pass`, `email.port` |
| `aws_s3` | `aws_s3.access_key_id`, `aws_s3.private_bucket_name`, `aws_s3.region` |
| `app` | `app.otp.enabled`, `app.otp.expire_time`, `app.frontend_base_url` |
| `sentry` | `sentry.dsn`, `sentry.enabled`, `sentry.traces_sample_rate` |

### Environment Files

Environment files live in `config/env/`. Copy `example.env` to `config/env/development.env` and fill in the values to get started.

---

## ☁ AWS Secrets Manager

In development mode, the app calls `preloadSecrets()` before NestJS bootstraps. This function:

1. Reads `AWS_REGION` and `AWS_SECRET_ID` from `process.env`
2. Fetches the secret JSON from AWS Secrets Manager
3. Injects all key-value pairs from the secret directly into `process.env`

This means `config/env/development.env` can point to the real secret ID, and all sensitive credentials are kept out of the repository.

---

## 🌐 Error Handling & i18n

### Error Response Format

```json
{
    "message": "Localized user-facing error message",
    "developerErrors": [
        {
            "key": "ERR_REQUIRED",
            "errorType": "ui",
            "actualError": "English message",
            "displayError": "Localized message for client's language"
        }
    ]
}
```

### Throwing Errors in Services

Use NestJS HTTP exceptions with **error key strings** from `error.json`:

```typescript
throw new NotFoundException({ message: 'ERR_MODULE_NOT_FOUND', module: 'User' });
throw new BadRequestException({ message: 'ERR_EMAIL_EXISTS' });
throw new UnauthorizedException({ message: 'ERR_INVALID_CREDENTIALS' });
throw new NotAcceptableException({ message: 'ERR_ACCOUNT_INACTIVE' });
```

The `AllHttpExceptionFilter` translates these keys via `Translation.Translator()`.

### Language Resolution

Language is resolved from (in order of precedence):
1. `request.body.language_code`
2. `request.query.language_code`
3. `request.params.language_code`
4. `request.user.language_code`
5. `request.headers.language_code`
6. Default: `"en"`

### Adding New Error/Success Messages

Add entries to `libs/@oc/server-core/utilities/i18n/en/error.json` or `success.json`. Keys are `SCREAMING_SNAKE_CASE`.

---

## 📝 Logging Strategy

Every service uses a private `Logger` instance scoped to the class name:

```typescript
@Injectable()
export class UserService {
    readonly #logger: Logger = new Logger(UserService.name);
    // private field (#) ensures it's not accidentally exposed
}
```

### Log Prefix

Use `GenerateLogPrefix()` at the start of every service method for traceable logs:

```typescript
async create(data: CreateUserRequestDto) {
    const logPrefix = GenerateLogPrefix(this.create.name);
    this.#logger.debug(`${logPrefix} : Creating user with email: ${data.email}`);
    // ...
    this.#logger.debug(`${logPrefix} : User created with ID: ${savedUser.id}`);
}
```

### Log Levels

| Level | When to use |
|---|---|
| `debug` | Entry points, intermediate steps, success confirmations |
| `warn` | Recoverable issues, suspicious activity, slow requests |
| `error` | Caught exceptions, external service failures |
| `log` | Application lifecycle events |

Logging is controlled by `LOG_ENABLE=true/false` in the env file.

---

## 🔒 Security Patterns

### HTTP Security Headers

Helmet is enabled globally with `contentSecurityPolicy: true`.

### CORS

Dynamic CORS — only origins in `server.origin` (parsed from the `WHITELIST` env var as a JSON array) are allowed. All other origins receive a `403 Forbidden`.

### Rate Limiting

`ThrottlerGuard` is registered as a global guard. Default: 60 requests per second per IP. Applied to all routes automatically.

### Password Hashing

Passwords are hashed with bcrypt via a `@BeforeInsert()` entity lifecycle hook on the `User` entity. The salt is stored separately for validation. Services must call `user.validatePassword(plainText)` and `user.updatePassword(newPassword)` — never hash passwords manually in services.

### Cookie Security

Cookie parser is configured with a secret from `COOKIE_SECRET`. Use signed cookies for sensitive data.

### Request Size Limit

JSON body size is limited to 15MB (set in `main.ts`).

---

## 🧪 Testing Strategy

### Test Configuration

Jest is configured in `package.json`:
- Test files: `src/**/*.spec.ts`
- Transform: `ts-jest`
- Environment: `node`

### Running Tests

```bash
npm run test           # single run
npm run test:watch     # watch mode
npm run test:cov       # with coverage report
npm run test:e2e       # end-to-end tests
```

### Unit Testing Pattern

Test services in isolation by mocking repositories and shared services:

```typescript
const module = await Test.createTestingModule({
    providers: [
        UserService,
        {
            provide: UserRepository,
            useValue: { findById: jest.fn(), save: jest.fn() }
        },
        {
            provide: AppCacheService,
            useValue: { get: jest.fn(), set: jest.fn(), clearListCachesByModule: jest.fn() }
        }
    ]
}).compile();

const service = module.get<UserService>(UserService);
```

### What to Test

- **Services**: Business logic, conditional branches, exception throwing
- **Repositories**: Query builder logic (use an actual test DB or mock the query builder)
- **Guards**: Token extraction and validation logic

---

## 🚨 Common Mistakes & Fixes

### 1. Business logic in controllers

**WRONG:**
```typescript
@Post()
async create(@Body() dto: CreateUserRequestDto) {
    const existing = await this.userRepository.findByEmail(dto.email); // ← direct repo access
    if (existing) throw new BadRequestException('Email exists');        // ← business logic in controller
    const user = await this.userRepository.save(dto);
    return user;
}
```

**CORRECT:**
```typescript
@Post()
async create(@Body() dto: CreateUserRequestDto): Promise<AppResponse<UserResponseDto>> {
    return this.userService.create(dto); // ← delegate everything
}
```

---

### 2. Raw class-validator instead of custom validators

**WRONG:**
```typescript
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@IsNotEmpty()
@IsEmail()
@MaxLength(50)
email: string;
```

**CORRECT:**
```typescript
import { ValidateNotEmpty, ValidateEmail, ValidateMaxLength } from '@core-custom-validators';

@ValidateNotEmpty({ constraints: { field: 'Email' } })
@ValidateMaxLength(UserEntityConstant.EmailMaxLength, { constraints: { field: 'Email' } })
@ValidateEmail({ constraints: { field: 'Email' } })
email: string;
```

---

### 3. Hardcoded success/error message strings

**WRONG:**
```typescript
return new AppResponse('User created successfully', new UserResponseDto(user));
throw new NotFoundException('User not found');
```

**CORRECT:**
```typescript
return new AppResponse(SuccessConstant.AddSuccessAction, new UserResponseDto(user), { module: MapToModuleName(ModuleName.USER) });
throw new NotFoundException({ message: 'ERR_MODULE_NOT_FOUND', module: MapToModuleName(ModuleName.USER) });
```

---

### 4. Selecting all columns including sensitive fields

**WRONG:**
```typescript
return this.findOne({ where: { id } }); // returns password and salt!
```

**CORRECT:**
```typescript
return this.createQueryBuilder('user')
    .select(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.status'])
    .andWhere('user.id = :id', { id })
    .getOne();
```

---

### 5. Missing @ApiBearerAuth() on guarded endpoints

**WRONG:**
```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile() { ... }  // Swagger won't show the lock icon — confuses API consumers
```

**CORRECT:**
```typescript
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Get('profile')
getProfile() { ... }
```

---

### 6. Exporting the repository from a module

**WRONG:**
```typescript
exports: [UserService, UserRepository]  // ← repository leaked outside module boundary
```

**CORRECT:**
```typescript
exports: [UserService]  // ← only the service is part of the public API
```

---

### 7. Using hard delete instead of soft delete

**WRONG:**
```typescript
await this.userRepository.delete({ id });
await this.userRepository.remove(user);
```

**CORRECT:**
```typescript
await this.userRepository.softRemove(user);
```

---

### 8. Calling repositories directly from another module's service

**WRONG:**
```typescript
// In AuthService constructor:
constructor(private readonly userRepository: UserRepository) {}  // ← bypasses UserService
```

**CORRECT:**
```typescript
// In AuthService constructor:
constructor(private readonly userService: UserService) {}  // ← goes through proper boundary
```

---

### 9. Circular dependency via direct module imports

**WRONG:** `AuthModule` imports `UserModule` AND `UserModule` imports `AuthModule`.

**CORRECT:** `AuthModule` imports `UserModule`. `UserService` provides cross-module methods (like `findUserByEmail`) that `AuthService` calls. If truly circular, use `forwardRef()`.

---

### 10. Magic numbers in entity column definitions

**WRONG:**
```typescript
@Column({ type: 'varchar', length: 100, name: 'first_name' })
firstName: string;
```

**CORRECT:**
```typescript
import { UserEntityConstant } from '@core-constants';

@Column({ type: 'varchar', length: UserEntityConstant.FirstNameMaxLength, name: 'first_name' })
firstName: string;
```

---

## 📏 Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| Modules | `PascalCase` + `Module` | `UserModule`, `AuthModule` |
| Controllers | `PascalCase` + `Controller` | `UserController` |
| Services | `PascalCase` + `Service` | `UserService`, `AppCacheService` |
| Repositories | `PascalCase` + `Repository` | `UserRepository`, `AuthRepository` |
| Request DTOs | `PascalCase` + `RequestDto` | `CreateUserRequestDto` |
| Response DTOs | `PascalCase` + `ResponseDto` | `UserResponseDto` |
| Entities | `PascalCase` (noun) | `User`, `Token`, `Otp` |
| Enums | `PascalCase` + `Enum` | `UserTypeEnum`, `OtpType` |
| Interfaces | `PascalCase` (with `I` prefix) | `IAppResponse` |
| Constants | `SCREAMING_SNAKE_CASE` | `SuccessConstant.AddSuccessAction` |
| Utilities | `camelCase` + `.utility.ts` | `cache.utility.ts` |
| Files | `kebab-case` + type suffix | `user.service.ts`, `jwt-auth.guard.ts` |
| DB columns | `snake_case` (via `name` property) | `first_name`, `created_at` |
| TypeScript properties | `camelCase` | `firstName`, `createdAt` |
| Module alias keys | `ModuleName` enum values | `ModuleName.USER = "User"` |

---

## 🏗 Architecture Decision Guide

### When to create a new module

- Feature has its own database entity
- Feature has more than one API endpoint
- Feature has distinct business rules
- Feature needs its own cache namespace

### When to extract common logic

- Same query pattern used in 3+ repositories → add a helper method
- Same validation rule used in 3+ DTOs → add a custom validator
- Same service method used by 2+ modules → add it to a shared service or expose it via the owning module's service

### When to use SharedModule services

Use services from `SharedModule` (`AppCacheService`, `AppMailerService`, `AppS3Service`, `AppJwtService`) when you need:
- Caching from any service
- Sending any email
- S3 file operations
- JWT token generation or verification

These are globally available because `SharedModule` is decorated with `@Global()`.

### When to use transactions

Use TypeORM `QueryRunner` transactions when:
- Multiple tables need to be written atomically
- A failure in step 2 should roll back step 1
- You are implementing a saga-style workflow

```typescript
const queryRunner = this.dataSource.createQueryRunner();
await queryRunner.connect();
await queryRunner.startTransaction();
try {
    await queryRunner.manager.save(entity1);
    await queryRunner.manager.save(entity2);
    await queryRunner.commitTransaction();
} catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
} finally {
    await queryRunner.release();
}
```

### When to use `@nestjs/schedule`

`ScheduleModule` is imported in `AppModule`. Use `@Cron()` decorators for:
- Periodic cleanup of expired OTPs
- Scheduled email reminders
- Periodic cache warming

### When to add a new path alias

When you create a new top-level library folder under `libs/@oc/server-core/` or `libs/@oc/business-core/`, add a corresponding alias to `tsconfig.json` paths. This prevents brittle relative imports.

---

## 📋 Developer Checklist

Before every PR, verify the following:

### Code Quality

- [ ] No business logic in controllers
- [ ] No repository calls from controllers
- [ ] All errors thrown with `ERR_*` key strings from `error.json`
- [ ] All success responses use `SuccessConstant.*` keys
- [ ] All responses wrapped in `new AppResponse()`
- [ ] Module name included in `AppResponse` parameters

### DTO & Validation

- [ ] Request DTOs use custom validators from `@core-custom-validators`
- [ ] No raw `class-validator` decorators in DTOs
- [ ] Column lengths reference `@core-constants`, not magic numbers
- [ ] Response DTOs explicitly exclude `password`, `salt`, and other sensitive fields
- [ ] Optional fields use `@ValidateOptional()` as the first decorator

### Database

- [ ] New entities extend a base entity (`BaseModifiableEntityWithoutIdentity` or `BaseModifiableEntity`)
- [ ] Column names use `snake_case` via the `name` property
- [ ] Queries use explicit `select()` — no wildcard selects on sensitive entities
- [ ] Sort fields use a `SORT_MAP` whitelist
- [ ] Delete operations use `softRemove()`, never `delete()` or `remove()`
- [ ] Schema changes have a migration (no `DATABASE_SYNC=true` in production)

### Module Wiring

- [ ] Module exports only the service, never the repository
- [ ] Cross-module dependency goes through the service, not the repository
- [ ] New module registered in `app.module.ts`
- [ ] Entity registered in `TypeOrmModule.forFeature([...])`

### Swagger

- [ ] Every controller method uses `@ApiResponseStatus()`
- [ ] Guarded methods have `@ApiBearerAuth()`
- [ ] `@ApiTags('...')` on every controller class

### Security

- [ ] No sensitive data (`password`, `token`, `secret`) logged
- [ ] Route-level guards applied where needed
- [ ] Parameterized queries used — no string interpolation in QueryBuilder

### Performance

- [ ] List/dropdown endpoints check cache before hitting DB
- [ ] Write operations clear the relevant module list cache
- [ ] Cache keys use `GetCacheKey()` utility
