# NEXUS Frontend - Development Plan

**Repository:** nexus-frontend  
**Developer:** Clawdy (Solo Frontend Developer)  
**Stack:** Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui  
**Sprint Duration:** 2 weeks per sprint  
**Total Timeline:** 8 weeks (4 sprints)

---

## Overview

Building the frontend for NEXUS - a multi-tenant CRM & ERP SaaS platform with AI features.

**Key Features:**
- Multi-tenant authentication (subdomain-based)
- CRM (Leads, Deals, Pipeline)
- Inventory Management
- Sales & Purchase Orders
- AI-powered features (Chatbot, Demand Forecasting, Invoice OCR)

---

## SPRINT 1: Foundation & Auth (2 weeks)

### ✅ TICKET-FE-001: Initialize Next.js Project
**Status:** DONE  
**Time:** 4 hours

- [x] Next.js 14 with App Router
- [x] TypeScript strict mode
- [x] Tailwind CSS configured
- [x] ESLint + Prettier

---

### 🎫 TICKET-FE-002: Configure API Client & React Query
**Priority:** 🔴 Critical  
**Time:** 6 hours

**Requirements:**
1. Create API client with tenant ID injection
2. Configure React Query provider
3. Add error handling for 403 (tenant mismatch)
4. Setup optimistic updates

**Files:**
```
src/lib/api/client.ts
src/lib/api/endpoints.ts
src/app/providers.tsx
.env.local.example
```

**API Client Example:**
```typescript
class APIClient {
  private baseURL = process.env.NEXT_PUBLIC_API_URL;

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Session cookies
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-ID': getTenantId(),
        ...options?.headers,
      },
    });

    if (!response.ok) throw new APIError(response);
    return response.json();
  }
}
```

**Acceptance Criteria:**
- [ ] API client auto-injects tenant ID
- [ ] Session cookies included
- [ ] React Query configured with cache
- [ ] Error boundary handles API errors

---

### 🎫 TICKET-FE-003: Install shadcn/ui Components
**Priority:** 🟡 High  
**Time:** 3 hours

**Components to Install:**
```bash
npx shadcn-ui@latest add button input label card
npx shadcn-ui@latest add dialog dropdown-menu select
npx shadcn-ui@latest add table badge avatar
npx shadcn-ui@latest add form toast skeleton
npx shadcn-ui@latest add tabs accordion separator
npx shadcn-ui@latest add combobox command sheet
```

**Acceptance Criteria:**
- [ ] All components installed
- [ ] Dark mode configured
- [ ] Component examples tested

---

### 🎫 TICKET-FE-004: Build Authentication Pages
**Priority:** 🔴 Critical  
**Time:** 10 hours

**Pages:**
- Login (`/login`)
- Register (`/register`)

**Features:**
- Zod validation
- Loading states
- Error messages
- Redirect to dashboard after login

**Acceptance Criteria:**
- [ ] Login form works
- [ ] Registration form works
- [ ] Validation errors display
- [ ] Session cookie saved
- [ ] Redirect to `/dashboard`

---

### 🎫 TICKET-FE-005: Build Dashboard Layout
**Priority:** 🔴 Critical  
**Time:** 12 hours

**Features:**
- Collapsible sidebar
- Top navbar with user menu
- Breadcrumb navigation
- Mobile menu (hamburger)
- Route protection

**Responsive:**
- Mobile: Sidebar hidden (overlay on demand)
- Desktop: Sidebar always visible

**Acceptance Criteria:**
- [ ] Sidebar navigation works
- [ ] Mobile menu works
- [ ] Protected routes redirect to login
- [ ] User info shown in navbar

---

### 🎫 TICKET-FE-006: Dashboard Home Page
**Priority:** 🟡 High  
**Time:** 8 hours

**Stats Cards:**
- Total Leads (this month)
- Open Deals (pipeline value)
- Low Stock Alerts
- Recent Orders

**Acceptance Criteria:**
- [ ] Stats fetch from API
- [ ] Loading skeletons shown
- [ ] Responsive on mobile

---

## SPRINT 2: CRM Module (2 weeks)

