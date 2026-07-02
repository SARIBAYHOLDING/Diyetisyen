import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Stethoscope, Star, Award, Calendar, Users } from 'lucide-react';

export default function DietitiansSection({ onOpenAuth }) {
  const { dietitians } = useAuth();

  return (
    <section id="dietitians" className="py-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 mb-3">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Uzman Kadromuz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Alanında Uzman <span className="gradient-text-emerald">Klinik Diyetisyenlerimiz</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal">
            Her biri akademi mezunu, sertifikalı ve binlerce danışan başarısına imza atmış diyetisyen kadromuzla tanışın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dietitians.map((dyt) => (
            <div
              key={dyt.id}
              className="bg-slate-50 rounded-3xl overflow-hidden border border-emerald-200 hover:border-emerald-400 transition-all duration-300 group flex flex-col justify-between shadow-md hover:shadow-xl"
            >
              <div>
                {/* Image & Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dyt.avatar}
                    alt={dyt.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-amber-600 text-xs font-black flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{dyt.rating}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-black text-white">{dyt.name}</h3>
                    <p className="text-xs text-emerald-300 font-bold">{dyt.title}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {dyt.bio}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-emerald-600" /> Tecrübe:</span>
                      <span className="font-bold text-slate-900">{dyt.experience}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-emerald-600" /> Aktif Danışan:</span>
                      <span className="font-bold text-slate-900">{dyt.clientCount} Kişi</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-200 text-[11px] text-slate-700 shadow-sm">
                    <span className="font-extrabold text-emerald-800 block mb-1">Uzmanlık Alanları:</span>
                    {dyt.speciality}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={onOpenAuth}
                  className="w-full gradient-btn-emerald py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Randevu Al / Panel Girişi</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
