# Product Ratings & Review Analytics Dashboard — Frontend Machine Test

## Objective

Develop the frontend application for a **Product Ratings & Review Analytics Dashboard** using:

- Next.js
- TypeScript
- MUI
- Tailwind CSS
- SCSS
- Redux Toolkit
- TanStack Query

The frontend should provide a scalable, modular, and production-ready analytics dashboard for:

- Product analytics
- Review analytics
- CSV/Excel import
- Advanced tables
- Charts & visualizations
- Filtering and searching

Frontend architecture must strictly follow the provided architecture and coding standards documentation. :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}

---

# Important Instructions

Before implementation:

1. Carefully review the architecture rules document.
2. Carefully review the coding standards document.
3. Strictly follow the existing frontend architecture and module structure.
4. Maintain consistency with existing project patterns and standards.
5. Follow all naming conventions, folder structures, import rules, and module organization exactly.
6. Use reusable and scalable architecture only.
7. Do not create inconsistent folder structures or coding styles.

---

# Mandatory Files to Review

## Architecture Rules

Strictly follow:

- Frontend Architecture Rules Document :contentReference[oaicite:2]{index=2}

---

## Coding Standards Rules

Strictly follow:

- Frontend Coding Standards Rules Document :contentReference[oaicite:3]{index=3}

---

# Frontend Tech Stack

Use the following stack strictly:

- Next.js (App Router)
- TypeScript
- MUI
- Tailwind CSS
- SCSS Modules
- Redux Toolkit
- TanStack Query
- React Hook Form
- Yup Validation
- ApexCharts or Recharts

---

# Frontend Architecture Rules (Mandatory)

The implementation MUST follow:

## UI-Core & UI-Module Architecture

Use the architecture pattern:

```txt
lib/@oc/
├── ui-core/
└── ui-module/
```

Follow the exact module architecture pattern defined in the architecture rules. :contentReference[oaicite:4]{index=4}

---

# Module Structure Rules (Mandatory)

Every feature module MUST follow this structure exactly:

```txt
src/modules/{module-name}/
├── {module-name}Form/
│   ├── index.tsx
│   └── use{ModuleName}Form.ts
├── {module-name}List/
│   ├── components/
│   │   ├── {ModuleName}Table.tsx
│   │   ├── {ModuleName}Filters.tsx
│   │   ├── {ModuleName}Card.tsx
│   ├── index.tsx
│   └── use{ModuleName}List.ts
├── types.ts
└── index.ts
```

Strictly follow this pattern for all modules. :contentReference[oaicite:5]{index=5}

---

# Frontend Requirements

## 1. Dashboard UI

Build a responsive analytics dashboard using:

- MUI components
- Tailwind CSS utilities
- SCSS modules for component-level styling

Requirements:

- Clean dashboard layout
- Responsive design
- Reusable UI components
- Mobile-friendly behavior
- Consistent spacing and typography

---

# 2. CSV/Excel Upload Module

Implement a module for:

- Uploading CSV/Excel files
- File validation
- Upload progress
- Error handling
- Import result display

Supported formats:

- `.csv`
- `.xls`
- `.xlsx`

Requirements:

- Drag and drop upload
- Validation messages
- Loading indicators
- Retry handling
- API integration using TanStack Query

---

# 3. Product Listing Module

Implement product listing with:

- Server-side pagination
- Search
- Sorting
- Filtering
- Loading state
- Error state

Filters:

- Category
- Rating
- Review metrics

Search:

- Product name

Requirements:

- Reusable table components
- MUI table/grid components
- Query param synchronization
- Debounced search
- Pagination controls

---

# 4. Analytics Dashboard Module

Implement dashboard visualizations using:

- ApexCharts or Recharts

Required Charts:

---

## Bar Chart

### Products per Category

Requirements:

- Dynamic data
- Tooltip support
- Responsive layout

---

## Bar Chart

### Top Reviewed Products

Requirements:

- Top reviewed product ranking
- Dynamic updates
- Responsive rendering

---

## Histogram

### Discount Distribution

Requirements:

- Proper histogram visualization
- Bucket/group distribution
- Dynamic dataset support

---

## Bar Chart

### Category-wise Average Rating

Requirements:

- Average rating visualization
- Dynamic category filtering
- Responsive rendering

---

# 5. Global Filtering & Search

Implement:

- Category filter
- Rating filter
- Review filter
- Product name search