### 🎫 TICKET-FE-007: Leads List Page
**Priority:** 🔴 Critical  
**Time:** 12 hours

**Features:**
- Server-side pagination
- Search (first name, last name, email)
- Filters (status, source, AI score)
- Bulk actions (delete, export)

**Responsive:**
- Desktop: Full table
- Mobile: Card list

**Acceptance Criteria:**
- [ ] Table shows all leads
- [ ] Pagination works
- [ ] Filters work
- [ ] Search works
- [ ] Mobile card view works

---

### 🎫 TICKET-FE-008: Lead Creation Form
**Priority:** 🔴 Critical  
**Time:** 8 hours

**Fields:**
- First Name, Last Name (required)
- Email, Phone
- Source (dropdown)
- Notes (textarea)

**Acceptance Criteria:**
- [ ] Form validates with Zod
- [ ] API call successful
- [ ] List auto-refreshes
- [ ] Toast notification shown

---

### 🎫 TICKET-FE-009: Lead Detail Page
**Priority:** 🟡 High  
**Time:** 10 hours

**Sections:**
- Contact info (editable)
- AI Score badge (0-100, color-coded)
- Activity timeline
- "Convert to Deal" button

**Acceptance Criteria:**
- [ ] All data displayed
- [ ] Inline editing works
- [ ] Timeline shows activity
- [ ] Convert to deal works

---

### 🎫 TICKET-FE-010: Deal Pipeline (Kanban)
**Priority:** 🔴 Critical  
**Time:** 14 hours

**Features:**
- Drag-and-drop between stages (@dnd-kit/core)
- Show total value per stage
- Click card → detail modal

**Responsive:**
- Desktop: Horizontal Kanban
- Mobile: Accordion view

**Acceptance Criteria:**
- [ ] Drag-and-drop works
- [ ] API called on drop
- [ ] Optimistic update
- [ ] Mobile accordion works

---

## SPRINT 3: Inventory & Sales (2 weeks)

### 🎫 TICKET-FE-011: Products List
**Priority:** 🔴 Critical  
**Time:** 10 hours

**Features:**
- Grid/Table view toggle
- Stock level shown (color-coded)
- Filter by category
- Search by SKU or name

**Acceptance Criteria:**
- [ ] Grid and table views work
- [ ] Low stock highlighted
- [ ] Filters work
- [ ] Search works

---

### 🎫 TICKET-FE-012: Product Form
**Priority:** 🟡 High  
**Time:** 10 hours

**Fields:**
- SKU, Name, Description
- Cost Price, Selling Price
- Reorder Point, Category
- Image upload (S3)

**Acceptance Criteria:**
- [ ] All fields validate
- [ ] Image upload works
- [ ] Preview shown
- [ ] Form submits correctly

---

### 🎫 TICKET-FE-013: Sales Order Form (Multi-Step)
**Priority:** 🔴 Critical  
**Time:** 16 hours

**Steps:**
1. Select Customer (combobox with async search)
2. Add Products (cart with quantities)
3. Review & Submit

**State:** Use Zustand for cart

**Actions:**
- "Save as Draft"
- "Confirm Order"

**Acceptance Criteria:**
- [ ] Multi-step navigation works
- [ ] Customer search works
- [ ] Product cart works
- [ ] Total calculates correctly
- [ ] Draft saves
- [ ] Confirm triggers workflow

---

### 🎫 TICKET-FE-014: Purchase Order Form
**Priority:** 🟡 High  
**Time:** 12 hours

**Features:**
- Select Vendor
- Add Products
- "Send PO" button
- "Receive Goods" button

**Acceptance Criteria:**
- [ ] Vendor selection works
- [ ] Product selection works
- [ ] PO created successfully
- [ ] Receive goods triggers workflow

---

## SPRINT 4: AI Features & Polish (2 weeks)

### 🎫 TICKET-FE-015: "Ask Nexus" AI Chatbot
**Priority:** 🟡 High  
**Time:** 14 hours

**Features:**
- Floating button (bottom-right)
- Chat panel (Sheet component)
- Message history
- Context-aware (knows current page)

