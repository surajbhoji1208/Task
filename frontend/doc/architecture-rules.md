# Architecture Rules - Sports Engine Frontend

## 🚀 Quick Start for New Developers

### **Understanding the Architecture (5 minutes):**

1. **UI-Core**: Reusable stuff everyone uses
2. **UI-Module**: Feature-specific code (court, batch, etc.)
3. **Components**: UI building blocks
4. **Everything connects** through imports and hooks

### **When Adding a Feature:**

1. **Check UI-Core first** - Is it already there?
2. **Create module in UI-Module** - Follow the 6-file pattern
3. **Use existing components** - Don't reinvent the wheel
4. **Connect with hooks** - Use TanStack Query for data

### **Daily Architecture Checklist:**

- [ ] Using UI-Core imports correctly
- [ ] Following module file structure
- [ ] Using TanStack Query, not direct API calls
- [ ] Components are properly layered (Page → View → UI)
- [ ] State is managed at the right level

## 📋 Overview

This document defines the architectural patterns and rules for the Sports Engine frontend application. The architecture follows a modular, scalable approach with clear separation of concerns.

**🎯 Goal**: Predictable, maintainable code that scales with your team.

## 🛠️ Practical Implementation Guide

### **Creating a New Feature - Step by Step:**

1. **Identify the Module** (court, batch, student, etc.)
2. **Check UI-Core** - What reusable parts exist?
3. **Create Module Structure** - Use the exact 6-file pattern
4. **Implement Layer by Layer** - API → Types → Hooks → Components
5. **Connect to UI** - Use hooks in components

#### **Creating Module Folder Structure:**

```bash
# 1. Create module directory
mkdir -p src/modules/{module-name}

# 2. Create Form folder structure
mkdir -p src/modules/{module-name}/{module-name}Form

# 3. Create List folder structure
mkdir -p src/modules/{module-name}/{module-name}List/components

# 4. Create required files
touch src/modules/{module-name}/{module-name}Form/index.tsx
touch src/modules/{module-name}/{module-name}Form/use{ModuleName}Form.ts
touch src/modules/{module-name}/{module-name}List/index.tsx
touch src/modules/{module-name}/{module-name}List/use{ModuleName}List.ts
touch src/modules/{module-name}/{module-name}List/components/{ModuleName}Table.tsx
touch src/modules/{module-name}/types.ts
touch src/modules/{module-name}/index.ts
```

### **Layer Responsibility Guide:**

| Layer          | Responsibility   | Example                        |
| -------------- | ---------------- | ------------------------------ |
| **UI-Core**    | Common utilities | `apiClient`, `nameValidation`  |
| **UI-Module**  | Feature logic    | Court CRUD, validation schemas |
| **Components** | UI rendering     | CourtTable, CourtForm          |
| **Pages**      | Route handling   | `/courts` page                 |

### **Data Flow Pattern:**

```
API Response → UI-Module Hook → Component → UI
     ↓             ↓             ↓       ↓
 TanStack Query → useGetCourts → CourtList → CourtTable
```

## ⚠️ Architecture Rules (Must Follow)

### **Rule 1: Never Call APIs Directly in Components**

```typescript
// ❌ WRONG: Direct API calls in components
const CourtList = () => {
  const [courts, setCourts] = useState([]);
  useEffect(() => {
    apiClient.get("/courts").then(setCourts);
  }, []);
};

// ✅ CORRECT: Use UI-Module hooks
const CourtList = () => {
  const { data: courts } = useGetCourts();
};
```

### **Rule 2: Always Use UI-Core for Common Logic**

```typescript
// ❌ WRONG: Duplicate validation
const nameSchema = yup.string().min(2).max(100);

// ✅ CORRECT: Use UI-Core validation
import { nameValidation } from "@ui-core-schema";
const nameSchema = nameValidation;
```

### **Rule 3: Follow Module File Structure**

Every module MUST have exactly these 6 files:

- `{module}.types.ts` - TypeScript interfaces
- `{module}.schema.ts` - Validation schemas
- `{module}.api.service.ts` - API functions
- `{module}.tanstack.query.hook.ts` - React Query hooks
- `{module}.function.service.ts` - Business logic
- `index.ts` - Exports

