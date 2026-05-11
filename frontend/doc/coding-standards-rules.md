# Coding Standards Rules - Sports Engine Frontend

## 🚀 Quick Start Guide for New Developers

### **Before You Start Coding:**

1. **Read this document** - Takes 15 minutes, saves hours of reviews
2. **Check existing code** - Look at `lib/@oc/ui-module/modules/court/` for examples
3. **Use the templates** - Copy-paste from examples, don't start from scratch
4. **Run ESLint** - Fix all warnings before committing

### **Daily Checklist:**

- [ ] Vuexy components checked first before custom components
- [ ] No `any` types used
- [ ] All validation values use constants
- [ ] Regions used for code organization
- [ ] TypeScript strict mode enabled
- [ ] Tests written for new features
- [ ] Code passes ESLint + Prettier

## 📋 Overview

This document defines the coding standards and best practices for the Sports Engine frontend application. These standards ensure consistency, maintainability, and high code quality across the entire codebase.

**🎯 Goal**: Any developer can write production-ready code following these rules.

## 🛠️ Practical Implementation Guide

### **Creating a New Module - Step by Step:**

1. **Create the module directory structure:**

   ```bash
   mkdir -p lib/@oc/ui-module/modules/{your-module}
   cd lib/@oc/ui-module/modules/{your-module}
   ```

2. **Create the 6 required files:**

   ```bash
   touch {your-module}.types.ts
   touch {your-module}.schema.ts
   touch {your-module}.api.service.ts
   touch {your-module}.tanstack.query.hook.ts
   touch {your-module}.function.service.ts
   touch index.ts
   ```

3. **Copy templates from court module and modify**

4. **Update the modules index.ts:**

   ```typescript
   // ❌ WRONG: Never use export *
   // export * from './{your-module}';

   // ✅ CORRECT: Explicit exports only
   export { {YourModule}ApiService } from './{your-module}/{your-module}.api.service';
   export { {YourModule}FunctionService } from './{your-module}/{your-module}.function.service';
   export { use{YourModule}Queries } from './{your-module}/{your-module}.tanstack.query.hook';
   ```

## 📝 Code Templates

### **Quick Copy-Paste Templates:**

#### **Types Template** (`{module}.types.ts`):

```typescript
import { ApiResponse, CommonSearchRequest, CommonSearchResponse } from "@ui-core-response";

// #region {Module} Entity Types
export interface {Module} {
  id: string;
  name: string;
  createdAt: string;
}
// #endregion

// #region {Module} DTO Types
export interface {Module}CreateDto {
  name: string;
}

export interface {Module}UpdateDto {
  name: string;
}

export interface {Module}SearchRequestDto extends CommonSearchRequest {
  // Add module-specific filters here
}

export interface {Module}SearchResponseDto extends CommonSearchResponse<{Module}> {}
// #endregion

// #region API Response Types
export interface {Module}CreateResponse extends ApiResponse<{Module}> {}
export interface {Module}UpdateResponse extends ApiResponse<{Module}> {}
export interface {Module}DeleteResponse extends ApiResponse<void> {}
export interface {Module}SearchApiResponse extends ApiResponse<{Module}SearchResponseDto> {}
// #endregion
```

## ⚠️ Critical Rules (Must Follow)

### 0. **Index.ts Export Rules (MANDATORY):**

### 0.1 **Component Prop Types Location (MANDATORY):**

```typescript
// ❌ WRONG: Prop types in src/modules/*/types.ts
// src/modules/role/types.ts
export interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  // ...
}

// ✅ CORRECT: Prop types in hook files only
// src/modules/role/roleList/useRoleList.ts
export interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  // ...
}
```

**STRICT RULE**: Component prop types must NOT be defined in `src/modules/*/types.ts` files. All prop types should be defined in their respective hook files (`use*.ts`) where the component logic resides. This keeps related types and logic together.

