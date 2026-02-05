/**
 * API Endpoints
 * Centralized endpoint definitions for type safety
 */

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    LOGOUT: '/api/v1/auth/logout',
    ME: '/api/v1/auth/me',
  },

  // CRM
  CRM: {
    LEADS: '/api/v1/crm/leads',
    LEAD_BY_ID: (id: string) => `/api/v1/crm/leads/${id}`,
    DEALS: '/api/v1/crm/deals',
    DEAL_BY_ID: (id: string) => `/api/v1/crm/deals/${id}`,
    DEAL_MOVE: (id: string) => `/api/v1/crm/deals/${id}/move`,
    STAGES: '/api/v1/crm/stages',
  },

  // Inventory
  INVENTORY: {
    PRODUCTS: '/api/v1/inventory/products',
    PRODUCT_BY_ID: (id: string) => `/api/v1/inventory/products/${id}`,
    ALERTS: '/api/v1/inventory/alerts',
    WAREHOUSES: '/api/v1/inventory/warehouses',
  },

  // Sales
  SALES: {
    ORDERS: '/api/v1/sales/orders',
    ORDER_BY_ID: (id: string) => `/api/v1/sales/orders/${id}`,
    CONFIRM_ORDER: (id: string) => `/api/v1/sales/orders/${id}/confirm`,
    ORDER_PDF: (id: string) => `/api/v1/sales/orders/${id}/pdf`,
    UPDATE_PAYMENT: (id: string) => `/api/v1/sales/orders/${id}/payment`,
  },

  // Purchasing
  PURCHASING: {
    ORDERS: '/api/v1/purchasing/orders',
    ORDER_BY_ID: (id: string) => `/api/v1/purchasing/orders/${id}`,
    RECEIVE_GOODS: (id: string) => `/api/v1/purchasing/orders/${id}/receive`,
  },

  // AI
  AI: {
    PREDICT_DEMAND: '/api/v1/ai/predict-demand',
    PARSE_INVOICE: '/api/v1/ai/parse-invoice',
    RECOMMEND_UPSELL: '/api/v1/ai/recommend-upsell',
    CHAT: '/api/v1/ai/chat',
  },
} as const;