## Core Architecture Principles

### 1. Modular Architecture Pattern

The application uses a **Server-Core & Server-Module** architecture pattern organized under `lib/@oc/`:

```
lib/@oc/
├── ui-core/           # Common reusable components
│   ├── api/          # API client and interceptors
│   ├── enum/         # Shared enumerations
│   ├── response/     # Common response types
│   ├── schemas/      # Common validation schemas
│   └── types/        # Shared TypeScript types
└── ui-module/        # Module-specific implementations
    └── modules/
        └── {module-name}/
            ├── {module-name}.types.ts
            ├── {module-name}.schema.ts
            ├── {module-name}.api.service.ts
            ├── {module-name}.tanstack.query.hook.ts
            ├── {module-name}.function.service.ts
            └── index.ts
```

### 2. UI-Core (Common Layer)

Contains all reusable, framework-agnostic components:

#### API Layer (`ui-core/api/`)

- **Single API Client**: Axios-based client with interceptors
- **Authentication**: JWT token handling via interceptors
- **Error Handling**: Centralized error processing
- **Request Tracking**: Request IDs and timing logs

#### Response Types (`ui-core/response/`)

- **ApiResponse<T>**: Standard API response wrapper
- **CommonSearchRequest**: Pagination and filtering interface
- **CommonSearchResponse<T>**: Paginated response structure
- **PaginatedApiResponse<T>**: Combined API + pagination response

#### Validation Schemas (`ui-core/schemas/`)

- **Common Validations**: Reusable Yup schemas (email, name, phone, etc.)
- **Schema Builders**: Helper functions for creating search schemas
- **File Validations**: Image and document upload validations

#### Enums (`ui-core/enum/`)

- **OrderDirectionEnum**: ASC/DESC sorting
- **User Roles**: Authentication and authorization enums
- **Status Enums**: Active/inactive states

### 3. UI-Module (Business Layer)

Module-specific implementations following consistent patterns:

#### Module Structure Requirements

Each module MUST contain these files:

1. **`{module}.types.ts`**
   - Entity interfaces extending common types
   - DTO interfaces (Create, Update, Search)
   - API response type aliases
   - Component prop interfaces

2. **`{module}.schema.ts`**
   - Form validation schemas using Yup
   - Entity validation schemas
   - Search/filter validation schemas
   - Type exports for form values

3. **`{module}.api.service.ts`**
   - CRUD operation functions
   - API endpoint constants
   - Data transformation logic
   - Error handling wrappers

4. **`{module}.tanstack.query.hook.ts`**
   - Query keys definitions
   - useQuery hooks for data fetching
   - useMutation hooks for data modification
   - Cache invalidation logic

5. **`{module}.function.service.ts`**
   - Business logic functions
   - Form success/error handlers
   - Validation helpers
   - Toast notifications

6. **`index.ts`**
   - Centralized exports for the module
   - Clean import interface

## Import Rules & Path Aliases

### TypeScript Path Mappings (`tsconfig.json`)

```json
{
  "paths": {
    "@ui-core-api": ["lib/@oc/ui-core/api/index.ts"],
    "@ui-core-enums": ["lib/@oc/ui-core/enum/index.ts"],
    "@ui-core-response": ["lib/@oc/ui-core/response/index.ts"],
    "@ui-core-schema": ["lib/@oc/ui-core/schemas/index.ts"],
    "@ui-core-types": ["lib/@oc/ui-core/types/index.ts"],
    "@ui-module/*": ["lib/@oc/ui-module/modules/*"],
    "@/*": ["./src/*"],
    "@core/*": ["./src/@core/*"]
  }
}
```

### Import Priority Order

1. **React imports** (useState, useEffect, etc.)
2. **Third-party libraries** (axios, yup, etc.)
3. **UI-Core imports** (@ui-core-\*)
4. **UI-Module imports** (@ui-module/\*)
5. **Local imports** (./, ../)
6. **Type imports** (import type)

## API Integration Patterns

### TanStack Query Usage

