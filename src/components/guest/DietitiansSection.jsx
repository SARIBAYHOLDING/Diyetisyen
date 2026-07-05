import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Stethoscope, Star, Award, Calendar, Users, MapPin, CheckCircle2, MessageCircle, Camera } from 'lucide-react';

export default function DietitiansSection({ onOpenAuth }) {
  const { dietitians, siteSections, brandConfig } = useAuth();

  const sectionTitle = siteSections?.dietitiansTitle || "Kurucu & Kıdemli Diyetisyenimiz";
  const sectionSubtitle = siteSections?.dietitiansSubtitle || "Hacettepe Üniversitesi mezunu, sertifikalı ve 2000'den fazla danışan başarısına imza atmış Dyt. Ceren Çetinkaya ile tanışın.";

  const leadDietitian = dietitians?.[0] || {
    id: "dyt-1",
    name: "Dyt. Ceren Çetinkaya",
    title: "Klinik Beslenme & Kilo Yönetimi Uzmanı (Kurucu)",
    avatar: "/ceren_cetinkaya.jpg",
    experience: "9 Yıl",
    speciality: "Kilo Takibi & Yönetimi, Polikistik Over, Diyabet Beslenmesi, Metabolic Balance",
    clientCount: 154,
    rating: 5.0,
    bio: "Hacettepe Üniversitesi Beslenme ve Diyetetik mezunu. Projenin sahibi ve tek uzmanı olarak 2000'den fazla danışanına kişiselleştirilmiş kilo takip ve sürdürülebilir beslenme danışmanlığı verdi."
  };

  return (
    <section id="dietitians" className="py-20 relative bg-gradient-to-b from-slate-50 via-white to-emerald-50/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-extrabold border border-emerald-300 mb-3 shadow-xs">
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            <span>Klinik Kurucusu & Uzman Kadro</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {sectionTitle.includes('Diyetisyen') ? (
              <>
                {sectionTitle.replace('Diyetisyenimiz', '').replace('Diyetisyenlerimiz', '')} <span className="gradient-text-emerald">Diyetisyenimiz</span>
              </>
            ) : (
              <span className="gradient-text-emerald">{sectionTitle}</span>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium max-w-2xl mx-auto leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* Centered Showcase Card Container */}
        <div className="flex justify-center">
          <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden border-2 border-emerald-200/90 shadow-2xl hover:border-emerald-400 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 group">
            
            {/* Left Side: Large Portrait Image */}
            <div className="md:col-span-5 relative min-h-[340px] md:min-h-[440px] overflow-hidden bg-slate-900">
              <img
                src={leadDietitian.avatar || "/ceren_cetinkaya.jpg"}
                alt={leadDietitian.name}
                className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

              {/* Top Rating Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-amber-600 text-xs font-black flex items-center gap-1.5 shadow-md">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{leadDietitian.rating} (Harika)</span>
              </div>

              {/* Bottom Image Overlay Details */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-black tracking-wide">
                  <CheckCircle2 className="w-3 h-3" />
                  Hacettepe Üni. Diplomaları Onaylı
                </span>
                <h3 className="text-2xl font-black text-white">{leadDietitian.name}</h3>
                <p className="text-xs text-emerald-300 font-bold">{leadDietitian.title}</p>
              </div>
            </div>

            {/* Right Side: Info & Actions */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                {/* Header Tagline & Location */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{brandConfig.address || "Barbaros, 33150 Yenişehir/Mersin"}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-extrabold border border-emerald-200">
                    Birebir Kilo Takip Uzmanı
                  </span>
                </div>

                {/* Bio Paragraph */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {leadDietitian.bio}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block">Klinik Tecrübe</span>
                      <span className="text-xs font-black text-slate-900">{leadDietitian.experience}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block">Aktif Danışan</span>
                      <span className="text-xs font-black text-slate-900">{leadDietitian.clientCount} Kişi</span>
                    </div>
                  </div>
                </div>

                {/* Specialities Box */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-700">
                  <span className="font-extrabold text-emerald-800 block mb-1">Uzmanlık Alanları & Protokolleri:</span>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                    {leadDietitian.speciality}
                  </p>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="https://instagram.com/uzm.dyt.cerencetinkaya"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:opacity-90 transition-opacity"
                  >
                    <Camera className="w-4 h-4" />
                    <span>@uzm.dyt.cerencetinkaya</span>
                  </a>

                  <a
                    href="https://wa.me/905454726440"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:bg-emerald-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>0545 472 64 40</span>
                  </a>
                </div>

                <button
                  onClick={onOpenAuth}
                  className="w-full gradient-btn-emerald py-3.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Dyt. Ceren Çetinkaya ile Randevu Al / Panel Girişi</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
