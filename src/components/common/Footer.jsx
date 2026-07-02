import React from 'react';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { Sparkles, Phone, Mail, MapPin, Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-emerald-100 text-slate-700 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                {BRAND_CONFIG.name}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-sm">
              {BRAND_CONFIG.description}
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href={BRAND_CONFIG.social.instagram} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href={BRAND_CONFIG.social.youtube} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href={BRAND_CONFIG.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Hizmetlerimiz */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4">Hizmetlerimiz</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><a href="#calculators" className="hover:text-emerald-600 transition-colors">Vücut Kitle İndeksi</a></li>
              <li><a href="#services" className="hover:text-emerald-600 transition-colors">VIP Online Diyet</a></li>
              <li><a href="#services" className="hover:text-emerald-600 transition-colors">Sporcu Beslenmesi</a></li>
              <li><a href="#services" className="hover:text-emerald-600 transition-colors">Gebelikte Beslenme</a></li>
            </ul>
          </div>

          {/* Col 3: Kurumsal */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4">Kurumsal</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><a href="#hero" className="hover:text-emerald-600 transition-colors">Hakkımızda</a></li>
              <li><a href="#dietitians" className="hover:text-emerald-600 transition-colors">Uzman Kadromuz</a></li>
              <li><a href="#testimonials" className="hover:text-emerald-600 transition-colors">Başarı Hikayeleri</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Gizlilik Sözleşmesi</a></li>
            </ul>
          </div>

          {/* Col 4: İletişim */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4">İletişim</h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-600">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{BRAND_CONFIG.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{BRAND_CONFIG.email}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line with Suda Dynamics attribution */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[11px]">
            <span>⚡ {BRAND_CONFIG.footprint}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