- **Query Keys**: Structured with arrays for proper invalidation
- **Stale Time**: 5 minutes for list queries
- **Cache Strategy**: Automatic invalidation on mutations
- **Error Handling**: Toast notifications with user-friendly messages

### API Service Layer

- **Base URLs**: Module-specific constants
- **HTTP Methods**: RESTful CRUD operations
- **Response Transformation**: Consistent data mapping
- **Error Propagation**: Preserve original error context

## State Management Rules

### Redux Toolkit (Global State)

- **Auth State**: User authentication and tokens
- **App Settings**: Theme, layout preferences
- **Global UI State**: Modals, notifications

### TanStack Query (Server State)

- **Data Fetching**: All API data through React Query
- **Caching**: Automatic background refetching
- **Optimistic Updates**: For better UX
- **Background Sync**: Automatic data consistency

### Local State (Component State)

- **UI State**: Loading states, form data
- **Temporary State**: Modal open/close, selected items
- **Derived State**: Computed values from props/server state

## Component Architecture

### Page Components (App Router)

- **Thin Components**: Import business logic from modules
- **Route Handlers**: Next.js App Router pages
- **Layout Integration**: Use appropriate layout wrappers

### View Components (Business Logic)

- **Client Components**: 'use client' directive
- **Hook Integration**: Use module hooks for data/logic
- **State Management**: Combine local and server state
- **Error Boundaries**: Graceful error handling

### UI Components (Presentation)

- **MUI Components**: Styled with theme system
- **Custom Styling**: CSS modules or styled-components
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA attributes and keyboard navigation

## File Organization Rules

### Directory Structure

```
src/
├── app/                    # Next.js App Router
├── @core/                  # Vuexy core components
├── components/             # Feature-specific components
├── modules/               # Business modules (court, batch, etc.)
├── lib/                   # External libraries and utilities
└── types/                 # General app types
```

### Module Organization

**📋 Required Structure for ALL Modules:**

```
src/modules/{module-name}/
├── {module-name}Form/           # Form components (create/edit)
│   ├── index.tsx               # Main form component
│   └── use{ModuleName}Form.ts  # Form hook
├── {module-name}List/          # List components (table/grid)
│   ├── components/             # Sub-components
│   │   ├── {ModuleName}Table.tsx
│   │   ├── {ModuleName}Card.tsx
│   │   └── {ModuleName}Filters.tsx
│   ├── index.tsx               # Main list component
│   └── use{ModuleName}List.ts  # List hook
├── types.ts                    # Module-specific types
└── index.ts                    # Module exports
```

**Example - Court Module:**

```
src/modules/court/
├── courtForm/
│   ├── index.tsx
│   └── useCourtForm.ts
├── courtList/
│   ├── components/
│   │   ├── CourtTable.tsx
│   │   └── CourtFilters.tsx
│   ├── index.tsx
│   └── useCourtList.ts
├── types.ts
└── index.ts
```

## Performance Optimization

### Code Splitting

- **Route-based splitting**: Next.js automatic splitting
- **Component lazy loading**: React.lazy for heavy components
- **Library chunking**: Separate chunks for large libraries

### Caching Strategy

- **API Responses**: TanStack Query caching
- **Static Assets**: Next.js optimization
- **Build Optimization**: Bundle analysis and tree shaking

### Memory Management

- **Cleanup Effects**: Proper useEffect cleanup
- **Event Listeners**: Remove on unmount
- **Subscriptions**: Cancel API calls on unmount

## Security Considerations

### API Security

- **Token Management**: Secure JWT storage
- **Request Signing**: API key validation
- **CORS Configuration**: Proper origin validation

### Data Validation

- **Input Sanitization**: Server and client-side validation
- **Type Safety**: Full TypeScript coverage
- **SQL Injection Prevention**: Parameterized queries

## Testing Strategy

### Unit Tests

- **Utility Functions**: Pure functions and helpers
- **Custom Hooks**: Hook logic testing
- **API Services**: Mock API responses

### Integration Tests

- **Component Integration**: Module interactions
- **API Integration**: End-to-end API flows
- **State Management**: Redux and React Query

### E2E Tests

- **Critical User Flows**: Login, CRUD operations
- **Cross-browser Testing**: Browser compatibility
- **Performance Testing**: Load and stress testing

