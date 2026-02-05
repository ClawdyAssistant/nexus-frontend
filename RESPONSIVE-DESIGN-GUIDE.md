# NEXUS Frontend - Responsive Design Guidelines

**Version:** 1.0  
**Target Devices:** Desktop (1920px+), Tablet (768px-1919px), Mobile (320px-767px)  
**Framework:** Next.js 14 + Tailwind CSS  
**Approach:** Mobile-first responsive design

---

## 1. Core Principles

### Mobile-First Approach
Start with mobile layout, then enhance for larger screens:

```tsx
// ✅ Correct: Mobile-first
<div className="flex flex-col md:flex-row gap-4">
  {/* Stacks vertically on mobile, horizontal on tablet+ */}
</div>

// ❌ Wrong: Desktop-first
<div className="flex flex-row md:flex-col gap-4">
```

### Tailwind Breakpoints
```typescript
// tailwind.config.ts
theme: {
  screens: {
    'sm': '640px',   // Mobile landscape
    'md': '768px',   // Tablet
    'lg': '1024px',  // Desktop
    'xl': '1280px',  // Large desktop
    '2xl': '1536px', // Extra large
  }
}
```

---

## 2. Layout Patterns

### Dashboard Layout

**Mobile (<768px):**
- Sidebar hidden by default (hamburger menu)
- Full-width content
- Bottom navigation (optional)

**Tablet & Desktop (≥768px):**
- Sidebar visible
- Content area responsive

```tsx
// components/layout/dashboard-layout.tsx
export function DashboardLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile: Overlay sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 md:hidden">
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop: Fixed sidebar */}
      <aside className="hidden md:flex md:w-64 border-r">
        <Sidebar />
      </aside>

      {/* Content area */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header with hamburger */}
        <header className="md:hidden sticky top-0 bg-background border-b p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
```

---

## 3. Component Responsive Patterns

### Data Tables

**Mobile Strategy:** Card view instead of table

```tsx
// components/common/responsive-table.tsx
export function ResponsiveTable({ data, columns }: Props) {
  return (
    <>
      {/* Desktop: Full table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            {columns.map(col => <TableHead key={col.id}>{col.label}</TableHead>)}
          </TableHeader>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                {columns.map(col => <TableCell>{row[col.id]}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: Card list */}
      <div className="md:hidden space-y-4">
        {data.map(row => (
          <Card key={row.id}>
            <CardHeader>
              <CardTitle className="text-base">{row.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {columns.map(col => (
                <div key={col.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{col.label}:</span>
                  <span className="font-medium">{row[col.id]}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
```

### Forms

**Mobile:** Stack fields vertically  
**Desktop:** Multi-column layout

```tsx
<form className="space-y-4">
  {/* Two columns on desktop, stack on mobile */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Label>First Name</Label>
      <Input {...register('first_name')} />
    </div>
    <div>
      <Label>Last Name</Label>
      <Input {...register('last_name')} />
    </div>
  </div>

  {/* Full width field */}
  <div>
    <Label>Email</Label>
    <Input type="email" {...register('email')} className="w-full" />
  </div>

  {/* Buttons: Stack on mobile, inline on desktop */}
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
    <Button type="submit" className="w-full sm:w-auto">Save</Button>
    <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
  </div>
</form>
```

### Modals & Dialogs

**Mobile:** Full-screen  
**Desktop:** Centered dialog

```tsx
<Dialog>
  <DialogContent className="
    w-full h-full sm:h-auto 
    sm:max-w-md md:max-w-lg lg:max-w-2xl
    p-4 sm:p-6
  ">
    <DialogHeader>
      <DialogTitle className="text-lg sm:text-xl">Create Product</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

---

## 4. Navigation Patterns

### Top Navigation (Navbar)

```tsx
<nav className="border-b">
  <div className="container mx-auto px-4 h-16 flex items-center justify-between">
    {/* Logo */}
    <Logo className="h-8" />

    {/* Desktop menu */}
    <div className="hidden md:flex items-center gap-6">
      <NavLink href="/dashboard">Dashboard</NavLink>
      <NavLink href="/crm">CRM</NavLink>
      <NavLink href="/inventory">Inventory</NavLink>
      <UserMenu />
    </div>

    {/* Mobile menu button */}
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col gap-4 mt-8">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/crm">CRM</NavLink>
          <NavLink href="/inventory">Inventory</NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  </div>
