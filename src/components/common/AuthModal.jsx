import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { X, UserCheck, Stethoscope, ShieldCheck, User, Sparkles, Mail, Lock, Key, AlertCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { loginAs, loginWithCredentials } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('client'); // 'client' | 'dietitian' | 'admin'
  const [activeTab, setActiveTab] = useState('quick'); // 'quick' | 'custom'
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const result = loginWithCredentials(email, password, selectedRole);

    if (result.success) {
      onClose();
    } else {
      setErrorMsg(result.message);
    }
  };

  const handleQuickRole = (roleType) => {
    loginAs(roleType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-emerald-700" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Kullanıcı Giriş Ekranı</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Sisteme giriş yapmak için yönteminizi seçin
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6 border border-slate-200">
          <button
            onClick={() => { setActiveTab('quick'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'quick' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hızlı Rol Demo Girişi
          </button>
          <button
            onClick={() => { setActiveTab('custom'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'custom' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Şifreli Giriş (Deneme123)
          </button>
        </div>

        {/* Error Feedback Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick Roles Section */}
        {activeTab === 'quick' ? (
          <div className="space-y-3">
            <button
              onClick={() => handleQuickRole('client')}
              className="w-full p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left flex items-center justify-between group shadow-xs"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Danışan Girişi
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium">Diyet listesi, talep ve su takibi (Ahsen Y.)</p>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={() => handleQuickRole('dietitian')}
              className="w-full p-4 rounded-2xl bg-teal-50/70 border border-teal-200 hover:border-teal-500 hover:bg-teal-50 transition-all text-left flex items-center justify-between group shadow-xs"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    Diyetisyen Girişi (Şifre: Deneme123)
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium">Danışan ekleme, menü düzenleme & notlar</p>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={() => handleQuickRole('admin')}
              className="w-full p-4 rounded-2xl bg-emerald-100/60 border border-emerald-300 hover:border-emerald-600 hover:bg-emerald-100 transition-all text-left flex items-center justify-between group shadow-xs"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    Yönetici Girişi (Şifre: Deneme123)
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium">Müşteri & ödeme takibi, CRUD & motivasyon</p>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Giriş Yapılacak Rol</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full p-2.5 rounded-xl glass-input text-xs font-bold"
              >
                <option value="client">Danışan (Müşteri)</option>
                <option value="dietitian">Diyetisyen (Şifre: Deneme123)</option>
                <option value="admin">Yönetici (Şifre: Deneme123)</option>
              </select>
            </div>

            {selectedRole === 'client' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">E-posta Adresi</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@demo.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-semibold"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Şifre</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={selectedRole === 'client' ? "Şifreniz" : "Deneme123"}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-bold text-emerald-800"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                {selectedRole !== 'client' ? "💡 Diyetisyen & Yönetici şifresi: Deneme123" : "💡 Yeni oluşturduğunuz danışan şifresini girin"}
              </p>
            </div>

            <button
              type="submit"
              className="w-full gradient-btn-emerald py-3 rounded-xl text-xs font-extrabold shadow-lg"
            >
              Giriş Yap
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-[10px] text-slate-400 border-t border-slate-100 pt-3">
          ⚡ {BRAND_CONFIG.footprint} - {BRAND_CONFIG.engineVersion}
        </div>
      </div>
    </div>
  );
}