Requirements:

- Query synchronization
- URL state support
- Debounced API requests
- Reusable filter architecture

---

# 6. State Management

Use:

- Redux Toolkit → Global UI state
- TanStack Query → API/server state

Requirements:

## Redux Toolkit

Use only for:

- Global UI state
- Theme state
- Dashboard filters
- Shared UI behavior

---

## TanStack Query

Use for:

- API fetching
- Server caching
- Pagination
- Mutations
- Background refetching

Do NOT call APIs directly inside components. :contentReference[oaicite:6]{index=6}

---

# 7. Validation Rules

Use:

- React Hook Form
- Yup validation schemas

Requirements:

- Shared reusable validations
- Constants for validation values
- No magic numbers
- Centralized schema management

Follow coding standards strictly. :contentReference[oaicite:7]{index=7}

---

# 8. Styling Rules

Use:

- MUI components first
- Tailwind CSS utilities
- SCSS modules for custom styling

Requirements:

- Reusable styling
- Responsive layouts
- Avoid inline styles
- Use theme-aware styling
- Follow design consistency

Before creating custom components, check MUI first. :contentReference[oaicite:8]{index=8}

---

# 9. API Integration Rules

Use:

- TanStack Query hooks
- Dedicated API service layer

Requirements:

- No direct API calls inside components
- Centralized API handling
- Query key management
- Cache invalidation
- Error handling

Follow architecture rules strictly. :contentReference[oaicite:9]{index=9}

---

# 10. TypeScript Rules

Requirements:

- Strict typing
- No `any`
- Proper DTO typing
- Proper response typing
- Shared interfaces
- Reusable generic types

Follow coding standards strictly. :contentReference[oaicite:10]{index=10}

---

# 11. Folder & Naming Conventions

Follow exactly:

## Naming Rules

### PascalCase

- Components
- Interfaces
- Types

### camelCase

- Hooks
- Services
- Utilities

### kebab-case

- Folder names

---

# 12. Import Rules

Follow import order strictly:

1. React imports
2. Third-party libraries
3. UI-Core imports
4. UI-Module imports
5. Local imports
6. Type imports

Follow coding standards exactly. :contentReference[oaicite:11]{index=11}

---

# 13. Required Frontend Modules

Expected frontend modules may include:

- dashboard
- product
- category
- analytics
- file-upload
- filters
- charts
- shared-table

Each module should follow the required architecture structure.

---

# 14. Performance Requirements

Implement:

- Lazy loading
- Query caching
- Debounced search
- Memoization
- Optimized rendering
- Proper pagination

---

# 15. Error Handling

Implement:

- Global error handling
- API error handling
- Empty states
- Loading states
- Retry support
- Validation messages

---

# 16. Development Expectations

While implementing:

1. Follow architecture rules strictly.
2. Follow coding standards strictly.
3. Reuse existing UI-Core utilities/components.
4. Maintain clean separation of concerns.
5. Keep modules scalable and reusable.
6. Maintain production-ready quality.
7. Avoid duplicate logic.
8. Avoid hardcoded values.
9. Use constants/enums everywhere.
10. Use MUI components before creating custom components.

---

# Expected Deliverables

## Frontend Deliverables

- Next.js frontend application
- Modular architecture
- Dashboard pages
- Analytics charts
- Product listing module
- File upload module
- Shared reusable components
- Redux Toolkit integration
- TanStack Query integration
- Validation schemas
- Responsive UI
- SCSS module styling
- Tailwind utility integration

---

# Final Instruction

Act as a senior frontend architect and Next.js developer.

Before implementation:

1. Analyze the architecture rules deeply.
2. Analyze the coding standards deeply.
3. Explain the proposed frontend architecture.
4. Explain the module structure.
5. Explain state management flow.
6. Explain API integration strategy.
7. Then implement the frontend module-by-module following all architecture and coding standards strictly.

Do not generate inconsistent architecture, folder structures, naming conventions, or coding styles.

Maintain complete alignment with the provided architecture and coding standards documents.

#API flow digram 
`/home/suraj-web/Desktop/node-boilerplate/task/docs/auth-api-flow-diagram.md`
`/home/suraj-web/Desktop/node-boilerplate/task/docs/product-analytics-api-flow-diagram.md`
`/home/suraj-web/Desktop/node-boilerplate/task/docs/user-api-flow-diagram.md`
reveiw this api flow diagram and integrate them properly 

