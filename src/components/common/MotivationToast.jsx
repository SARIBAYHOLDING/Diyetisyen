import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, X, Quote } from 'lucide-react';

export default function MotivationToast() {
  const {
    motivationQuotes,
    motivationEnabled,
    motivationIntervalSec,
    currentToastQuote,
    setCurrentToastQuote,
    triggerRandomQuote
  } = useAuth();

  const [visible, setVisible] = useState(false);

  // Interval manager for 45s auto popup
  useEffect(() => {
    if (!motivationEnabled) return;

    const timer = setInterval(() => {
      triggerRandomQuote();
    }, motivationIntervalSec * 1000);

    return () => clearInterval(timer);
  }, [motivationEnabled, motivationIntervalSec, motivationQuotes]);

  // When a new quote is assigned, display toast for 5 seconds
  useEffect(() => {
    if (currentToastQuote) {
      setVisible(true);

      const hideTimer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setCurrentToastQuote(null), 300);
      }, 5000); // 5 seconds display time

      return () => clearTimeout(hideTimer);
    }
  }, [currentToastQuote]);

  if (!visible || !currentToastQuote) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-in">
      <div className="relative bg-white rounded-2xl p-4 border border-emerald-300 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500"></div>

        {/* Header line */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-emerald-700 tracking-wide uppercase">
                Günün Motivasyonu
              </span>
              <span className="text-[10px] text-slate-500 block font-medium">
                {currentToastQuote.category}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setVisible(false);
              setCurrentToastQuote(null);
            }}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            title="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quote text */}
        <div className="my-2 flex items-start gap-2">
          <Quote className="w-5 h-5 text-emerald-500/40 shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-slate-800 leading-relaxed italic">
            "{currentToastQuote.text}"
          </p>
        </div>

        {/* Author footer */}
        <div className="text-right mt-1">
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            — {currentToastQuote.author}
          </span>
        </div>

        {/* 5-second animated progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-100">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 animate-toast-bar"></div>
        </div>
      </div>
    </div>
  );
}
