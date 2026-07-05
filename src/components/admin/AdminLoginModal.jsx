import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Key, X, Sparkles, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose }) {
  const { loginWithCredentials, brandConfig } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const result = loginWithCredentials('', password, 'admin');
    if (result.success) {
      onClose();
      setPassword('');
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-emerald-300 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Yönetici Portalı Girişi</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {brandConfig.name || "Dyt. Ceren Çetinkaya"} • Özel Master Kontrol Paneli
          </p>
        </div>

        {/* Security Badge */}
        <div className="mb-6 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Bu alan tam yetkili sistem yöneticisine özeldir.</span>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Yönetici Şifresi</span>
              <span className="text-[10px] text-emerald-700 font-bold">Giriş Kodu</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Yönetici şifreniz"
                required
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs font-bold text-slate-900 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5 font-medium">
              💡 Varsayılan Sistem Şifresi: <span className="font-bold text-slate-700">{brandConfig.staffDefaultPassword || "Deneme123"}</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full gradient-btn-emerald py-3.5 rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            <Key className="w-4 h-4" />
            <span>Master Admin Paneline Giriş Yap</span>
          </button>
        </form>

        <div className="mt-6 text-center text-[10px] text-slate-400 border-t border-slate-100 pt-3">
          ⚡ SSL 256-bit Güvenli Yönetici Portalı • Suda Dynamics Engine
        </div>
      </div>
    </div>
  );
}
