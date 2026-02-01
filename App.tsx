
import React, { useState, useEffect, useCallback } from 'react';
import { CompanyInfo, Invoice, StockItem } from './types';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CompanySettings from './components/CompanySettings';
import InvoiceModal from './components/InvoiceModal';
import StockManagement from './components/StockManagement';
import PreviewSection from './components/PreviewSection';
import Login from './components/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'company' | 'stock' | 'preview'>('dashboard');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  
  // Persistence states
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stock, setStock] = useState<StockItem[]>([]);
  const [company, setCompany] = useState<CompanyInfo>({
    name: 'Smart Solutions',
    address: '123 Business Street, Mumbai, Maharashtra',
    phone: '+91 9876543210',
    gst: '27ABCDE1234F1Z5',
    upi: 'yourbusiness@upi',
    bankName: 'State Bank of India',
    accountNumber: '12345678901234',
    ifscCode: 'SBIN0000123',
    branchName: 'Mumbai Main Branch',
  });

  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoiceHistory');
    const savedStock = localStorage.getItem('stockItems');
    const savedCompany = localStorage.getItem('companyInfo');
    const authStatus = localStorage.getItem('invoiceSM_authenticated');

    if (savedInvoices) setInvoices(JSON.parse(savedInvoices));
    if (savedStock) setStock(JSON.parse(savedStock));
    if (savedCompany) setCompany(JSON.parse(savedCompany));
    if (authStatus === 'true') setIsAuthenticated(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('invoiceHistory', JSON.stringify(invoices));
    localStorage.setItem('stockItems', JSON.stringify(stock));
    localStorage.setItem('companyInfo', JSON.stringify(company));
  }, [invoices, stock, company]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('invoiceSM_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('invoiceSM_authenticated');
  };

  const handleSaveInvoice = (invoice: Invoice) => {
    setInvoices(prev => {
      const exists = prev.find(i => i.id === invoice.id);
      if (exists) {
        return prev.map(i => i.id === invoice.id ? invoice : i);
      }
      return [invoice, ...prev];
    });
    setCurrentInvoice(invoice);
    setIsInvoiceModalOpen(false);
  };

  const handleCreateNew = () => {
    setCurrentInvoice(null);
    setIsInvoiceModalOpen(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setIsInvoiceModalOpen(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen pb-12">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout}
        onBackup={() => {
            const data = JSON.stringify({ company, invoices, stock });
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800 capitalize">
            {activeTab === 'preview' ? 'Invoice Preview' : `${activeTab} Management`}
          </h1>
          {activeTab === 'dashboard' && (
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
            >
              <i className="fas fa-plus"></i> Create New Invoice
            </button>
          )}
        </div>

        {activeTab === 'dashboard' && (
          <Dashboard 
            invoices={invoices} 
            onEdit={handleEditInvoice} 
            onDelete={(id) => setInvoices(prev => prev.filter(i => i.id !== id))}
          />
        )}
        {activeTab === 'company' && (
          <CompanySettings company={company} onSave={setCompany} />
        )}
        {activeTab === 'stock' && (
          <StockManagement stock={stock} onSave={setStock} />
        )}
        {activeTab === 'preview' && (
          <PreviewSection currentInvoice={currentInvoice} company={company} />
        )}
      </main>

      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSave={handleSaveInvoice}
        initialData={currentInvoice}
        stock={stock}
      />
    </div>
  );
};

export default App;
