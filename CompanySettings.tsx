
import React from 'react';
import { CompanyInfo } from '../types';

interface CompanySettingsProps {
  company: CompanyInfo;
  onSave: (info: CompanyInfo) => void;
}

const CompanySettings: React.FC<CompanySettingsProps> = ({ company, onSave }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onSave({ ...company, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Logo Section */}
          <div className="lg:col-span-1 space-y-8">
             <div>
               <h3 className="text-lg font-bold text-slate-800 mb-4">Company Branding</h3>
               <div className="w-full aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <i className="fas fa-cloud-upload-alt text-4xl text-slate-300 group-hover:text-blue-500"></i>
                  <p className="text-xs font-bold text-slate-400 group-hover:text-blue-600">UPLOAD LOGO</p>
               </div>
             </div>
             <div>
               <h3 className="text-lg font-bold text-slate-800 mb-4">Digital Signature</h3>
               <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                  <i className="fas fa-signature text-2xl text-slate-300 group-hover:text-emerald-500"></i>
                  <p className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-600 uppercase">Authorized Sign</p>
               </div>
             </div>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-8">
             <div>
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <i className="fas fa-info-circle text-blue-500"></i>
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Name</label>
                      <input name="name" value={company.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">GSTIN Number</label>
                      <input name="gst" value={company.gst} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
                   </div>
                   <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Office Address</label>
                      <textarea name="address" value={company.address} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 h-24 resize-none" />
                   </div>
                </div>
             </div>

             <div className="pt-8 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <i className="fas fa-university text-emerald-500"></i>
                  Banking & Payments
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bank Name</label>
                      <input name="bankName" value={company.bankName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Number</label>
                      <input name="accountNumber" value={company.accountNumber} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">IFSC Code</label>
                      <input name="ifscCode" value={company.ifscCode} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">UPI ID (VPA)</label>
                      <input name="upi" value={company.upi} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
                   </div>
                </div>
             </div>

             <div className="pt-8">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-100 transition-all flex items-center gap-2">
                   <i className="fas fa-save"></i> Save All Changes
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