```typescript
// ❌ WRONG: Export everything (pollutes public API)
export * from "./module.types";
export * from "./module.schema";

// ✅ CORRECT: Export only what's needed by consumers
// Types (public interface)
export type {
  Module,
  ModuleCreateDto,
  ModuleUpdateDto,
  ModuleSearchRequestDto,
} from "./module.types";
```

**STRICT RULE**: Index.ts files must only export the public API that consumers need. Never use `export *` as it exposes internal implementation details and creates tight coupling.

### 1. **Vuexy Component Priority (MANDATORY):**

```typescript
// ✅ ALWAYS check Vuexy components first
// 1. Search Vuexy documentation for component
// 2. Use Vuexy component if available
// 3. Only create custom if Vuexy doesn't have it
// 4. Ask for clarification if unsure

// Vuexy Component Categories to Check:
// - Forms: Input, Select, Checkbox, Radio, Textarea
// - Data Display: Table, Card, List, Chip, Badge
// - Navigation: Menu, Breadcrumb, Tab, Pagination
// - Feedback: Alert, Dialog, Modal, Snackbar, Progress
// - Layout: Grid, Container, Divider, Spacer

// ❌ NEVER create custom components without checking Vuexy first
// Custom components should be last resort only!
```

### 2. **NEVER Use These:**

```typescript
// ❌ NEVER use any
const data: any = apiResponse; // WRONG!

// ❌ NEVER use static validation values
.max(50, "error") // WRONG!
.min(1, "error") // WRONG!

// ❌ NEVER use direct string literals for values - ALWAYS use constants/enums
orderDirection: sorting[0]?.desc ? 'DESC' : 'ASC' // WRONG!
status: 'active' // WRONG!
role: 'admin' // WRONG!

// ❌ NEVER use window.confirm - ALWAYS use confirmation dialogs
const confirmed = window.confirm('Are you sure?'); // WRONG!

// ❌ NEVER show success toasts in TanStack Query mutation hooks
// Only error toasts allowed in onSuccess handlers - success indicated by UI changes

// ❌ NEVER skip TypeScript
function myFunc(param) { // WRONG! Missing types
```

### 2. **ALWAYS Use These:**

```typescript
// ✅ ALWAYS define constants
export const {Module}Constants = {
  NameMaxLength: 50,
  NameMinLength: 1
} as const;

// ✅ ALWAYS use proper types
interface ApiError {
  response?: { data?: { message?: string } };
}

// ✅ ALWAYS use regions
// #region {Module} Types
// #endregion

// ✅ ALWAYS use react-toastify for toasts
import { toast } from 'react-toastify';
// ❌ NEVER use react-hot-toast or other toast libraries

// ✅ ALWAYS use Grid2 from MUI (not deprecated Grid)
import Grid from '@mui/material/Grid2';
// ❌ NEVER import { Grid } from '@mui/material'

// ✅ ALWAYS use constants/enums for values - NEVER direct string literals
import { OrderDirectionEnum } from '@ui-core-enums';
orderDirection: sorting[0]?.desc ? OrderDirectionEnum.DESC : OrderDirectionEnum.ASC;
// ❌ NEVER: orderDirection: sorting[0]?.desc ? 'DESC' : 'ASC'

// ✅ NEVER show success toast notifications in mutation hooks
// Only show error toasts in mutation hooks - success indicated by UI feedback
// Remove all toast.success() calls from TanStack Query onSuccess handlers

// ✅ ALWAYS use confirmation dialogs instead of window.confirm
// Use proper confirmation dialog components for destructive actions
// Never use browser alert/confirm dialogs

// Example: Proper confirmation dialog usage
const [deleteDialog, setDeleteDialog] = useState({ open: false, item: undefined });
const handleDeleteClick = (item) => handleDeleteDialog(item, setDeleteDialog);
const handleConfirmDelete = async () => { /* delete logic */ setDeleteDialog({ open: false }) };
<DeleteConfirmation open={deleteDialog.open} title={deleteDialog.item?.name} onDelete={handleConfirmDelete} onCancel={() => setDeleteDialog({ open: false })} />

## General Principles

### 1. Code Quality
- **TypeScript First**: All code must be written in TypeScript
- **Strict Mode**: Enable strict type checking and no implicit any
- **No Any Type**: Never use `any` type - use `unknown` for truly dynamic types or proper type definitions
- **ESLint Compliance**: All code must pass ESLint checks
- **Prettier Formatting**: Use Prettier for consistent code formatting

### 2. Naming Conventions

#### Files and Directories
- **PascalCase**: Components (`CourtForm.tsx`, `BatchCard.tsx`)
- **camelCase**: Utilities, hooks, services (`useCourtForm.ts`, `courtApiService.ts`)
- **kebab-case**: Directories (`court-form`, `batch-management`)
- **Module Files**: `{module}.{purpose}.ts` (`court.types.ts`, `court.schema.ts`)

#### Variables and Functions
- **camelCase**: Variables, functions, methods (`courtName`, `handleSubmit`)
- **PascalCase**: Types, interfaces, enums (`Court`, `CourtCreateDto`)
- **UPPER_SNAKE_CASE**: Constants (`COURT_BASE_URL`, `MAX_FILE_SIZE`)

#### Components
- **PascalCase**: Component names (`CourtTable`, `BatchForm`)
- **Descriptive**: Use descriptive names (`CourtManagement` not `Court`)
- **Suffix Pattern**: Forms (`CourtForm`), Tables (`CourtTable`), Cards (`CourtCard`)

### 3. File Structure and Organization

#### Module File Structure
Each module MUST follow this exact structure:

```

