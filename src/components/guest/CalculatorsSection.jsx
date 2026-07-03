import React, { useState } from 'react';
import { Calculator, Droplets, Flame, Scale, CheckCircle2, Info } from 'lucide-react';

export default function CalculatorsSection() {
  const [activeTab, setActiveTab] = useState('bmi');

  // BMI State
  const [bmiWeight, setBmiWeight] = useState(70);
  const [bmiHeight, setBmiHeight] = useState(172);

  // Water State
  const [waterWeight, setWaterWeight] = useState(68);
  const [activityLevel, setActivityLevel] = useState('moderate');

  // BMR State
  const [bmrAge, setBmrAge] = useState(30);
  const [bmrGender, setBmrGender] = useState('female');
  const [bmrWeight, setBmrWeight] = useState(65);
  const [bmrHeight, setBmrHeight] = useState(168);

  // Ideal Weight State
  const [idealGender, setIdealGender] = useState('female');
  const [idealHeight, setIdealHeight] = useState(165);

  // Calculations
  const calculateBmi = () => {
    if (!bmiHeight || !bmiWeight) return null;
    const heightInM = bmiHeight / 100;
    const bmiVal = (bmiWeight / (heightInM * heightInM)).toFixed(1);
    let category = '';
    let color = '';
    let advice = '';
    let gaugePercent = 50;

    if (bmiVal < 18.5) {
      category = 'Zayıf (Düşük Kilo)';
      color = 'text-amber-600';
      advice = 'Diyetisyenimiz eşliğinde sağlıklı kas kütlesi kazanımı ve dengeli yüksek besleyici menü önerilir.';
      gaugePercent = 20;
    } else if (bmiVal >= 18.5 && bmiVal <= 24.9) {
      category = 'Normal (İdeal Kilo)';
      color = 'text-emerald-700';
      advice = 'Tebrikler! Vücut kitle indeksiniz ideal aralıkta. Formunuzu korumak için dengeli beslenmeye devam edin.';
      gaugePercent = 50;
    } else if (bmiVal >= 25 && bmiVal <= 29.9) {
      category = 'Fazla Kilolu';
      color = 'text-amber-700';
      advice = 'Kademeli ve kalıcı kilo kaybı için kişiselleştirilmiş Akdeniz tipi beslenme programı uygulayabilirsiniz.';
      gaugePercent = 75;
    } else {
      category = 'Obezite Sınıfı';
      color = 'text-red-600';
      advice = 'Klinik diyetisyen takibi ve detaylı kan tahlili değerlendirmesi ile metabolik beslenme programı başlatılmalıdır.';
      gaugePercent = 95;
    }

    return { val: bmiVal, category, color, advice, gaugePercent };
  };

  const calculateWater = () => {
    let baseMl = waterWeight * 35;
    if (activityLevel === 'moderate') baseMl += 350;
    if (activityLevel === 'high') baseMl += 700;
    return (baseMl / 1000).toFixed(2);
  };

  const calculateBmr = () => {
    let bmr = 10 * bmrWeight + 6.25 * bmrHeight - 5 * bmrAge;
    if (bmrGender === 'female') {
      bmr -= 161;
    } else {
      bmr += 5;
    }
    const maintenance = Math.round(bmr * 1.375);
    return { bmr: Math.round(bmr), maintenance };
  };

  const calculateIdealWeight = () => {
    const inchesOver5Ft = Math.max(0, (idealHeight - 152.4) / 2.54);
    let ideal = 0;
    if (idealGender === 'male') {
      ideal = 50 + 2.3 * inchesOver5Ft;
    } else {
      ideal = 45.5 + 2.3 * inchesOver5Ft;
    }
    return ideal.toFixed(1);
  };

  const bmiResult = calculateBmi();
  const waterResult = calculateWater();
  const bmrResult = calculateBmr();
  const idealResult = calculateIdealWeight();

  return (
    <section id="calculators" className="py-20 relative bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-300 mb-3 shadow-xs">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Ücretsiz İnteraktif Analiz Araçları</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Vücut Değerlerinizi <span className="gradient-text-emerald">Saniyeler İçinde Hesaplayın</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
            Bilimsel formüllerle desteklenen akıllı hesaplayıcılarımız sayesinde günlük kalori, su ve ideal kilo ihtiyacınızı anında öğrenin.
          </p>
        </div>

        {/* Calculator Outer Card */}
        <div className="max-w-4xl mx-auto bg-slate-50/90 rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-xl">
          
          {/* Tab Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            {[
              { id: 'bmi', label: 'VKİ Hesaplayıcı', icon: Scale },
              { id: 'water', label: 'Su İhtiyacı', icon: Droplets },
              { id: 'bmr', label: 'BMR & Kalori', icon: Flame },
              { id: 'ideal', label: 'İdeal Kilo', icon: Calculator }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* 1. BMI CALCULATOR */}
          {activeTab === 'bmi' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-extrabold text-slate-800">Mevcut Kilonuz (kg)</label>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-black border border-emerald-300">
                      {bmiWeight} kg
                    </span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="160"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                    <span>35 kg</span>
                    <span>160 kg</span>
                  </div>
                </div>

                <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-extrabold text-slate-800">Boyunuz (cm)</label>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-black border border-emerald-300">
                      {bmiHeight} cm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                    <span>120 cm</span>
                    <span>220 cm</span>
                  </div>
                </div>
              </div>

              {/* Result Showcase Card */}
              {bmiResult && (
                <div className="bg-white p-8 rounded-3xl border-2 border-emerald-300 shadow-lg text-center space-y-4">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                    Vücut Kitle İndeksiniz (VKİ)
                  </span>
                  <div className="text-5xl font-black text-slate-900">
                    {bmiResult.val} <span className="text-sm font-semibold text-slate-500">kg/m²</span>
                  </div>
                  <div className={`inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-sm font-black border border-emerald-300 ${bmiResult.color}`}>
                    {bmiResult.category}
                  </div>

                  {/* Visual Progress Meter */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200 relative my-2">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300 rounded-full"
                      style={{ width: `${bmiResult.gaugePercent}%` }}
                    ></div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 text-slate-800 border border-emerald-200 text-xs font-medium leading-relaxed max-w-lg mx-auto flex items-start gap-2 text-left">
                    <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Klinik İpucu:</strong> {bmiResult.advice}</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const text = `NutriVibe Sağlık Analizim:\n- VKİ: ${bmiResult.val} kg/m² (${bmiResult.category})\n- Günlük Su İhtiyacı: ${waterResult} L\n- BMR: ${bmrResult.bmr} kcal (Kilo Koruma: ${bmrResult.maintenance} kcal)\n- İdeal Kilo: ${idealResult} kg`;
                        navigator.clipboard.writeText(text);
                        alert("Analiz özetiniz panoya kopyalandı!");
                      }}
                      className="gradient-btn-emerald px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-md hover:brightness-110"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tüm Analiz Özetimi Kopyala</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. WATER CALCULATOR */}
          {activeTab === 'water' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-2">Vücut Ağırlığı (kg)</label>
                  <input
                    type="range"
                    min="40"
                    max="140"
                    value={waterWeight}
                    onChange={(e) => setWaterWeight(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-emerald-700 mt-1 block">{waterWeight} kg</span>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-2">Aktivite Seviyesi</label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-xs font-bold"
                  >
                    <option value="low">Hafif (Masa Başı Çalışma)</option>
                    <option value="moderate">Orta (Haftada 2-3 Gün Spor)</option>
                    <option value="high">Yüksek (Yoğun Spor Temposu)</option>
                  </select>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border-2 border-emerald-300 text-center space-y-3 shadow-md">
                <span className="text-xs font-extrabold text-slate-500 uppercase">Günlük Su Tüketim Hedefi</span>
                <div className="text-5xl font-black text-emerald-700 flex items-center justify-center gap-2">
                  <Droplets className="w-9 h-9 text-emerald-600 animate-bounce" />
                  <span>{waterResult} Litre</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Yaklaşık <strong className="text-slate-900 font-black">{Math.round((waterResult * 1000) / 250)} su bardağı</strong> tüketilmesi tavsiye edilir.
                </p>
              </div>
            </div>
          )}

          {/* 3. BMR CALCULATOR */}
          {activeTab === 'bmr' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Cinsiyet</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBmrGender('female')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                        bmrGender === 'female' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Kadın
                    </button>
                    <button
                      onClick={() => setBmrGender('male')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                        bmrGender === 'male' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Erkek
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Yaş: {bmrAge}</label>
                  <input
                    type="range"
                    min="15"
                    max="85"
                    value={bmrAge}
                    onChange={(e) => setBmrAge(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border-2 border-emerald-300 text-center shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase">Bazal Metabolizma Hızı (BMR)</span>
                  <p className="text-4xl font-black text-emerald-700 mt-2">{bmrResult.bmr} <span className="text-xs font-normal">kcal/gün</span></p>
                </div>

                <div className="bg-white p-6 rounded-2xl border-2 border-emerald-300 text-center shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase">Kilo Koruma Kalorisi</span>
                  <p className="text-4xl font-black text-emerald-800 mt-2">{bmrResult.maintenance} <span className="text-xs font-normal">kcal/gün</span></p>
                </div>
              </div>
            </div>
          )}

          {/* 4. IDEAL WEIGHT CALCULATOR */}
          {activeTab === 'ideal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-2">Boyunuz (cm)</label>
                  <input
                    type="range"
                    min="140"
                    max="210"
                    value={idealHeight}
                    onChange={(e) => setIdealHeight(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-emerald-700 mt-1 block">{idealHeight} cm</span>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-2">Cinsiyet</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIdealGender('female')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${
                        idealGender === 'female' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Kadın
                    </button>
                    <button
                      onClick={() => setIdealGender('male')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${
                        idealGender === 'male' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Erkek
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border-2 border-emerald-300 text-center space-y-2 shadow-md">
                <span className="text-xs font-extrabold text-slate-500 uppercase">Hesaplanan İdeal Kilonuz</span>
                <div className="text-5xl font-black text-emerald-700">
                  {idealResult} <span className="text-sm font-normal text-slate-500">kg</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
