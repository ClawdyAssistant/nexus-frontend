# NEXUS Frontend - Sprint Planning & Task Tickets

**Project:** NEXUS Multi-Tenant SaaS Frontend  
**Developer:** Clawdy (Solo Frontend Developer)  
**Sprint Duration:** 2 weeks per sprint  
**Current Phase:** Project Setup → Core Features

---

## Sprint Overview

### Tech Stack
- Next.js 14.2+ (App Router)
- TypeScript 5.9+
- Tailwind CSS + shadcn/ui
- React Query + Zustand
- React Hook Form + Zod

---

## SPRINT 1: Foundation & Setup (2 weeks)
**Goal:** Complete project setup with authentication and core layout

### Week 1: Project Setup & UI Foundation

#### 🎫 FE-001: Initialize Next.js Project
**Priority:** 🔴 Critical  
**Estimated Time:** 4 hours  
**Status:** 📋 To Do

**Description:**
Set up Next.js 14+ project with TypeScript and all necessary dependencies.

**Requirements:**
1. Initialize Next.js with App Router
2. Configure TypeScript strict mode
3. Install and configure Tailwind CSS
4. Set up shadcn/ui
5. Configure ESLint + Prettier
6. Set up folder structure

**Acceptance Criteria:**
- [ ] Next.js project initialized
- [ ] TypeScript configured with strict mode
- [ ] Tailwind CSS working
- [ ] shadcn/ui initialized
- [ ] ESLint + Prettier configured
- [ ] Folder structure matches architecture doc
- [ ] Dev server runs without errors

**Commands:**
```bash
npx create-next-app@latest frontend --typescript --tailwind --app
cd frontend
npx shadcn-ui@latest init
npm install @tanstack/react-query zustand react-hook-form zod
npm install -D @types/node
```

---

#### 🎫 FE-002: Configure API Client & React Query
**Priority:** 🔴 Critical  
**Estimated Time:** 6 hours  
**Status:** 📋 To Do

**Description:**
Set up API client with session-based auth and React Query provider.

**Requirements:**
1. Create API client class
2. Add tenant ID header injection
3. Configure React Query provider
4. Add error handling
5. Add request/response interceptors
6. Set up environment variables

**Acceptance Criteria:**
- [ ] API client created with fetch wrapper
- [ ] Tenant ID auto-injected in headers
- [ ] Cookies included in requests (credentials: 'include')
- [ ] React Query provider configured
- [ ] Error handling implemented
- [ ] Environment variables configured

**Files to Create:**
```
src/lib/api/client.ts
src/lib/api/endpoints.ts
src/app/providers.tsx
.env.local.example
```

---

#### 🎫 FE-003: Install shadcn/ui Components
**Priority:** 🟡 High  
**Estimated Time:** 3 hours  
**Status:** 📋 To Do

**Description:**
Install all shadcn/ui components needed for the application.

**Requirements:**
Install these components:
- button, input, label, card
- dialog, dropdown-menu, select
- table, badge, avatar
- form, toast, skeleton
- tabs, accordion, separator

**Acceptance Criteria:**
- [ ] All components installed
- [ ] Components work in isolation
- [ ] Dark mode configured
- [ ] Component examples created

**Commands:**
```bash
npx shadcn-ui@latest add button input label card
npx shadcn-ui@latest add dialog dropdown-menu select
npx shadcn-ui@latest add table badge avatar
npx shadcn-ui@latest add form toast skeleton
npx shadcn-ui@latest add tabs accordion separator
```

---

#### 🎫 FE-004: Create Root Layout & Theme Provider
**Priority:** 🟡 High  
**Estimated Time:** 5 hours  
**Status:** 📋 To Do

**Description:**
Build root layout with theme provider and global styles.

**Requirements:**
1. Create root layout
2. Add theme provider (dark/light mode)
3. Configure global CSS
4. Add fonts (Inter, Geist)
5. Add metadata
6. Add favicon

**Acceptance Criteria:**
- [ ] Root layout created
- [ ] Theme switching works
- [ ] Dark mode persists
- [ ] Fonts loaded correctly
- [ ] Metadata configured
- [ ] Favicon added

**Files to Create:**
```
src/app/layout.tsx
src/app/globals.css
src/components/theme-provider.tsx
src/lib/stores/ui-store.ts
```