lib/@oc/ui-module/modules/{module}/
├── {module}.types.ts # TypeScript interfaces
├── {module}.schema.ts # Yup validation schemas
├── {module}.api.service.ts # API service functions
├── {module}.tanstack.query.hook.ts # React Query hooks
├── {module}.function.service.ts # Business logic functions
└── index.ts # Centralized exports

```

#### Component File Structure
**📋 REQUIRED: Follow this exact structure for ALL modules:**

```

src/modules/{module-name}/
├── {module-name}Form/ # Form components (create/edit)
│ ├── index.tsx # Main form component
│ └── use{ModuleName}Form.ts # Form hook (camelCase)
├── {module-name}List/ # List components (table/grid)
│ ├── components/ # Sub-components folder
│ │ ├── {ModuleName}Table.tsx # Table component (PascalCase)
│ │ ├── {ModuleName}Card.tsx # Card component (PascalCase)
│ │ └── {ModuleName}Filters.tsx # Filters component (PascalCase)
│ ├── index.tsx # Main list component
│ └── use{ModuleName}List.ts # List hook (camelCase)
├── types.ts # Module-specific types
└── index.ts # Module exports

````

**Example Implementation:**
```bash
# Creating a new batch module
mkdir -p src/modules/batch/batchForm
mkdir -p src/modules/batch/batchList/components

# Files to create:
touch src/modules/batch/batchForm/index.tsx
touch src/modules/batch/batchForm/useBatchForm.ts
touch src/modules/batch/batchList/index.tsx
touch src/modules/batch/batchList/useBatchList.ts
touch src/modules/batch/batchList/components/BatchTable.tsx
touch src/modules/batch/types.ts
touch src/modules/batch/index.ts
````

## TypeScript Standards

### 1. Type Definitions

#### Interface Naming

```typescript
// Entity Types
export interface Court {
  id: string;
  name: string;
  createdAt: string;
}

// DTO Types
export interface CourtCreateDto {
  name: string;
}

export interface CourtUpdateDto {
  name: string;
}

// Response Types
export interface CourtCreateResponse extends ApiResponse<Court> {}
```

#### Generic Constraints

```typescript
// Use constraints for better type safety
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

