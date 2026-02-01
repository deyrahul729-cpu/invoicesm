
import React from 'react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  onLogout: () => void;
  onBackup: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, onLogout, onBackup }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 text-blue-600">
              <i className="fas fa-file-invoice text-2xl"></i>
              <span className="font-bold text-xl tracking-tight">Invoice<span className="text-emerald-500">SM</span></span>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              {['dashboard', 'company', 'stock', 'preview'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onBackup}
              className="p-2 text-slate-500 hover:text-blue-600 transition-colors"
              title="Backup Data"
            >
              <i className="fas fa-download"></i>
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-colors"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile nav indicator */}
      <div className="sm:hidden flex justify-around border-t border-slate-100 py-2">
         {['dashboard', 'company', 'stock', 'preview'].map((tab) => (
            <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`flex flex-col items-center gap-1 ${activeTab === tab ? 'text-blue-600' : 'text-slate-400'}`}
            >
                <i className={`fas fa-${tab === 'dashboard' ? 'home' : tab === 'company' ? 'building' : tab === 'stock' ? 'boxes' : 'eye'}`}></i>
                <span className="text-[10px]">{tab}</span>
            </button>
         ))}
      </div>
    </nav>
  );
};

export default Navigation;
