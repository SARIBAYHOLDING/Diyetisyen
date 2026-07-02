import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { Sparkles, UserCheck, LogOut, ShieldCheck, Stethoscope, User, Calculator, Flame } from 'lucide-react';

export default function Navbar({ onOpenAuth, onOpenQuiz, activeSection, setActiveSection }) {
  const { role, currentUser, logout, triggerRandomQuote } = useAuth();

  const getRoleBadge = () => {
    if (role === 'client') return { text: 'Danışan Paneli', bg: 'bg-emerald-50 text-emerald-700 border-emerald-300', icon: User };
    if (role === 'dietitian') return { text: 'Diyetisyen Paneli', bg: 'bg-teal-50 text-teal-700 border-teal-300', icon: Stethoscope };
    if (role === 'admin') return { text: 'Yönetici Paneli', bg: 'bg-emerald-100 text-emerald-800 border-emerald-400', icon: ShieldCheck };
    return null;
  };

  const badge = getRoleBadge();

  const handleNavClick = (secId) => {
    setActiveSection(secId);
    const element = document.getElementById(secId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 border-b border-emerald-100 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Identity */}
        <div 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          onClick={() => handleNavClick('hero')}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5 whitespace-nowrap">
              {BRAND_CONFIG.name}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                PRO
              </span>
            </span>
            <p className="text-[10px] text-slate-500 hidden sm:block font-medium">
              {BRAND_CONFIG.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {role === 'guest' && (
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700 whitespace-nowrap">
            <button
              onClick={() => handleNavClick('calculators')}
              className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Hesaplayıcılar</span>
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="hover:text-emerald-600 transition-colors"
            >
              Hizmetlerimiz
            </button>
            <button
              onClick={() => handleNavClick('dietitians')}
              className="hover:text-emerald-600 transition-colors"
            >
              Diyetisyenlerimiz
            </button>
            <button
              onClick={() => handleNavClick('testimonials')}
              className="hover:text-emerald-600 transition-colors"
            >
              Başarı Hikayeleri
            </button>
            <button
              onClick={onOpenQuiz}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-all flex items-center gap-1 text-xs font-bold"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Diyet Testi</span>
            </button>
          </nav>
        )}

        {/* Right Action Bar */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Motivation Tester Button */}
          <button
            onClick={triggerRandomQuote}
            title="45sn Motivasyon Mesajını Şimdi Gör"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 text-xs font-bold transition-all whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Motivasyon İpucu</span>
          </button>

          {role !== 'guest' && badge && (
            <div className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border whitespace-nowrap ${badge.bg}`}>
              <badge.icon className="w-3.5 h-3.5" />
              <span>{badge.text}</span>
            </div>
          )}

          {role === 'guest' ? (
            <button
              onClick={onOpenAuth}
              className="gradient-btn-emerald px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md whitespace-nowrap"
            >
              <UserCheck className="w-4 h-4" />
              <span>Giriş Yap / Panel</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 whitespace-nowrap">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-extrabold text-slate-900">{currentUser?.name}</p>
                <p className="text-[10px] text-slate-500 font-medium">{currentUser?.title || currentUser?.email}</p>
              </div>
              <button
                onClick={logout}
                title="Çıkış Yap"
                className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
