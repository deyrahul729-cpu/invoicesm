
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  cost: number;
  gst: number;
  total: number;
}

export type InvoiceStatus = 'paid' | 'unpaid' | 'advance';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerGST: string;
  advanceAmount: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  items: InvoiceItem[];
  isGstInvoice: boolean;
  notes: string;
  status: InvoiceStatus;
  revenue: number;
  totalCost: number;
  profit: number;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  gst: string;
  upi: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  logo?: string;
  signature?: string;
  qrCode?: string;
}

export interface StockItem {
  id: string;
  code: string;
  name: string;
  category: string;
  availableQty: number;
  soldQty: number;
  unit: string;
  purchasePrice: number;
  sellingPrice: number;
  notes: string;
}