</nav>
```

### Sidebar Navigation

```tsx
<aside className="
  fixed md:static
  inset-y-0 left-0
  w-64
  transform -translate-x-full md:translate-x-0
  transition-transform
  bg-background border-r
  z-40
">
  {/* Sidebar content */}
</aside>
```

---

## 5. Typography & Spacing

### Responsive Text Sizes

```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
  Dashboard
</h1>

<p className="text-sm sm:text-base md:text-lg text-muted-foreground">
  Welcome to your dashboard
</p>
```

### Responsive Padding/Margin

```tsx
{/* Tighter spacing on mobile */}
<div className="p-4 sm:p-6 md:p-8 lg:p-10">
  <div className="space-y-4 sm:space-y-6 md:space-y-8">
    {/* Content */}
  </div>
</div>
```

---

## 6. Grid Layouts

### Product Grid

```tsx
<div className="
  grid 
  grid-cols-1          /* 1 column on mobile */
  sm:grid-cols-2       /* 2 columns on small screens */
  md:grid-cols-3       /* 3 columns on tablets */
  lg:grid-cols-4       /* 4 columns on desktop */
  xl:grid-cols-5       /* 5 columns on large screens */
  gap-4 sm:gap-6
">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

### Dashboard Stats

```tsx
<div className="
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-4 
  gap-4
">
  <StatCard title="Total Leads" value={245} />
  <StatCard title="Open Deals" value={18} />
  <StatCard title="Revenue" value="$45,200" />
  <StatCard title="Low Stock" value={7} />
</div>
```

---

## 7. Touch-Friendly Design (Mobile)

### Minimum Touch Targets

```tsx
{/* Buttons: Minimum 44px height on mobile */}
<Button className="h-11 sm:h-10">
  Click Me
</Button>

{/* Icon buttons */}
<Button 
  variant="ghost" 
  size="icon"
  className="h-11 w-11 sm:h-10 sm:w-10"
>
  <Trash className="h-5 w-5" />
</Button>
```

### Dropdowns & Selects

```tsx
{/* Use native select on mobile for better UX */}
<Select>
  <SelectTrigger className="h-11 sm:h-10">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {/* Options */}
  </SelectContent>
</Select>
```

---

## 8. Images & Media

### Responsive Images

```tsx
import Image from 'next/image';

<div className="relative aspect-video w-full">
  <Image
    src="/product.jpg"
    alt="Product"
    fill
    className="object-cover rounded-lg"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

### Product Images

```tsx
<div className="
  relative 
  aspect-square 
  w-full 
  max-w-xs mx-auto
  sm:max-w-sm 
  md:max-w-md
">
  <Image src={product.image} alt={product.name} fill />