// Avoid any, use unknown for truly dynamic types
export interface CommonSearchRequest {
  searchText?: string;
  pageNumber?: number;
  [key: string]: unknown; // Allow additional filters
}
```

### 2. Import/Export Patterns

#### Import Organization

**📋 Checklist:**

- [ ] React imports first
- [ ] Third-party libraries second
- [ ] UI-Core imports third (alphabetical)
- [ ] UI-Module imports fourth
- [ ] Local imports fifth
- [ ] Type imports last (with `import type`)

```typescript
// ✅ CORRECT: Follow this exact order
// 1. React imports
import { useState, useEffect } from "react";

// 2. Third-party libraries (alphabetical)
import { useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

// 3. UI-Core imports (alphabetical)
import { apiClient } from "@ui-core-api";
import { OrderDirectionEnum } from "@ui-core-enums";

// 4. UI-Module imports
import { useGetCourts, courtCreateSchema } from "@ui-module/court";

// 5. Local imports (relative paths)
import { CourtTable } from "./components/CourtTable";

// 6. Type imports (always at end)
import type { Court } from "@ui-module/court";

// ❌ WRONG: Don't mix import types
// import type { Court } from '@ui-module/court'; // Don't put types in middle
// import { useState } from 'react'; // React imports should be first
```

#### Export Patterns

```typescript
// index.ts - Selective exports only (MANDATORY)
// ❌ WRONG: Never use export *
export * from "./court.types"; // POLLUTES PUBLIC API!

// ✅ CORRECT: Export only public interface
// Types (public interface)
export type {
  Court,
  CourtCreateDto,
  CourtUpdateDto,
  CourtSearchRequestDto,
} from "./court.types";

// Schemas (for form validation)
export {
  courtCreateSchema,
  courtUpdateSchema,
  courtSearchSchema,
  CourtConstants,
} from "./court.schema";

// Hooks (for data fetching)
export {
  useGetCourts,
  useCreateCourt,
  useUpdateCourt,
  useDeleteCourt,
} from "./court.tanstack.query.hook";

// Functions (for business logic)
export {
  courtFormFunctions,
  courtConfirmationFunctions,
} from "./court.function.service";
```

## Schema and Validation Standards

### 1. Yup Schema Organization

#### Constants for Validation Values

**NEVER use static values in validations** - Always define constants for lengths, limits, and other validation parameters:

```typescript
// ✅ CORRECT: Use constants
export const CourtEntityConstant = {
  NameMaxLength: 50,
  NameMinLength: 1,
};

// ❌ WRONG: Never use static values
// .max(50, "Cannot exceed 50 characters") // NO!
// .min(1, "Must be at least 1 character") // NO!
```

#### Region-Based Organization

```typescript
// #region Court Constants
export const CourtEntityConstant = {
  NameMaxLength: 50,
  NameMinLength: 1,
};
// #endregion

// #region Court Form Schemas
export const courtCreateSchema = yup.object().shape({
  name: nameValidation
    .min(CourtEntityConstant.NameMinLength, `Court name cannot be empty`)
    .max(
      CourtEntityConstant.NameMaxLength,
      `Court name cannot exceed ${CourtEntityConstant.NameMaxLength} characters`,
    ),
});
// #endregion

// #region Court Entity Schema
export const courtEntitySchema = yup.object().shape({
  id: idValidation,
  name: nameValidation,
  createdAt: yup.string().required(),
});
// #endregion
```

#### Schema Reuse

```typescript
// Extend common validations
import { nameValidation, emailValidation } from "@ui-core-schema";

export const courtCreateSchema = yup.object().shape({
  name: nameValidation.min(1).max(50),
  contactEmail: emailValidation.optional(),
});
```

### 2. Type Inference

```typescript
// Export inferred types
export type CourtCreateFormValues = yup.InferType<typeof courtCreateSchema>;
export type CourtSearchFormValues = yup.InferType<typeof courtSearchSchema>;
export type CourtEntity = yup.InferType<typeof courtEntitySchema>;
```

## API Service Standards

### 1. Service Structure

```typescript
const COURT_BASE_URL = "/courts";

export const courtApiService = {
  // GET operations
  async getCourts(
    params?: CourtSearchRequestDto,
  ): Promise<CourtSearchApiResponse> {
    const response = await apiClient.getList<Court>(COURT_BASE_URL, params);
    return response.data;
  },

  // POST operations
  async createCourt(data: CourtCreateDto): Promise<CourtCreateResponse> {
    const response = await apiClient.create<Court>(COURT_BASE_URL, data);
    return response.data;
  },

  // PUT operations
  async updateCourt(
    id: string,
    data: CourtUpdateDto,
  ): Promise<CourtUpdateResponse> {
    const response = await apiClient.update<Court>(COURT_BASE_URL, id, data);
    return response.data;
  },

  // DELETE operations
  async deleteCourt(id: string): Promise<CourtDeleteResponse> {
    const response = await apiClient.remove<void>(COURT_BASE_URL, id);
    return response.data;
  },
};
```

### 2. Error Handling

**NEVER use `any` for error types** - Define proper error interfaces:

```typescript
// ✅ CORRECT: Define proper error types
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
}

