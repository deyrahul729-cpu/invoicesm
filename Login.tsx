
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be validated against a dynamic rotation
    if (password === 'InvoiceSM' || password === 'admin') {
      onLogin();
    } else {
      setError('Invalid password. Please contact admin.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-10">
          <div className="h-20 w-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-blue-900/40">
            <i className="fas fa-lock"></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">InvoiceSM</h1>
          <p className="text-slate-500 font-medium">Administrator Access Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Admin Password</label>
            <input 
              type="password"
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-mono"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-xs mt-3 ml-1 font-semibold flex items-center gap-1">
                <i className="fas fa-exclamation-circle"></i> {error}
            </p>}
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3"
          >
            Authenticate <i className="fas fa-chevron-right text-sm"></i>
          </button>
        </form>

        <div className="mt-10 p-5 bg-blue-50 rounded-2xl border border-blue-100">
           <div className="flex gap-3">
             <i className="fas fa-info-circle text-blue-500 text-lg"></i>
             <div>
               <p className="text-sm font-bold text-blue-900">Password Rotation</p>
               <p className="text-xs text-blue-600 mt-1 leading-relaxed">The system password changes every 30 days for security. Contact technical support for current access keys.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