</div>
```

---

## 9. Deal Pipeline (Kanban)

### Responsive Kanban Board

```tsx
export function DealPipeline({ stages, deals }: Props) {
  return (
    <>
      {/* Desktop: Horizontal scroll */}
      <div className="hidden md:flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <StageColumn stage={stage} deals={deals.filter(...)} />
          </div>
        ))}
      </div>

      {/* Mobile: Accordion view */}
      <div className="md:hidden">
        <Accordion type="single" collapsible>
          {stages.map(stage => (
            <AccordionItem key={stage.id} value={stage.id}>
              <AccordionTrigger className="text-base font-semibold">
                {stage.name} ({deals.filter(...).length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {deals.filter(...).map(deal => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
```

---

## 10. "Ask Nexus" Chatbot

### Responsive Chatbot Widget

```tsx
export function AskNexusChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile: Full screen */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="
          h-full w-full sm:h-[600px] sm:max-w-md
          p-0
        ">
          <div className="flex flex-col h-full">
            <DialogHeader className="p-4 border-b">
              <DialogTitle>Ask Nexus</DialogTitle>
            </DialogHeader>
            <ChatMessages className="flex-1 overflow-auto p-4" />
            <ChatInput className="p-4 border-t" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating button */}
      <Button
        onClick={() => setOpen(true)}
        className="
          fixed 
          bottom-4 right-4
          sm:bottom-6 sm:right-6
          h-14 w-14
          rounded-full
          shadow-lg
        "
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
}
```

---

## 11. Sales Order Form (Multi-Step)

```tsx
export function CreateSalesOrder() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Progress indicator - horizontal on desktop, compact on mobile */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          <Step number={1} active={step === 1} label="Customer" />
          <Separator className="flex-1 mx-2" />
          <Step number={2} active={step === 2} label="Products" />
          <Separator className="flex-1 mx-2" />
          <Step number={3} active={step === 3} label="Review" />
        </div>
      </div>

      {/* Step content */}
      <div className="bg-card p-4 sm:p-6 rounded-lg">
        {step === 1 && <CustomerSelection />}
        {step === 2 && <ProductSelection />}
        {step === 3 && <OrderReview />}
      </div>

      {/* Navigation buttons */}
      <div className="
        mt-6 
        flex flex-col sm:flex-row 
        gap-3 sm:gap-4 
        sm:justify-end
      ">
        {step > 1 && (
          <Button 
            variant="outline" 
            onClick={() => setStep(step - 1)}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
        )}
        <Button 
          onClick={() => setStep(step + 1)}
          className="w-full sm:w-auto"
        >
          {step === 3 ? 'Submit Order' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
```

---

## 12. Testing Responsive Design

### Browser DevTools
- Chrome: Device Toolbar (Cmd+Shift+M / Ctrl+Shift+M)
- Test common devices: iPhone SE, iPhone 14, iPad, Desktop

### Viewport Meta Tag
```html
<!-- app/layout.tsx -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
```

### Responsive Checklist

For every page, verify:
- [ ] Layout works on 320px (iPhone SE)
- [ ] Layout works on 768px (iPad)
- [ ] Layout works on 1920px (Desktop)
- [ ] Touch targets ≥ 44px on mobile
- [ ] Text readable without zooming
- [ ] Forms usable with mobile keyboard
- [ ] Modals don't overflow screen
- [ ] Images load efficiently (Next.js Image)
- [ ] No horizontal scroll on mobile

---

## 13. Performance Optimization

### Lazy Load Heavy Components

```tsx
import dynamic from 'next/dynamic';

// Don't load chart library on mobile
const DemandForecastChart = dynamic(
  () => import('./demand-forecast-chart'),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[300px]" />
  }
);

export function ProductDetail() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      {/* Only show chart on desktop */}
      {!isMobile && <DemandForecastChart />}
    </div>
  );
}
```

### Conditional Rendering Hook

```tsx
// lib/hooks/use-media-query.ts
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Usage
const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
const isDesktop = useMediaQuery('(min-width: 1024px)');
```

---

## 14. Common Responsive Utilities

### Container

```tsx
{/* Responsive container with max-width */}
<div className="
  container 
  mx-auto 
  px-4 sm:px-6 lg:px-8
  max-w-7xl
">
  {/* Content */}
</div>
```

### Show/Hide Based on Screen

```tsx
{/* Show only on mobile */}
<div className="block md:hidden">Mobile content</div>

{/* Show only on desktop */}
<div className="hidden md:block">Desktop content</div>

{/* Show on tablet and up */}
<div className="hidden sm:block">Tablet+ content</div>
```

---

## 15. Accessibility on Mobile

### Screen Reader Support

```tsx
<Button aria-label="Open menu" className="md:hidden">
  <Menu className="h-6 w-6" />
  <span className="sr-only">Open navigation menu</span>
</Button>
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible (important for tablet users with keyboards).

---

## Summary: Responsive Design Checklist

**Every Component Must:**
- [ ] Work on mobile (320px min width)
- [ ] Work on tablet (768px-1024px)
- [ ] Work on desktop (1024px+)
- [ ] Use Tailwind breakpoints (sm:, md:, lg:, xl:)
- [ ] Have touch-friendly buttons (44px min)
- [ ] Stack forms vertically on mobile
- [ ] Convert tables to cards on mobile
- [ ] Make dialogs full-screen on mobile
- [ ] Test with real devices or DevTools
- [ ] Load efficiently (lazy load heavy components)

---

**Created by:** Clawdy  
**Date:** February 5, 2026  
**Status:** Reference guide for all frontend development
