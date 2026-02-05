/**
 * API Response Types
 * Type definitions for API responses
 */

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth
export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: {
    id: string;
    name: string;
    permissions: Record<string, string[]>;
  };
  tenant_id: string;
}

export interface LoginResponse {
  user: User;
  message: string;
}

// CRM
export interface Lead {
  id: string;
  tenant_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  status: string;
  source?: string;
  ai_score?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  tenant_id: string;
  lead_id: string;
  lead?: Lead;
  amount: number;
  stage_id: string;
  stage?: PipelineStage;
  expected_close_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PipelineStage {
  id: string;
  tenant_id: string;
  name: string;
  order: number;
}

// Inventory
export interface Product {
  id: string;
  tenant_id: string;
  sku: string;
  name: string;
  description?: string;
  cost_price: number;
  selling_price: number;
  reorder_point: number;
  category?: string;
  current_stock?: number; // From view_current_stock
  created_at: string;
  updated_at: string;
}

export interface Warehouse {
  id: string;
  tenant_id: string;
  name: string;
  is_primary: boolean;
}

// Sales
export interface SalesOrder {
  id: string;
  tenant_id: string;
  customer_id: string;
  customer?: Lead;
  status: 'draft' | 'confirmed' | 'shipped' | 'paid';
  total_amount: number;
  payment_status: 'unpaid' | 'partial' | 'paid';
  items: SalesOrderItem[];
  created_at: string;
  updated_at: string;
}

export interface SalesOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  unit_price: number;
}

// Purchasing
export interface PurchaseOrder {
  id: string;
  tenant_id: string;
  vendor_id: string;
  vendor?: Vendor;
  status: 'draft' | 'sent' | 'received';
  items: PurchaseOrderItem[];
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  unit_price: number;
}

export interface Vendor {
  id: string;
  tenant_id: string;
  name: string;
  contact_email?: string;
  phone?: string;
}

// AI
export interface DemandForecast {
  next_month_forecast: number;
  confidence: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface ParsedInvoice {
  vendor_name: string;
  invoice_date: string;
  total_amount: number;
  line_items: {
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
  }[];
}

export interface UpsellRecommendation {
  product_id: string;
  confidence: number;
  reason: string;
}

export interface ChatResponse {
  response: string;
  suggestions?: string[];
}
