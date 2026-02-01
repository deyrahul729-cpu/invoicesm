
import React from 'react';
import { InvoiceItem } from '../types';

interface InvoiceItemsSectionProps {
  items: InvoiceItem[];
  onItemsChange: (items: InvoiceItem[]) => void;
  isGst: boolean;
}

const InvoiceItemsSection: React.FC<InvoiceItemsSectionProps> = ({ items, onItemsChange, isGst }) => {
  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      price: 0,
      cost: 0,
      gst: 18,
      total: 0
    };
    onItemsChange([...items, newItem]);
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Recalculate total
        const taxable = updated.price * updated.quantity;
        const tax = isGst ? (taxable * (updated.gst / 100)) : 0;
        updated.total = taxable + tax;
        return updated;
      }
      return item;
    });
    onItemsChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <i className="fas fa-list text-blue-500"></i>
            Invoice Items
        </h3>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-1/3">Description</th>
              <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Qty</th>
              <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Price (₹)</th>
              <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cost (₹)</th>
              <th className={`px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider ${!isGst && 'hidden'}`}>GST %</th>
              <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Total (₹)</th>
              <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={item.description}
                    onChange={e => updateItem(item.id, 'description', e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-300"
                    placeholder="Enter item name..."
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-16 bg-transparent border-none focus:ring-0 text-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.price}
                    onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                    className="w-24 bg-transparent border-none focus:ring-0 text-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.cost}
                    onChange={e => updateItem(item.id, 'cost', parseFloat(e.target.value) || 0)}
                    className="w-24 bg-transparent border-none focus:ring-0 text-sm"
                  />
                </td>
                <td className={`px-4 py-3 ${!isGst && 'hidden'}`}>
                  <select
                    value={item.gst}
                    onChange={e => updateItem(item.id, 'gst', parseInt(e.target.value))}
                    className="bg-transparent border-none focus:ring-0 text-sm text-slate-600"
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-semibold text-slate-700">
                    ₹{item.total.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                  >
                    <i className="fas fa-trash-alt text-sm"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={handleAddItem}
        className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-medium text-sm"
      >
        <i className="fas fa-plus-circle"></i> Add Item Row
      </button>
    </div>
  );
};

export default InvoiceItemsSection;