**Responsive:**
- Mobile: Full-screen
- Desktop: Side panel

**Acceptance Criteria:**
- [ ] Chatbot opens
- [ ] Messages send/receive
- [ ] Typing indicator works
- [ ] Context sent to API

---

### 🎫 TICKET-FE-016: Invoice OCR Upload
**Priority:** 🟢 Medium  
**Time:** 10 hours

**Features:**
- "Upload Invoice" button
- File upload (PDF/image)
- Call `/api/v1/ai/parse-invoice`
- Pre-fill PO form with extracted data

**Acceptance Criteria:**
- [ ] File upload works
- [ ] OCR extracts data
- [ ] Form pre-fills
- [ ] User can edit before saving

---

### 🎫 TICKET-FE-017: Demand Forecasting Chart
**Priority:** 🟢 Medium  
**Time:** 8 hours

**Features:**
- Product detail page shows forecast
- Call `/api/v1/ai/predict-demand`
- Recharts visualization

**Acceptance Criteria:**
- [ ] Chart displays forecast
- [ ] Confidence shown
- [ ] Responsive on mobile

---

### 🎫 TICKET-FE-018: Upsell Recommendations
**Priority:** 🟢 Medium  
**Time:** 6 hours

**Features:**
- During sales order creation
- Show "Recommended Products"
- Call `/api/v1/ai/recommend-upsell`

**Acceptance Criteria:**
- [ ] Recommendations shown
- [ ] Clickable to add to cart
- [ ] Updates dynamically

---

### 🎫 TICKET-FE-019: PDF Invoice Download
**Priority:** 🟡 High  
**Time:** 4 hours

**Features:**
- "Download PDF" button on confirmed orders
- Call `GET /api/v1/sales/orders/:id/pdf`
- Trigger browser download

**Acceptance Criteria:**
- [ ] PDF downloads correctly
- [ ] Filename is meaningful

---

### 🎫 TICKET-FE-020: Performance Optimization
**Priority:** 🟢 Medium  
**Time:** 8 hours

**Tasks:**
- Dynamic imports for heavy components
- React Query caching optimization
- Next.js Image optimization
- Lazy load charts on mobile

**Acceptance Criteria:**
- [ ] Lighthouse score >90
- [ ] First contentful paint <2s
- [ ] Images lazy load

---

## Responsive Design Requirements

**All components must:**
- ✅ Work on mobile (320px min)
- ✅ Work on tablet (768px)
- ✅ Work on desktop (1024px+)
- ✅ Use Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- ✅ Touch-friendly buttons (44px min)
- ✅ Convert tables → cards on mobile
- ✅ Make dialogs full-screen on mobile

**Reference:** See `RESPONSIVE-DESIGN-GUIDE.md`

---

## Definition of Done

For each ticket:
- [ ] Code written and tested in browser
- [ ] Responsive on mobile/tablet/desktop
- [ ] Dark mode works
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Accessibility checked (keyboard nav)
- [ ] Committed with descriptive message
- [ ] Pushed to repository

---

## API Endpoints Reference

**Auth:**
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/me`

**CRM:**
- `GET /api/v1/crm/leads`
- `POST /api/v1/crm/leads`
- `GET /api/v1/crm/deals`
- `PATCH /api/v1/crm/deals/:id/move`

**Inventory:**
- `GET /api/v1/inventory/products`
- `POST /api/v1/inventory/products`
- `GET /api/v1/inventory/alerts`

**Sales:**
- `POST /api/v1/sales/orders`
- `POST /api/v1/sales/orders/:id/confirm`
- `GET /api/v1/sales/orders/:id/pdf`

**Purchasing:**
- `POST /api/v1/purchasing/orders`
- `POST /api/v1/purchasing/orders/:id/receive`

**AI:**
- `POST /api/v1/ai/predict-demand`
- `POST /api/v1/ai/parse-invoice`
- `POST /api/v1/ai/recommend-upsell`
- `POST /api/v1/ai/chat`

---

**Developer:** Clawdy  
**Last Updated:** February 5, 2026  
**Status:** Ready for development
