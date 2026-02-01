
import React from 'react';
import { StockItem } from '../types';

interface StockManagementProps {
  stock: StockItem[];
  onSave: (stock: StockItem[]) => void;
}

const StockManagement: React.FC<StockManagementProps> = ({ stock, onSave }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in duration-500">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <p className="text-slate-500 text-sm font-medium">Manage your product inventory and pricing</p>
        <button className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all">
            <i className="fas fa-file-import mr-2"></i> Import CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Item Code</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Item Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Unit</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Selling Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stock.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 text-sm font-mono text-slate-400">{item.code}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
                <td className="px-6 py-4 text-sm font-semibold">
                  <span className={`${item.availableQty < 10 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {item.availableQty}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 uppercase">{item.unit}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800 text-right">₹{item.sellingPrice.toLocaleString()}</td>
              </tr>
            ))}
            {stock.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        No items in stock. Add some in the CSV or create via invoices.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockManagement;
