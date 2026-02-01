
import React from 'react';
import { Invoice, CompanyInfo } from '../types';

interface PreviewSectionProps {
  currentInvoice: Invoice | null;
  company: CompanyInfo;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ currentInvoice, company }) => {
  if (!currentInvoice) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-24 text-center">
            <i className="fas fa-eye-slash text-6xl text-slate-200 mb-6"></i>
            <h2 className="text-xl font-bold text-slate-800">No Invoice Selected</h2>
            <p className="text-slate-500 mt-2">Create a new invoice or select an existing one to preview.</p>
        </div>
    );
  }

  const subtotal = currentInvoice.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const totalGst = currentInvoice.isGstInvoice ? currentInvoice.items.reduce((sum, i) => sum + (i.price * i.quantity * (i.gst / 100)), 0) : 0;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-3 no-print">
        <button onClick={() => window.print()} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
            <i className="fas fa-print"></i> Print Invoice
        </button>
        <button className="bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center gap-2">
            <i className="fab fa-whatsapp"></i> Share PDF
        </button>
      </div>

      <div id="print-area" className="bg-white shadow-2xl rounded-sm p-[25mm] w-[210mm] min-h-[297mm] mx-auto text-slate-800 print:shadow-none print:mx-0 print:w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
            <div>
                <h1 className="text-4xl font-black text-blue-600 mb-2">INVOICE</h1>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No: {currentInvoice.invoiceNumber}</p>
            </div>
            <div className="text-right">
                <h2 className="text-xl font-bold text-slate-800">{company.name}</h2>
                <p className="text-xs text-slate-500 max-w-[200px] mt-1">{company.address}</p>
                <p className="text-xs font-bold text-blue-600 mt-1">GSTIN: {company.gst}</p>
            </div>
        </div>

        {/* Info Rows */}
        <div className="grid grid-cols-2 gap-12 mb-12">
            <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Bill To:</h3>
                <p className="font-bold text-lg">{currentInvoice.customerName}</p>
                <p className="text-sm text-slate-500 mt-1">{currentInvoice.customerAddress}</p>
                <p className="text-sm font-bold text-slate-700 mt-2">{currentInvoice.customerPhone}</p>
            </div>
            <div className="text-right">
                <div className="mb-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Invoice Date:</h3>
                    <p className="font-bold text-sm">{new Date(currentInvoice.date).toLocaleDateString()}</p>
                </div>
                <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Due Date:</h3>
                    <p className="font-bold text-sm text-red-600">{new Date(currentInvoice.dueDate).toLocaleDateString()}</p>
                </div>
            </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-12">
            <thead className="border-b-2 border-slate-800">
                <tr>
                    <th className="py-4 text-left text-xs font-black uppercase tracking-widest">Description</th>
                    <th className="py-4 text-center text-xs font-black uppercase tracking-widest">Qty</th>
                    <th className="py-4 text-right text-xs font-black uppercase tracking-widest">Price</th>
                    {currentInvoice.isGstInvoice && <th className="py-4 text-center text-xs font-black uppercase tracking-widest">GST</th>}
                    <th className="py-4 text-right text-xs font-black uppercase tracking-widest">Amount</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {currentInvoice.items.map((item, idx) => (
                    <tr key={idx}>
                        <td className="py-5 font-medium">{item.description}</td>
                        <td className="py-5 text-center">{item.quantity}</td>
                        <td className="py-5 text-right">₹{item.price.toLocaleString()}</td>
                        {currentInvoice.isGstInvoice && <td className="py-5 text-center text-xs">{item.gst}%</td>}
                        <td className="py-5 text-right font-bold">₹{(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Footer Summary */}
        <div className="flex justify-between items-start gap-12 border-t border-slate-100 pt-12">
            <div className="flex-1">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Bank Details</h3>
                <div className="bg-slate-50 p-6 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-slate-600">{company.bankName}</p>
                    <p className="text-sm font-black text-slate-800">A/C: {company.accountNumber}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">IFSC: {company.ifscCode}</p>
                </div>
                {company.upi && (
                    <div className="mt-4 flex items-center gap-3">
                         <div className="h-10 w-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                            <i className="fas fa-qrcode text-xl text-slate-400"></i>
                         </div>
                         <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">UPI ID</p>
                            <p className="text-sm font-bold text-blue-600">{company.upi}</p>
                         </div>
                    </div>
                )}
            </div>
            <div className="w-80 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                {currentInvoice.isGstInvoice && (
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Total GST</span>
                        <span className="font-bold">₹{totalGst.toLocaleString()}</span>
                    </div>
                )}
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Discount ({currentInvoice.discountType === 'percentage' ? `${currentInvoice.discountValue}%` : 'Fixed'})</span>
                    <span className="font-bold text-red-600">-₹{(currentInvoice.revenue - (subtotal + totalGst)).toLocaleString()}</span>
                </div>
                <div className="bg-blue-600 p-4 rounded-xl flex justify-between items-center text-white mt-6">
                    <span className="text-xs font-bold uppercase tracking-widest">Balance Due</span>
                    <span className="text-2xl font-black">₹{currentInvoice.revenue.toLocaleString()}</span>
                </div>
            </div>
        </div>

        <div className="mt-24 pt-12 border-t border-slate-100 flex justify-between items-end">
             <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Terms & Notes</p>
                <p className="text-sm text-slate-600 max-w-sm italic">{currentInvoice.notes}</p>
             </div>
             <div className="text-center w-48 border-t border-slate-300 pt-4">
                <p className="text-xs font-black uppercase tracking-widest">Authorized Signatory</p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
