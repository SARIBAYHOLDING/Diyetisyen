import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ onOpenAuth, onOpenQuiz }) {
  const { brandConfig, siteSections } = useAuth();

  const badgeText = siteSections?.heroBadge || "🌿 Dyt. Ceren Çetinkaya • Kilo Takip Modülü & Beslenme Portalı";
  const line1 = siteSections?.heroTitleLine1 || "Bedeninize Değer Verin,";
  const line2 = siteSections?.heroTitleLine2 || "Sağlıklı Geleceği";
  const checklist = siteSections?.heroChecklist || [
    "Dyt. Ceren Çetinkaya Birebir Kilo Takibi",
    "7/24 Canlı Diyet Listesi & Talepler",
    "İnteraktif Vücut Analiz Araçları",
    "45 Saniyede Bir Otomatik Motivasyon Mesajı"
  ];

  return (
    <div className="relative">
      {/* Hero Container */}
      <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-extrabold shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{badgeText}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                {line1} <br />
                <span className="gradient-text-emerald">{line2}</span> Şekillendirin.
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-700 max-w-2xl font-medium leading-relaxed">
                {brandConfig.description} Dyt. Ceren Çetinkaya kişiye özel takibi, detaylı kilo/yağ takip grafikleriniz ve anlık motivasyon desteği ile hedeflerinize ulaşın.
              </p>

              {/* Checkmarks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full pt-2 text-left">
                {checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-bold">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const elem = document.getElementById('calculators');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto gradient-btn-emerald px-8 py-4 rounded-2xl text-base font-extrabold flex items-center justify-center gap-2.5 shadow-lg group"
                >
                  <span>Vücut Analizini Yap</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold hover:bg-emerald-50 border border-emerald-300 transition-all text-base flex items-center justify-center gap-2 shadow-md"
                >
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>En Uygun Diyet Testi</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Card with Generated Illustration */}
                <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-2xl space-y-4">
                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-emerald-100 shadow-inner">
                    <img
                      src="/ceren_cetinkaya.jpg"
                      alt="Dyt. Ceren Çetinkaya"
                      className="w-full h-full object-cover object-[center_30%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-emerald-200 flex items-center justify-between shadow-md">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs">
                          99%
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-900">Danışan Memnuniyeti</p>
                          <p className="text-[10px] text-slate-500 font-medium">Kalıcı Kilo Yönetimi & Takip</p>
                        </div>
                      </div>
                      <button
                        onClick={onOpenAuth}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                      >
                        Katıl
                      </button>
                    </div>
                  </div>

                  {/* Doctor Info Row */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="/ceren_cetinkaya.jpg"
                        alt="Dyt. Ceren Çetinkaya"
                        className="w-10 h-10 rounded-xl object-cover border-2 border-emerald-500 shrink-0 object-top"
                      />
                      <div>
                        <p className="text-xs font-extrabold text-slate-900">Dyt. Ceren Çetinkaya</p>
                        <p className="text-[10px] text-emerald-800 font-bold">Klinik Beslenme Uzmanı (Kurucu)</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white text-emerald-800 text-[10px] font-black border border-emerald-300 shrink-0">
                      9+ Yıl Tecrübe
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full-Width Stats Ribbon */}
      <section className="bg-emerald-950 text-white py-8 border-y border-emerald-800 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-1 p-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">{brandConfig.stats?.happyClients || "2,450+"}</span>
              <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Mutlu Danışan</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">{brandConfig.stats?.expertDietitians || "1+"}</span>
              <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Uzman Diyetisyen</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2">
              <span className="text-3xl sm:text-4xl font-black text-amber-400">200+</span>
              <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Motivasyon İpucu</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">{brandConfig.stats?.successRate || "%99.1"}</span>
              <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Başarı Oranı</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