---

### Week 2: Authentication & Dashboard Layout

#### 🎫 FE-005: Build Authentication Pages
**Priority:** 🔴 Critical  
**Estimated Time:** 10 hours  
**Status:** 📋 To Do

**Description:**
Create login and registration pages with form validation.

**Requirements:**
1. Create login page
2. Create registration page
3. Add form validation with Zod
4. Integrate with backend API
5. Handle loading states
6. Handle error states
7. Add success redirect

**Acceptance Criteria:**
- [ ] Login page created
- [ ] Registration page created
- [ ] Form validation works (Zod schemas)
- [ ] API integration successful
- [ ] Loading spinners shown
- [ ] Errors displayed clearly
- [ ] Redirect to dashboard after login
- [ ] Session cookie saved

**Files to Create:**
```
src/app/(auth)/login/page.tsx
src/app/(auth)/register/page.tsx
src/app/(auth)/layout.tsx
src/lib/validations/auth.schemas.ts
src/lib/hooks/use-auth.ts
```

**Example Schema:**
```typescript
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ characters'),
});
```

---

#### 🎫 FE-006: Build Dashboard Layout
**Priority:** 🔴 Critical  
**Estimated Time:** 12 hours  
**Status:** 📋 To Do

**Description:**
Create dashboard layout with sidebar, navbar, and breadcrumbs.

**Requirements:**
1. Create sidebar with navigation
2. Create navbar with user menu
3. Add breadcrumb navigation
4. Make sidebar collapsible
5. Add mobile menu
6. Implement route protection
7. Show user info in navbar

**Acceptance Criteria:**
- [ ] Sidebar navigation works
- [ ] Navbar shows user info
- [ ] Breadcrumbs auto-generate from route
- [ ] Sidebar collapses/expands
- [ ] Mobile menu works
- [ ] Protected routes redirect to login
- [ ] Active route highlighted

**Files to Create:**
```
src/app/(dashboard)/layout.tsx
src/components/layout/sidebar.tsx
src/components/layout/navbar.tsx
src/components/layout/breadcrumb.tsx
src/config/navigation.ts
```

---

#### 🎫 FE-007: Create Dashboard Home Page
**Priority:** 🟡 High  
**Estimated Time:** 8 hours  
**Status:** 📋 To Do

**Description:**
Build dashboard home with stats cards and recent activity.

**Requirements:**
1. Create stats cards (leads, deals, revenue)
2. Add recent activity feed
3. Add quick actions
4. Make responsive
5. Add loading skeletons
6. Fetch data from API

**Acceptance Criteria:**
- [ ] Stats cards display correctly
- [ ] Recent activity shown
- [ ] Quick actions work
- [ ] Responsive on mobile
- [ ] Loading skeletons shown
- [ ] Data fetched from backend

**Files to Create:**
```
src/app/(dashboard)/dashboard/page.tsx
src/components/dashboard/stat-card.tsx
src/components/dashboard/recent-activity.tsx
```

---

## SPRINT 2: CRM Module (2 weeks)
**Goal:** Complete CRM module with leads and deals

#### 🎫 FE-008: Build Leads List Page
**Priority:** 🔴 Critical  
**Estimated Time:** 10 hours  
**Status:** 📋 To Do

**Description:**
Create leads list with table, filters, and pagination.

**Requirements:**
1. Create leads table
2. Add status filter
3. Add search
4. Add pagination
5. Add sorting
6. Add create button
7. Link to detail page

**Acceptance Criteria:**
- [ ] Table shows all leads
- [ ] Filters work correctly
- [ ] Search filters results
- [ ] Pagination works
- [ ] Column sorting works
- [ ] Create button opens modal/page
- [ ] Click row navigates to detail

**Files to Create:**
```
src/app/(dashboard)/crm/leads/page.tsx
src/components/crm/leads-table.tsx
src/components/crm/lead-filters.tsx
src/lib/hooks/use-leads.ts
```

---

#### 🎫 FE-009: Build Lead Creation Form
**Priority:** 🔴 Critical  
**Estimated Time:** 8 hours  
**Status:** 📋 To Do

**Description:**
Create form for adding new leads with validation.

**Requirements:**
1. Create lead form modal/page
2. Add all required fields
3. Validate with Zod
4. Handle submission
5. Show success message
6. Refetch leads list
7. Optimistic update

