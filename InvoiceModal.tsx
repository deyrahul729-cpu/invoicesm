
import React, { useState, useEffect } from 'react';
import { Invoice, InvoiceItem, StockItem } from '../types';
import InvoiceItemsSection from './InvoiceItemsSection';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
  initialData: Invoice | null;
  stock: StockItem[];
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, onSave, initialData, stock }) => {
  const [formData, setFormData] = useState<Partial<Invoice>>({
    id: Date.now().toString(),
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    customerGST: '',
    advanceAmount: 0,
    discountType: 'percentage',
    discountValue: 0,
    items: [],
    isGstInvoice: true,
    notes: 'Thank you for your business!',
    status: 'unpaid',
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        const year = new Date().getFullYear();
        const rand = Math.floor(Math.random() * 9000) + 1000;
        setFormData({
          id: Date.now().toString(),
          invoiceNumber: `INV-${year}-${rand}`,
          date: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          customerName: '',
          customerPhone: '',
          customerAddress: '',
          customerGST: '',
          advanceAmount: 0,
          discountType: 'percentage',
          discountValue: 0,
          items: [
            { id: '1', description: '', quantity: 1, price: 0, cost: 0, gst: 18, total: 0 }
          ],
          isGstInvoice: true,
          notes: 'Thank you for your business!',
          status: 'unpaid',
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleItemsChange = (items: InvoiceItem[]) => {
    setFormData(prev => ({ ...prev, items }));
  };

  const calculateTotals = () => {
    const items = formData.items || [];
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = formData.isGstInvoice 
      ? items.reduce((sum, item) => sum + (item.price * item.quantity * (item.gst / 100)), 0)
      : 0;
    const preDiscountTotal = subtotal + tax;
    
    let discount = 0;
    if (formData.discountType === 'percentage') {
      discount = preDiscountTotal * (formData.discountValue! / 100);
    } else {
      discount = formData.discountValue!;
    }

    const revenue = Math.max(0, preDiscountTotal - discount);
    const totalCost = items.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
    
    return {
      revenue,
      totalCost,
      profit: revenue - totalCost
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { revenue, totalCost, profit } = calculateTotals();
    onSave({
      ...formData as Invoice,
      revenue,
      totalCost,
      profit
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-auto animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Invoice' : 'Create New Invoice'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            
            {/* ROW 1: Customer Info (Split 50/50 Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer Name</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            {/* ROW 2: Invoice Metadata (Three Equal Columns Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice Number</label>
                <input
                  type="text"
                  required
                  value={formData.invoiceNumber}
                  onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* ROW 3: Financial Toggles (Aligned Compact Line Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Advance Payment (₹)</label>
                <input
                  type="number"
                  value={formData.advanceAmount}
                  onChange={e => setFormData({ ...formData, advanceAmount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-1 flex flex-col justify-end h-full">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">GST Type</label>
                <div className="flex bg-white rounded-lg p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isGstInvoice: true })}
                    className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold transition-all ${
                      formData.isGstInvoice ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    GST
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isGstInvoice: false })}
                    className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold transition-all ${
                      !formData.isGstInvoice ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    NON-GST
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Discount</label>
                <div className="flex gap-2">
                  <select 
                    value={formData.discountType}
                    onChange={e => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
                    className="w-1/3 px-2 py-2 bg-white border border-slate-200 rounded-lg outline-none text-xs"
                  >
                    <option value="percentage">%</option>
                    <option value="fixed">Fixed</option>
                  </select>
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={e => setFormData({ ...formData, discountValue: parseFloat(e.target.value) || 0 })}
                    className="w-2/3 px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-sm"
                    placeholder="Value"
                  />
                </div>
              </div>
            </div>

            {/* PRESERVED ITEMS SECTION */}
            <div className="border-t border-slate-100 pt-6">
               <InvoiceItemsSection 
                 items={formData.items || []} 
                 onItemsChange={handleItemsChange} 
                 isGst={!!formData.isGstInvoice}
               />
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notes</label>
                    <textarea 
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm h-20 resize-none"
                        placeholder="Additional notes for the customer..."
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer Address</label>
                    <textarea 
                        value={formData.customerAddress}
                        onChange={e => setFormData({ ...formData, customerAddress: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm h-20 resize-none"
                        placeholder="Full billing address..."
                    />
                </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-lg shadow-emerald-200 transition-all"
            >
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModal;