## Deployment & CI/CD

### Build Process

- **Type Checking**: Strict TypeScript compilation
- **Linting**: ESLint and Prettier checks
- **Bundle Analysis**: Size and performance monitoring

### Environment Configuration

- **Environment Variables**: Secure configuration
- **Build Variants**: Development, staging, production
- **Feature Flags**: Runtime feature toggling

## 🚨 Common Architecture Mistakes & Fixes

### **Mistake 1: Putting Business Logic in Components**

```typescript
// ❌ WRONG: Business logic in component
const CourtForm = () => {
  const handleSubmit = async (data) => {
    try {
      await apiClient.post("/courts", data);
      toast.success("Created!");
    } catch (error) {
      toast.error("Failed!");
    }
  };
};

// ✅ FIX: Move to UI-Module
// In court.function.service.ts
export const courtFormFunctions = {
  handleFormSuccess: () => toast.success("Created!"),
  handleFormError: (error) => toast.error(error?.message),
};

// In component
const CourtForm = () => {
  const createMutation = useCreateCourt();
  const handleSubmit = (data) => createMutation.mutate(data);
};
```

### **Mistake 2: Not Using UI-Core Components**

```typescript
// ❌ WRONG: Custom API client
const myApiClient = axios.create({ baseURL: "/api" });

// ✅ FIX: Use UI-Core
import { apiClient } from "@ui-core-api";
```

### **Mistake 3: Mixing State Management**

```typescript
// ❌ WRONG: Redux for API data
const useCourts = () => {
  const dispatch = useDispatch();
  // Complex Redux logic for API calls
};

// ✅ FIX: Use TanStack Query for server state
const useCourts = () => {
  return useQuery({
    queryKey: ["courts"],
    queryFn: () => courtApiService.getCourts(),
  });
};
```

## 🔧 Architecture Decision Guide

### **When to Create a New Module:**

- [ ] Feature has its own data model
- [ ] Feature needs CRUD operations
- [ ] Feature will be reused across pages
- [ ] Feature has complex business logic

### **When to Add to UI-Core:**

- [ ] Logic used by multiple modules
- [ ] Common validation patterns
- [ ] Shared API utilities
- [ ] Reusable types/interfaces

### **State Management Choice:**

| Data Type       | Solution       | Example                  |
| --------------- | -------------- | ------------------------ |
| **Server Data** | TanStack Query | Court list, user profile |
| **Global UI**   | Redux          | Theme, auth status       |
| **Local UI**    | useState       | Form inputs, modal open  |
| **Derived**     | useMemo        | Computed values          |

## 📚 Architecture Quick Reference

### **Import Priority (always follow this order):**

1. React imports
2. Third-party libraries
3. UI-Core imports
4. UI-Module imports
5. Local imports
6. Type imports

### **File Structure Reminder:**

**UI-Core & UI-Module (lib/@oc/):**

```
lib/@oc/
├── ui-core/           # Shared utilities
└── ui-module/         # Feature modules
    └── modules/
        └── {feature}/
            ├── {feature}.types.ts
            ├── {feature}.schema.ts
            ├── {feature}.api.service.ts
            ├── {feature}.tanstack.query.hook.ts
            ├── {feature}.function.service.ts
            └── index.ts
```

**Components (src/modules/):**

```
src/modules/{module}/
├── {module}Form/
│   ├── index.tsx
│   └── use{Module}Form.ts
├── {module}List/
│   ├── components/
│   │   └── {Module}Table.tsx
│   ├── index.tsx
│   └── use{Module}List.ts
├── types.ts
└── index.ts
```

### **Hook Usage Pattern:**

```typescript
// 1. Import module hook
import { useGetCourts } from '@ui-module/court';

// 2. Use in component
const { data, isLoading, error } = useGetCourts(params);

// 3. Handle states
if (isLoading) return <Loading />;
if (error) return <Error message={error.message} />;
return <CourtList courts={data.results} />;
```

This architecture ensures scalability, maintainability, and consistency across the entire Sports Engine frontend application. **Follow these patterns - they make complex applications simple!** 🏗️