**Acceptance Criteria:**
- [ ] Form opens from leads list
- [ ] All fields present
- [ ] Validation works
- [ ] API call successful
- [ ] Success toast shown
- [ ] List auto-refreshes
- [ ] Optimistic update works

**Files to Create:**
```
src/components/crm/create-lead-form.tsx
src/lib/validations/lead.schemas.ts
```

---

#### 🎫 FE-010: Build Lead Detail Page
**Priority:** 🟡 High  
**Estimated Time:** 10 hours  
**Status:** 📋 To Do

**Description:**
Create lead detail page with edit capability and activity timeline.

**Requirements:**
1. Fetch lead by ID
2. Display all lead info
3. Add edit button
4. Show activity timeline
5. Add notes section
6. Add status update
7. Link to deals

**Acceptance Criteria:**
- [ ] Lead details displayed
- [ ] Edit form works
- [ ] Activity timeline shown
- [ ] Notes can be added
- [ ] Status updated via dropdown
- [ ] Related deals shown

---

#### 🎫 FE-011: Build Deal Pipeline View
**Priority:** 🟡 High  
**Estimated Time:** 12 hours  
**Status:** 📋 To Do

**Description:**
Create Kanban-style deal pipeline with drag-and-drop.

**Requirements:**
1. Create pipeline columns (stages)
2. Show deals as cards
3. Add drag-and-drop
4. Update stage on drop
5. Add create deal modal
6. Show deal value
7. Add filters

**Acceptance Criteria:**
- [ ] Pipeline columns shown
- [ ] Deal cards draggable
- [ ] Stage updates on drop
- [ ] Optimistic update works
- [ ] Create modal works
- [ ] Total value per stage shown
- [ ] Filters work

**Files to Create:**
```
src/app/(dashboard)/crm/deals/page.tsx
src/components/crm/deal-pipeline.tsx
src/components/crm/deal-card.tsx
src/lib/hooks/use-deals.ts
```

---

## SPRINT 3: Inventory Module (2 weeks)
**Goal:** Complete inventory management

#### 🎫 FE-012: Build Products List
**Priority:** 🟡 High  
**Estimated Time:** 8 hours  
**Status:** 📋 To Do

**Description:**
Create products list with grid/table view toggle.

**Requirements:**
1. Build products table
2. Add grid view option
3. Add filters (category, price)
4. Add search
5. Show stock levels
6. Add create button
7. Color-code low stock

**Acceptance Criteria:**
- [ ] Table and grid views work
- [ ] Filters functional
- [ ] Search works
- [ ] Stock levels shown
- [ ] Low stock highlighted
- [ ] Create button works

---

#### 🎫 FE-013: Build Product Form
**Priority:** 🟡 High  
**Estimated Time:** 10 hours  
**Status:** 📋 To Do

**Description:**
Create product creation/edit form with image upload.

**Requirements:**
1. Build product form
2. Add image upload
3. Add pricing fields
4. Add inventory fields
5. Validate with Zod
6. Handle submission
7. Preview image

**Acceptance Criteria:**
- [ ] All fields present
- [ ] Image upload works
- [ ] Image preview shown
- [ ] Validation works
- [ ] API submission successful
- [ ] Form resets after submit

---

#### 🎫 FE-014: Build Inventory Dashboard
**Priority:** 🟢 Medium  
**Estimated Time:** 8 hours  
**Status:** 📋 To Do

**Description:**
Create inventory overview with stock levels and movements.

**Requirements:**
1. Show total products
2. Show low stock alerts
3. Show recent movements
4. Add stock level chart
5. Add warehouse breakdown
6. Add quick actions

**Acceptance Criteria:**
- [ ] Stats cards shown
- [ ] Low stock alerts visible
- [ ] Recent movements listed
- [ ] Chart displays correctly
- [ ] Warehouse breakdown shown

---

## SPRINT 4: Settings & Polish (2 weeks)
**Goal:** User management, settings, and polish

#### 🎫 FE-015: Build User Management
**Priority:** 🟡 High  
**Estimated Time:** 10 hours  
**Status:** 📋 To Do

**Description:**
Create user list and management interface.

**Requirements:**
1. List all users
2. Add create user form
3. Add edit user
4. Add role assignment
5. Add user deactivation
6. Show user activity

---

