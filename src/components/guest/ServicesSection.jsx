import React from 'react';
import { Target, HeartPulse, Dumbbell, Stethoscope, Sparkles, Zap } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Target,
      title: "Kilo Verme & Yağ Yakımı",
      description: "Aç kalmadan, kas kaybı yaşamadan sürdürülebilir yağ yakımı ve metabolizma hızlandırma protokolleri."
    },
    {
      icon: Dumbbell,
      title: "Sporcu Beslenmesi & Kas Kazanımı",
      description: "Antrenman öncesi/sonrası besin zamanlaması, hipertrofi ve performans odaklı makro hesabı."
    },
    {
      icon: HeartPulse,
      title: "Klinik & Hastalıklarda Beslenme",
      description: "Diyabet, Polikistik Over (PCOS), Tiroid, İnsülin Direnci ve Sindirim sistemi rahatsızlıklarına özel beslenme."
    },
    {
      icon: Stethoscope,
      title: "Bariatrik Diyet & Tahlil Analizi",
      description: "Ameliyat öncesi ve sonrası beslenme takibi, detaylı kan ve mineral analizlerine göre takviye yönetimi."
    },
    {
      icon: Sparkles,
      title: "Sezgisel & Eliminasyon Diyeti",
      description: "Besin intoleransı, şişkinlik ve yeme bozukluklarında zihinsel ve fiziksel arınma yöntemleri."
    },
    {
      icon: Zap,
      title: "7/24 Kesintisiz Online Diyet",
      description: "Mobil/web uyumlu panelimizden diyet listenize erişin, anlık menü değişiklik taleplerinizi iletin."
    }
  ];

  return (
    <section id="services" className="py-20 relative bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Klinik Hizmetlerimiz ve Hedeflerimiz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Sağlığınıza Özel <span className="gradient-text-emerald">Bütüncül Çözümler</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal">
            Geleneksel diyet kalıplarını unutun. Bilimsel veriler ve kişisel yaşam tarzınız doğrultusunda şekillenen modern beslenme modelleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-emerald-100 hover:border-emerald-400 transition-all duration-300 group hover:-translate-y-2 shadow-md hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 p-0.5 shadow-md shadow-emerald-600/20 mb-6 group-hover:scale-110 transition-transform">
                <div className="w-full h-full bg-emerald-600 rounded-[14px] flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                {service.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {service.description}
              </p>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                <span>Program Detayları</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
