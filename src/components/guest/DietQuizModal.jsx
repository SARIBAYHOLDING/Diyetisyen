import React, { useState } from 'react';
import { X, Sparkles, Flame, ArrowRight, RotateCcw, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DietQuizModal({ isOpen, onClose, onOpenAuth }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: '',
    lifestyle: '',
    challenge: '',
    preference: ''
  });
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSelect = (key, val) => {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);

    if (step < 4) {
      setStep(step + 1);
    } else {
      calculateResult(updated);
    }
  };

  const calculateResult = (finalAns) => {
    let title = "Akdeniz Tipi Bütüncül Beslenme Programı";
    let desc = "Metabolizmanızı yormadan, taze sebze, sağlıklı yağlar ve protein dengesi ile kalıcı sonuç elde edin.";
    let tags = ["Kalıcı Kilo Verimi", "Yüksek Enerji", "Kalp Sağlığı"];

    if (finalAns.goal === 'muscle' || finalAns.lifestyle === 'active') {
      title = "Yüksek Proteinli Sporcu & Hipertrofi Diyet Modeli";
      desc = "Kas kütlesini koruyup artırırken yağ oranını düşürmeye odaklı özel makro zamanlaması.";
      tags = ["Kas Kazanımı", "Makro Takibi", "Performans"];
    } else if (finalAns.challenge === 'bloating' || finalAns.preference === 'gluten_free') {
      title = "Fonksiyonel Eliminasyon & Bağırsak Dostu Protokol";
      desc = "Şişkinlik ve hassasiyeti ortadan kaldıran, sindirimi rahatlatan 31 günlük beslenme arınması.";
      tags = ["Glütensiz/Laktozsuz", "Ödem Atımı", "Sindirim Rahatlığı"];
    } else if (finalAns.goal === 'fast_burn') {
      title = "Keto-Flex Döngüsel Yağ Yakım Programı";
      desc = "Düşük karbonhidrat ve yüksek sağlıklı yağlar ile metabolizmayı yağ yakım moduna sokan sistem.";
      tags = ["Hızlı Yağ Yakımı", "İnsülin Dengesi", "Zihinsel Netlik"];
    }

    setResult({ title, desc, tags });
    setStep(5);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ goal: '', lifestyle: '', challenge: '', preference: '' });
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Quiz Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kişiselleştirilmiş Beslenme Testi</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">Sana En Uygun Diyet Hangisi?</h3>
          {step <= 4 && (
            <p className="text-xs text-slate-500 mt-1 font-semibold">Adım {step} / 4</p>
          )}
        </div>

        {/* Progress Bar */}
        {step <= 4 && (
          <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        )}

        {/* STEP 1: Main Goal */}
        {step === 1 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 mb-2">Ana Sağlık Hedefiniz Nedir?</h4>
            {[
              { id: 'lose_fat', label: 'Yağ Yakmak & Kilo Vermek' },
              { id: 'muscle', label: 'Kas Kütlesini Artırmak & Sıkılaşmak' },
              { id: 'fast_burn', label: 'Hızlı Kilo Verip Ödem Atmak' },
              { id: 'health', label: 'Sağlıklı Yaşam & Enerji Artışı' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect('goal', opt.id)}
                className="w-full p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-100 transition-all text-left text-xs font-bold text-slate-900 flex items-center justify-between group"
              >
                <span>{opt.label}</span>
                <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}

        {/* STEP 2: Lifestyle */}
        {step === 2 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 mb-2">Günlük Hareket Rutininiz Nasıl?</h4>
            {[
              { id: 'desk', label: 'Masa Başı & Sedanter (Az Hareketli)' },
              { id: 'moderate', label: 'Haftada 2-3 Gün Yürüyüş veya Spor' },
              { id: 'active', label: 'Yoğun Tempolu & Düzenli Egzersiz' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect('lifestyle', opt.id)}
                className="w-full p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-100 transition-all text-left text-xs font-bold text-slate-900 flex items-center justify-between group"
              >
                <span>{opt.label}</span>
                <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}

        {/* STEP 3: Main Challenge */}
        {step === 3 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 mb-2">Diyet Yaparken En Çok Zorlandığınız Nokta?</h4>
            {[
              { id: 'sweet_cravings', label: 'Tatlı & Akşam Atıştırma Krizleri' },
              { id: 'bloating', label: 'Şişkinlik, Gaz ve Sindirim Sorunları' },
              { id: 'time', label: 'Yemek Hazırlamaya Zaman Bulamama' },
              { id: 'boredom', label: 'Sıkıcı & Tek Düzə Menülerden Bıkma' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect('challenge', opt.id)}
                className="w-full p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-100 transition-all text-left text-xs font-bold text-slate-900 flex items-center justify-between group"
              >
                <span>{opt.label}</span>
                <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}

        {/* STEP 4: Dietary Preference */}
        {step === 4 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 mb-2">Özel Bir Beslenme Tercihiniz Var mı?</h4>
            {[
              { id: 'none', label: 'Özel bir kısıtlamam yok (Her şeyi tüketebilirim)' },
              { id: 'gluten_free', label: 'Glütensiz veya Laktozsuz Tercih Ediyorum' },
              { id: 'vegetarian', label: 'Vejetaryen / Et Tüketmiyorum' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect('preference', opt.id)}
                className="w-full p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-100 transition-all text-left text-xs font-bold text-slate-900 flex items-center justify-between group"
              >
                <span>{opt.label}</span>
                <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}

        {/* STEP 5: RESULT */}
        {step === 5 && result && (
          <div className="text-center space-y-5">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-600 flex items-center justify-center shadow-md">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-black text-slate-900">{result.title}</h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{result.desc}</p>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {result.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-full bg-white text-emerald-800 text-[10px] font-bold border border-emerald-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resetQuiz}
                className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
                title="Testi Tekrarla"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="flex-1 gradient-btn-emerald py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Bu Programı Başlat (Giriş Yap)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