#### 🎫 FE-016: Build Role Management
**Priority:** 🟡 High  
**Estimated Time:** 10 hours  
**Status:** 📋 To Do

**Description:**
Create interface for managing roles and permissions.

**Requirements:**
1. List all roles
2. Create/edit roles
3. Permission checkboxes
4. Assign users to roles
5. Show role usage

---

#### 🎫 FE-017: Build Settings Pages
**Priority:** 🟢 Medium  
**Estimated Time:** 8 hours  
**Status:** 📋 To Do

**Description:**
Create settings pages for profile and account.

**Requirements:**
1. Profile settings
2. Password change
3. Notification preferences
4. Theme preferences
5. Account settings

---

#### 🎫 FE-018: Add Data Tables Package
**Priority:** 🟡 High  
**Estimated Time:** 6 hours  
**Status:** 📋 To Do

**Description:**
Create reusable data table component with all features.

**Requirements:**
1. Column definitions
2. Sorting
3. Filtering
4. Pagination
5. Row selection
6. Bulk actions
7. Export functionality

---

#### 🎫 FE-019: Performance Optimization
**Priority:** 🟢 Medium  
**Estimated Time:** 8 hours  
**Status:** 📋 To Do

**Description:**
Optimize app performance and bundle size.

**Requirements:**
1. Add dynamic imports
2. Optimize images
3. Add loading skeletons
4. Configure React Query caching
5. Add service worker (optional)
6. Measure Core Web Vitals

---

#### 🎫 FE-020: Testing & Documentation
**Priority:** 🟢 Medium  
**Estimated Time:** 10 hours  
**Status:** 📋 To Do

**Description:**
Add tests and user documentation.

**Requirements:**
1. Unit tests for hooks
2. Component tests
3. E2E tests for critical flows
4. User guide documentation
5. Storybook (optional)

---

## Sprint Goals Summary

### Sprint 1: Foundation (Current)
**Duration:** 2 weeks  
**Deliverables:**
- ✅ Next.js project setup
- ✅ API client + React Query
- ✅ UI components (shadcn/ui)
- ✅ Authentication pages
- ✅ Dashboard layout
- ✅ Dashboard home

### Sprint 2: CRM Module
**Duration:** 2 weeks  
**Deliverables:**
- ✅ Leads list + filters
- ✅ Lead creation form
- ✅ Lead detail page
- ✅ Deal pipeline (Kanban)

### Sprint 3: Inventory
**Duration:** 2 weeks  
**Deliverables:**
- ✅ Products list
- ✅ Product form
- ✅ Inventory dashboard

### Sprint 4: Polish
**Duration:** 2 weeks  
**Deliverables:**
- ✅ User management
- ✅ Role management
- ✅ Settings pages
- ✅ Performance optimization
- ✅ Testing

---

## Tech Debt & Future Enhancements

### Tech Debt
- [ ] Add comprehensive error boundaries
- [ ] Improve loading states
- [ ] Add retry logic for failed requests
- [ ] Implement offline mode
- [ ] Add request cancellation

### Future Features
- [ ] Real-time notifications (WebSocket)
- [ ] Advanced analytics dashboard
- [ ] Export to Excel/PDF
- [ ] Bulk import
- [ ] Mobile app (React Native)
- [ ] Email templates
- [ ] Custom reports builder

---

## Definition of Done (Frontend)

For each ticket to be marked DONE:
- [ ] Code written and tested in browser
- [ ] Responsive on mobile/tablet/desktop
- [ ] Dark mode works correctly
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Accessibility checked (keyboard nav, screen reader)
- [ ] Committed with descriptive message
- [ ] Pushed to repository

---

## Component Library Standards

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Utils: `kebab-case.ts`
- Types: `kebab-case.ts`

### Component Structure
```tsx
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types
interface Props {
  title: string;
  onSave: () => void;
}

// 3. Component
export function MyComponent({ title, onSave }: Props) {
  // 3a. Hooks
  const [count, setCount] = useState(0);

  // 3b. Handlers
  const handleClick = () => {
    setCount(count + 1);
    onSave();
  };

  // 3c. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Count: {count}</Button>
    </div>
  );
}
```

---

**Created by:** Clawdy (Frontend Lead)  
**Date:** February 5, 2026  
**Status:** Awaiting BRD for alignment