// ❌ WRONG: Never use any for errors
// onError: (error: any) => { ... }

export const useCreateCourt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CourtCreateDto) => courtApiService.createCourt(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURT_QUERY_KEYS.lists() });
      toast.success(response.message || "Court created successfully");
    },
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || "Failed to create court");
    },
  });
};
```

## React Query (TanStack) Standards

### 1. Query Keys Structure

```typescript
export const COURT_QUERY_KEYS = {
  all: ["courts"] as const,
  lists: () => [...COURT_QUERY_KEYS.all, "list"] as const,
  list: (params: CourtSearchRequestDto) =>
    [...COURT_QUERY_KEYS.lists(), params] as const,
  details: () => [...COURT_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...COURT_QUERY_KEYS.details(), id] as const,
};
```

### 2. Hook Patterns

```typescript
export const useGetCourts = (params: CourtSearchRequestDto = {}) => {
  return useQuery({
    queryKey: COURT_QUERY_KEYS.list(params),
    queryFn: () => courtApiService.getCourts(params),
    placeholderData: (previousData) => previousData, // Keep previous data while loading
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### 3. Mutation Patterns

```typescript
export const useCreateCourt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CourtCreateDto) => courtApiService.createCourt(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURT_QUERY_KEYS.lists() });
    },
  });
};
```

## Component Standards

### 1. Component Structure

```typescript
'use client';

import { useState } from 'react';
import { Card, Typography } from '@mui/material';

// Props interface
interface CourtFormProps {
  court?: Court;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Component definition
const CourtForm = ({ court, onSuccess, onCancel }: CourtFormProps) => {
  // Hooks at top
  const [isLoading, setIsLoading] = useState(false);

  // Event handlers
  const handleSubmit = async () => {
    // Implementation
  };

  // Render
  return (
    <Card>
      <Typography variant="h6">Court Form</Typography>
      {/* JSX */}
    </Card>
  );
};

export default CourtForm;
```

### 2. Custom Hook Patterns

```typescript
interface UseCourtFormProps {
  courtToEdit?: Court | null;
  onClose: () => void;
}

export const useCourtForm = ({ courtToEdit, onClose }: UseCourtFormProps) => {
  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courtCreateSchema),
  });

  // Mutations
  const createMutation = useCreateCourt();
  const updateMutation = useUpdateCourt();

  // Submit handler
  const onSubmit = async (data: CourtCreateFormValues) => {
    try {
      if (courtToEdit) {
        await updateMutation.mutateAsync({ id: courtToEdit.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      handleFormSuccess();
      onClose();
    } catch (error) {
      handleFormError(error);
    }
  };

  return {
    control,
    errors,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    handleSubmit: handleSubmit(onSubmit),
  };
};
```

## Function Service Standards

### 1. Business Logic Organization

```typescript
// #region Court Form Functions
export const courtFormFunctions = {
  handleFormSuccess: (message?: string) => {
    toast.success(message || "Court saved successfully");
  },

  handleFormError: (error: any) => {
    const message = error?.response?.data?.message || "Failed to save court";
    toast.error(message);
  },

  validateCourtName: async (
    name: string,
    existingCourts: Court[] = [],
  ): Promise<boolean> => {
    const exists = existingCourts.some((court) => court.name === name);
    if (exists) {
      toast.error("Court name already exists");
      return false;
    }
    return true;
  },
};
// #endregion
```

## Code Organization Standards

### 1. Region Usage

Use regions to organize code within files:

```typescript
// #region Imports
// #endregion

// #region Constants
// #endregion

// #region Types
// #endregion

// #region Component
// #endregion
```

### 2. Comment Standards

```typescript
// Single line comments for clarification
/* Multi-line comments for complex logic */

/**
 * JSDoc comments for functions and components
 * @param {string} name - The court name
 * @returns {boolean} Validation result
 */
```

### 3. Magic Numbers and Static Values

**NEVER use magic numbers or static values** - Always define named constants:

```typescript
// ✅ CORRECT: Define all constants
export const CourtConstants = {
  NameMaxLength: 50,
  NameMinLength: 1,
  DebounceDelay: 500,
  StaleTime: 5 * 60 * 1000, // 5 minutes
  PageSize: 10,
  MaxPageSize: 100,
} as const;

// ❌ WRONG: Never use magic numbers
// .max(50, "error") // NO!
// setTimeout(callback, 500) // NO!
// staleTime: 300000 // NO!
```

## Performance Standards

### 1. React Best Practices

- **Memoization**: Use `useMemo` for expensive computations
- **Callbacks**: Use `useCallback` for event handlers passed to children
- **Effects**: Proper cleanup in `useEffect`
- **Dependencies**: Include all dependencies in dependency arrays

### 2. Bundle Optimization

- **Lazy Loading**: Use `React.lazy` for route components
- **Code Splitting**: Leverage Next.js dynamic imports
- **Tree Shaking**: Ensure unused code is eliminated

### 3. API Optimization

- **Debouncing**: Search inputs with 500ms delay
- **Pagination**: Implement proper pagination for large datasets
- **Caching**: Utilize React Query caching strategies

## Testing Standards

### 1. Test File Organization

```
__tests__/
├── unit/
│   ├── court.schema.test.ts
│   └── court.functions.test.ts
├── integration/
│   └── court.api.test.ts
└── e2e/
    └── court-management.test.ts
```

### 2. Test Naming

- **Unit Tests**: `describe('courtSchema', () => { ... })`
- **Integration Tests**: `describe('Court API Service', () => { ... })`
- **E2E Tests**: `describe('Court Management Flow', () => { ... })`

## Documentation Standards

### 1. README Files

Each module should have a README.md with:

- Purpose and scope
- API documentation
- Usage examples
- Dependencies

### 2. Code Comments

- **Complex Logic**: Explain non-obvious algorithms
- **Business Rules**: Document domain-specific rules
- **TODO/FIXME**: Mark areas needing attention

### 3. API Documentation

- **Endpoint Documentation**: Describe all API endpoints
- **Request/Response**: Document data structures
- **Error Codes**: List possible error responses

## Git and Version Control

### 1. Commit Messages

```
feat: add court creation functionality
fix: resolve court name validation issue
docs: update API documentation
refactor: optimize court list performance
```

### 2. Branch Naming

```
feature/court-management
bugfix/court-validation
hotfix/critical-security-patch
```

### 3. Pull Request Standards

- **Descriptive Title**: Clear summary of changes
- **Detailed Description**: What, why, and how
- **Testing Instructions**: How to verify changes
- **Screenshots**: UI changes with before/after

## 🚨 Common Mistakes & How to Fix Them

### **Mistake 1: Using `any` Type**

```typescript
// ❌ WRONG
const handleError = (error: any) => {
  console.log(error.message);
};

// ✅ FIX
interface ApiError {
  response?: { data?: { message?: string } };
  message?: string;
}

const handleError = (error: ApiError) => {
  console.log(error?.response?.data?.message || error?.message);
};
```

### **Mistake 2: Static Validation Values**

```typescript
// ❌ WRONG
const schema = yup.object({
  name: yup.string().max(50, "Too long"),
});

// ✅ FIX
const Constants = { NameMaxLength: 50 } as const;
const schema = yup.object({
  name: yup
    .string()
    .max(
      Constants.NameMaxLength,
      `Cannot exceed ${Constants.NameMaxLength} characters`,
    ),
});
```

### **Mistake 3: Missing Regions**

```typescript
// ❌ WRONG
export interface User {
  name: string;
}
export const userSchema = yup.object({ name: yup.string() });
export const getUsers = () => {
  /* ... */
};

// ✅ FIX
// #region User Types
export interface User {
  name: string;
}
// #endregion

// #region User Schemas
export const userSchema = yup.object({ name: yup.string() });
// #endregion

// #region User API Functions
export const getUsers = () => {
  /* ... */
};
// #endregion
```

### **Mistake 4: Using `export *` in Index Files**

```typescript
// ❌ WRONG: Pollutes public API with internal details
export * from "./module.types";
export * from "./module.schema";
export * from "./module.api.service";

// ✅ FIX: Selective exports only
export type { Module, ModuleCreateDto, ModuleUpdateDto } from "./module.types";
```

### **Mistake 5: Wrong Import Order**

```typescript
// ❌ WRONG
import { Card } from "@mui/material";
import { useGetUsers } from "@ui-module/user";
import { useState } from "react";
import type { User } from "./types";

// ✅ FIX
import { useState } from "react";
import { Card } from "@mui/material";
import { useGetUsers } from "@ui-module/user";
import type { User } from "./types";
```

## 🔧 Troubleshooting Guide

### **ESLint Errors:**

- **"Missing return type"**: Add explicit return types to all functions
- **"Unexpected any"**: Replace `any` with proper types or `unknown`
- **"Unused variable"**: Remove unused variables or prefix with `_`

### **TypeScript Errors:**

- **"Property X does not exist"**: Check interface definitions
- **"Type Y is not assignable"**: Verify type compatibility
- **"Cannot find module"**: Check import paths and tsconfig paths

### **Build Errors:**

- **Module not found**: Verify file exists and path is correct
- **Export not found**: Check module's index.ts exports

## 📚 Quick Reference

### **File Naming:**

- Components: `ComponentName.tsx` (PascalCase)
- Hooks: `useHookName.ts` (camelCase)
- Services: `serviceName.ts` (camelCase)
- Types: `entity.types.ts` (camelCase)

### **Module Structure (MANDATORY):**

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

### **Regions to Always Use:**

- `#region Imports`
- `#region Component`
- `#region Types`
- `#region Hooks`
- `#region Effects`
- `#region Handlers`

### **Constants Pattern:**

```typescript
export const {Module}Constants = {
  FieldName: value
} as const;
```

### **Component Prop Types Location (MANDATORY):**

```typescript
// ❌ NEVER: src/modules/{module}/types.ts
export interface {Module}TableProps { /* ... */ }

// ✅ ALWAYS: src/modules/{module}/{module}List/use{Module}List.ts
export interface {Module}TableProps { /* ... */ }
export const use{Module}List = () => { /* ... */ };
```

### **Error Interface:**

```typescript
interface ApiError {
  response?: { data?: { message?: string } };
  message?: string;
}
```

These coding standards ensure consistency, maintainability, and scalability across the Sports Engine frontend codebase. **Follow them strictly - they exist to make your life easier!** 🎯
