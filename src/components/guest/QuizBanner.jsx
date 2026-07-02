import React from 'react';
import { Sparkles, ArrowRight, Flame, Target } from 'lucide-react';

export default function QuizBanner({ onOpenQuiz }) {
  return (
    <section className="py-12 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white relative overflow-hidden shadow-xl">
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black border border-white/30 backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>1 Dakikada Kişisel Analiz</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Sana En Uygun Diyet Programını Keşfetmeye Hazır mısın?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-2xl">
              4 basit soruyu yanıtla; metabolizmana, yaşam tarzına ve hedeflerine en uygun beslenme modelini anında öğren!
            </p>
          </div>

          <button
            onClick={onOpenQuiz}
            className="px-8 py-4 rounded-2xl bg-white text-emerald-900 font-black hover:bg-emerald-50 transition-all text-sm flex items-center justify-center gap-2 shadow-2xl shrink-0 group hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Testi Hemen Başlat</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
