import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ChevronUp, Sparkles, MessageCircle, HelpCircle, Calculator,
  Users, LogOut, Flame, Scale, UserCheck, PhoneCall, ArrowRight, X
} from 'lucide-react';

export default function FloatingWidgets({ onOpenQuiz, onOpenAuth }) {
  const { role, currentUser, logout, triggerRandomQuote } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const startPosition = window.scrollY;
    if (startPosition === 0) return;
    const duration = 800; // 800ms smooth gliding animation
    let startTime = null;

    const easeInOutCubic = (t) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition * (1 - easeProgress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3 pointer-events-auto">
      {/* Expanded Floating Quick Action Popup Card */}
      {isQuickOpen && (
        <div className="bg-slate-950/90 border border-emerald-500/30 backdrop-blur-2xl text-white p-5 rounded-3xl shadow-2xl max-w-xs w-72 space-y-4 animate-fade-in text-xs border-t-2 border-t-emerald-400">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-white text-xs">Hızlı İşlem & Kısayollar</h4>
                <p className="text-[9px] text-slate-400 font-medium">NutriVibe Akıllı Portal</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsQuickOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* GUEST MODE CONTENT */}
          {role === 'guest' ? (
            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsQuickOpen(false);
                  onOpenQuiz();
                }}
                className="w-full text-left p-2.5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 font-bold flex items-center justify-between transition-all text-emerald-300 group"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ücretsiz Diyet Analiz Testi</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setIsQuickOpen(false);
                  scrollToSection('calculators');
                }}
                className="w-full text-left p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-white/10 font-semibold flex items-center gap-2 transition-all text-slate-200"
              >
                <Calculator className="w-4 h-4 text-teal-400 shrink-0" />
                <span>VKİ & Kalori Hesaplayıcıya Git</span>
              </button>

              <button
                onClick={() => {
                  setIsQuickOpen(false);
                  scrollToSection('dietitians');
                }}
                className="w-full text-left p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-white/10 font-semibold flex items-center gap-2 transition-all text-slate-200"
              >
                <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Uzman Diyetisyenlerimizi Gör</span>
              </button>

              <button
                onClick={() => {
                  triggerRandomQuote();
                }}
                className="w-full text-left p-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 font-semibold flex items-center gap-2 transition-all text-amber-300"
              >
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Rastgele Motivasyon Sözü Al</span>
              </button>

              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsQuickOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full gradient-btn-emerald py-2.5 rounded-xl font-extrabold flex items-center justify-center gap-2 shadow-md text-xs"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Portala Giriş Yap / Demo Seç</span>
                </button>
              </div>
            </div>
          ) : (
            /* LOGGED IN USER CONTENT */
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2.5 rounded-2xl bg-slate-900 border border-white/10">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                  alt={currentUser?.name}
                  className="w-10 h-10 rounded-xl object-cover border border-emerald-400/50"
                />
                <div>
                  <h5 className="font-bold text-white text-xs truncate max-w-[130px]">{currentUser?.name}</h5>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold uppercase border border-emerald-500/30">
                    {role === 'admin' ? 'Yönetici' : role === 'dietitian' ? 'Diyetisyen' : 'Danışan'}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() => {
                    triggerRandomQuote();
                  }}
                  className="w-full text-left p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/5 font-medium flex items-center gap-2 text-slate-300 text-[11px]"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Günlük Motivasyon Sözü Al</span>
                </button>

                <button
                  onClick={() => {
                    setIsQuickOpen(false);
                    logout();
                  }}
                  className="w-full text-left p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 font-bold flex items-center gap-2 text-rose-300 text-[11px]"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Güvenli Oturumu Kapat</span>
                </button>
              </div>
            </div>
          )}

          <div className="text-[9px] text-center text-slate-400 pt-1">
            ⚡ NutriVibe 2026 - Hızlı İşlem Sistemi
          </div>
        </div>
      )}

      {/* Floating Action Buttons Row */}
      <div className="flex items-center space-x-2">
        {/* WhatsApp Direct Chat Button */}
        <a
          href="https://wa.me/905454726440"
          target="_blank"
          rel="noreferrer"
          className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:scale-105 active:scale-95 transition-all group relative flex items-center justify-center border border-emerald-400"
          title="WhatsApp İle İletişime Geçin (0545 472 64 40)"
        >
          <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute right-full mr-2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-md">
            WhatsApp Hat (0545 472 64 40)
          </span>
        </a>

        {/* Quick Menu Toggle Button */}
        <button
          onClick={() => setIsQuickOpen(!isQuickOpen)}
          className={`p-3 rounded-2xl border shadow-2xl transition-all hover:scale-105 active:scale-95 group relative flex items-center justify-center backdrop-blur-md ${
            isQuickOpen
              ? 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/20'
              : 'bg-slate-900/90 text-emerald-400 border-emerald-500/40 hover:bg-slate-800'
          }`}
          title="Hızlı Menü & İpuçları"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute right-full mr-2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-md">
            Hızlı Menü
          </span>
        </button>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl gradient-btn-emerald text-white shadow-xl hover:scale-110 active:scale-95 transition-all group relative flex items-center justify-center"
            title="En Üste Çık"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="absolute right-full mr-2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-md">
              En Üste Çık ⬆
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
