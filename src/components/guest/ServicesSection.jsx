import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Target, HeartPulse, Dumbbell, Stethoscope, Sparkles, Zap, Check } from 'lucide-react';

const ICON_MAP = {
  Target,
  HeartPulse,
  Dumbbell,
  Stethoscope,
  Sparkles,
  Zap
};

export default function ServicesSection() {
  const { services } = useAuth();

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
          {(services || []).map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Target;
            return (
              <div
                key={service.id || service.title}
                className="bg-white rounded-3xl p-8 border border-emerald-100 hover:border-emerald-400 transition-all duration-300 group hover:-translate-y-2 shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 shadow-md shadow-emerald-600/20 group-hover:scale-110 transition-transform flex items-center justify-center text-white">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    {service.price && (
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
                        {service.price}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                    {service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span>Program Detayları & Randevu Al</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
