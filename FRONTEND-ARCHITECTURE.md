# NEXUS Frontend - Architecture Documentation

**Version:** 1.0  
**Last Updated:** February 5, 2026  
**Developer:** Clawdy (Ahmed's Assistant)  
**Project:** NEXUS Multi-Tenant SaaS Platform

---

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Architecture Patterns](#architecture-patterns)
5. [Multi-Tenancy Implementation](#multi-tenancy-implementation)
6. [Authentication Flow](#authentication-flow)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Component Library](#component-library)
10. [Styling Strategy](#styling-strategy)
11. [Performance Optimization](#performance-optimization)

---

## Overview

NEXUS Frontend is a modern, multi-tenant SaaS application built with Next.js 14+ and TypeScript. It provides:

- **Multi-tenant access** via subdomain routing
- **Session-based authentication** synced with backend
- **Responsive design** for desktop, tablet, mobile
- **Real-time data** with React Query
- **Type-safe API** integration
- **Accessible UI** (WCAG 2.1 AA compliant)

### Key Features
✅ Subdomain-based tenant isolation  
✅ Role-based access control (RBAC)  
✅ CRM module (leads, deals, pipeline)  
✅ Inventory management  
✅ Analytics dashboard  
✅ User/role management  
✅ Dark/light mode  

---

## Tech Stack

### Core
- **Framework:** Next.js 14.2+ (App Router)
- **Language:** TypeScript 5.9+
- **Runtime:** Node.js 22+

### UI & Styling
- **Styling:** Tailwind CSS 3.4+
- **Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod validation

### State & Data
- **Server State:** TanStack Query (React Query) v5
- **Client State:** Zustand
- **Form State:** React Hook Form
- **Validation:** Zod schemas

### Development
- **Linting:** ESLint + TypeScript ESLint
- **Formatting:** Prettier
- **Git Hooks:** Husky + lint-staged
- **Testing:** Vitest + Testing Library

### Deployment
- **Hosting:** Vercel (recommended) or Docker
- **CDN:** Vercel Edge Network
- **Analytics:** Vercel Analytics

---

## Project Structure

```
apps/frontend/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (auth)/                    # Auth routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/               # Protected routes group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── crm/
│   │   │   │   ├── leads/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   └── deals/
│   │   │   │       └── page.tsx
│   │   │   ├── inventory/
│   │   │   │   ├── products/
│   │   │   │   └── warehouses/
│   │   │   ├── settings/
│   │   │   │   ├── profile/
│   │   │   │   ├── team/
│   │   │   │   └── roles/
│   │   │   └── layout.tsx             # Dashboard layout with sidebar
│   │   ├── layout.tsx                 # Root layout
│   │   └── providers.tsx              # React Query, Theme providers
│   │
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   └── page-header.tsx
│   │   ├── crm/
│   │   │   ├── lead-card.tsx
│   │   │   ├── lead-form.tsx
│   │   │   ├── deal-pipeline.tsx
│   │   │   └── activity-timeline.tsx
│   │   ├── inventory/
│   │   │   ├── product-card.tsx
│   │   │   ├── stock-level.tsx
│   │   │   └── warehouse-selector.tsx
│   │   └── common/
│   │       ├── data-table.tsx
│   │       ├── empty-state.tsx
│   │       ├── loading-spinner.tsx
│   │       └── error-boundary.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts              # Fetch wrapper with auth
│   │   │   ├── endpoints.ts           # API endpoint definitions
│   │   │   └── types.ts               # API response types
│   │   ├── hooks/
│   │   │   ├── use-auth.ts            # Authentication hook
│   │   │   ├── use-tenant.ts          # Tenant context hook
│   │   │   ├── use-leads.ts           # Lead queries/mutations
│   │   │   └── use-products.ts        # Product queries/mutations
│   │   ├── stores/
│   │   │   ├── auth-store.ts          # Auth state (Zustand)
│   │   │   ├── tenant-store.ts        # Tenant state
│   │   │   └── ui-store.ts            # UI state (sidebar, theme)
│   │   ├── utils/
│   │   │   ├── cn.ts                  # Classname utility
│   │   │   ├── date.ts                # Date formatting
│   │   │   └── currency.ts            # Currency formatting
│   │   └── validations/
│   │       ├── auth.schemas.ts        # Auth form schemas (Zod)
│   │       ├── lead.schemas.ts        # Lead form schemas
│   │       └── product.schemas.ts     # Product form schemas
│   │
│   ├── types/
│   │   ├── api.ts                     # API types
│   │   ├── models.ts                  # Domain models
│   │   └── common.ts                  # Shared types
│   │
│   └── config/
│       ├── site.ts                    # Site metadata
│       ├── navigation.ts              # Navigation config
│       └── permissions.ts             # Permission definitions
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Architecture Patterns

### 1. Server Components First
Use React Server Components (RSC) by default for:
- ✅ Static pages (marketing, docs)
- ✅ Data fetching on server
- ✅ SEO-critical pages

Use Client Components when needed:
- ❌ Interactivity (forms, modals)
- ❌ Browser APIs (localStorage, cookies)
- ❌ State management

### 2. Parallel Route Groups
```
app/
├── (auth)/          # No dashboard layout
├── (dashboard)/     # With sidebar layout
└── (marketing)/     # Landing pages
```

### 3. Co-location Pattern
Keep related files together:
```
crm/leads/
├── page.tsx         # Main page
├── _components/     # Private components (not routable)
│   ├── lead-list.tsx
│   └── lead-filters.tsx
└── [id]/
    └── page.tsx     # Detail page
```

### 4. Container/Presentation Pattern
```tsx
// Container (handles logic)
function LeadListContainer() {
  const { data, isLoading } = useLeads();
  return <LeadList leads={data} loading={isLoading} />;
}

// Presentation (pure UI)
function LeadList({ leads, loading }: Props) {
  if (loading) return <Spinner />;
  return <div>{leads.map(...)}</div>;
}
```

---

## Multi-Tenancy Implementation

### Subdomain Detection

**Production URL Pattern:**
```
https://{tenant-subdomain}.nexus.app
```

**Development:**
```
http://localhost:3000
X-Tenant-ID: <uuid> (header fallback)
```

### Implementation

```typescript
// lib/tenant.ts
export function getTenantFromRequest(request: Request): string | null {
  // 1. Check header (dev mode)
  const headerTenant = request.headers.get('X-Tenant-ID');
  if (headerTenant) return headerTenant;

  // 2. Extract from subdomain
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0];
  
  // 3. Lookup tenant ID from subdomain
  return await fetchTenantIdBySubdomain(subdomain);
}

// middleware.ts
export function middleware(request: NextRequest) {
  const tenantId = getTenantFromRequest(request);
  
  if (!tenantId) {
    return NextResponse.redirect(new URL('/tenant-not-found', request.url));
  }

  // Add to response headers for client-side use
  const response = NextResponse.next();
  response.headers.set('X-Tenant-ID', tenantId);
  return response;
}
```

### Tenant Context

```typescript
// app/providers.tsx
'use client';

export function TenantProvider({ children, tenantId }: Props) {
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    // Fetch tenant details
    fetchTenant(tenantId).then(setTenant);
  }, [tenantId]);

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
}
```

---

## Authentication Flow

### Session-Based Auth

```typescript
// lib/hooks/use-auth.ts
export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const res = await api.post('/auth/me');
      return res.user;
    },
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      api.post('/auth/login', credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
}
```

### Protected Routes

```typescript
// app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }: Props) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading]);

  if (isLoading) return <LoadingScreen />;
  if (!user) return null;

  return (
    <div className="flex h-screen">
      <Sidebar user={user} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
```

---

## State Management

### Server State (React Query)
Use for data fetched from backend:
- User data
- Leads, deals, products
- Inventory, orders

```typescript
// lib/hooks/use-leads.ts
export function useLeads() {
  return useQuery({
    queryKey: ['leads'],
    queryFn: () => api.get('/crm/leads'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeadDto) =>
      api.post('/crm/leads', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}
```

### Client State (Zustand)
Use for UI state only:
- Sidebar collapsed/expanded
- Theme (dark/light)
- Active filters
- Modal open/closed

```typescript
// lib/stores/ui-store.ts
export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  theme: 'light',
  toggleSidebar: () => 
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setTheme: (theme) => set({ theme }),
}));
```

---

## API Integration

### API Client

```typescript
// lib/api/client.ts
class APIClient {
  private baseURL = process.env.NEXT_PUBLIC_API_URL;

  async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Important for cookies!
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-ID': getTenantId(), // From context
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(error.message, response.status);
    }

    return response.json();
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint);
  }

  post<T>(endpoint: string, data?: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ... patch, delete, etc.
}

export const api = new APIClient();
```

---

## Component Library

### shadcn/ui Setup

```bash
npx shadcn-ui@latest init

# Install components as needed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add table
```

### Custom Components

Build domain-specific components on top of shadcn/ui:

```tsx
// components/crm/lead-card.tsx
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function LeadCard({ lead }: { lead: Lead }) {
  return (
    <Card>
      <CardHeader>
        <h3>{lead.first_name} {lead.last_name}</h3>
        <Badge variant={getStatusVariant(lead.status)}>
          {lead.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p>{lead.email}</p>
        <p>{lead.phone}</p>
      </CardContent>
    </Card>
  );
}
```

---

## Styling Strategy

### Tailwind Configuration

```typescript
// tailwind.config.ts
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... more color tokens
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### Design Tokens

Use CSS variables for theming:

```css
/* app/globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    /* ... */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    /* ... */
  }
}
```

---

## Performance Optimization

### 1. Code Splitting
```tsx
// Dynamic imports for heavy components
const DealPipeline = dynamic(() => import('./deal-pipeline'), {
  loading: () => <Skeleton />,
});
```

### 2. Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={300}
  loading="lazy"
/>
```

### 3. React Query Caching
```typescript
// Aggressive caching for static data
queryClient.setQueryDefaults(['products'], {
  staleTime: 10 * 60 * 1000, // 10 minutes
  cacheTime: 15 * 60 * 1000, // 15 minutes
});
```

### 4. Optimistic Updates
```typescript
const mutation = useMutation({
  mutationFn: updateLead,
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['leads'] });

    // Snapshot previous value
    const previous = queryClient.getQueryData(['leads']);

    // Optimistically update
    queryClient.setQueryData(['leads'], (old) => {
      return old.map((lead) =>
        lead.id === newData.id ? newData : lead
      );
    });

    return { previous };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['leads'], context?.previous);
  },
});
```

---

## Development Guidelines

### TypeScript Strict Mode
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true
  }
}
```

### Form Validation
```typescript
// lib/validations/lead.schemas.ts
import { z } from 'zod';

export const createLeadSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email').optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateLeadDto = z.infer<typeof createLeadSchema>;
```

### Error Handling
```tsx
// components/common/error-boundary.tsx
export function ErrorBoundary({ children }: Props) {
  return (
    <ErrorBoundaryComponent
      fallback={({ error }) => (
        <div className="p-4 border border-red-500 rounded">
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
        </div>
      )}
    >
      {children}
    </ErrorBoundaryComponent>
  );
}
```

---

## Accessibility

### WCAG 2.1 AA Compliance
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast ratios
- ✅ Focus indicators
- ✅ ARIA labels

### Example
```tsx
<button
  aria-label="Close dialog"
  aria-pressed={isOpen}
  onClick={handleClose}
>
  <X className="h-4 w-4" />
</button>
```

---

**Documentation by:** Clawdy  
**Last Updated:** February 5, 2026  
**Status:** Awaiting BRD for final alignment
