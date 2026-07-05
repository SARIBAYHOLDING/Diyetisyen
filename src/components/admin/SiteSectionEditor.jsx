import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileText, Save, Check, Sparkles, Layout, HelpCircle, Target, Award, Stethoscope } from 'lucide-react';

export default function SiteSectionEditor() {
  const { siteSections, setSiteSections } = useAuth();
  const [formData, setFormData] = useState({ ...siteSections });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChecklistChange = (idx, value) => {
    setFormData(prev => {
      const updated = [...(prev.heroChecklist || [])];
      updated[idx] = value;
      return { ...prev, heroChecklist: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSiteSections(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Layout className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Sistem Detay & Bölüm Metinleri Düzenleyici</h2>
            <p className="text-xs text-slate-500 font-medium">Sitedeki tüm bölüm başlıklarını, alt açıklamaları ve maddeleri en ince detayına kadar canlı değiştirin</p>
          </div>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md animate-fade-in">
            <Check className="w-4 h-4" />
            <span>Tüm Metinler Güncellendi!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Hero Karşılama Alanı */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>1. Hero Karşılama Bölümü Metinleri</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Hero Üst Rozet Metni</label>
              <input
                type="text"
                value={formData.heroBadge || ''}
                onChange={(e) => handleChange('heroBadge', e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-emerald-900 bg-emerald-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ana Başlık (1. Satır)</label>
              <input
                type="text"
                value={formData.heroTitleLine1 || ''}
                onChange={(e) => handleChange('heroTitleLine1', e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-extrabold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Vurgulu Yeşil Başlık (2. Satır)</label>
              <input
                type="text"
                value={formData.heroTitleLine2 || ''}
                onChange={(e) => handleChange('heroTitleLine2', e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-extrabold text-emerald-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Hero Özellik Maddeleri (Checklist)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(formData.heroChecklist || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">{idx + 1}.</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleChecklistChange(idx, e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Diğer Bölüm Başlıkları */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Target className="w-4 h-4 text-emerald-600" />
            <span>2. Sayfa İçi Bölüm Başlıkları & Açıklamaları</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Calculators */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-extrabold text-slate-900">Hesaplayıcılar Bölüm Başlığı</label>
              <input
                type="text"
                value={formData.calculatorsTitle || ''}
                onChange={(e) => handleChange('calculatorsTitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold"
              />
              <label className="block text-[11px] font-bold text-slate-600">Alt Açıklaması</label>
              <textarea
                rows={2}
                value={formData.calculatorsSubtitle || ''}
                onChange={(e) => handleChange('calculatorsSubtitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-normal"
              />
            </div>

            {/* Services */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-extrabold text-slate-900">Hizmetlerimiz Bölüm Başlığı</label>
              <input
                type="text"
                value={formData.servicesTitle || ''}
                onChange={(e) => handleChange('servicesTitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold"
              />
              <label className="block text-[11px] font-bold text-slate-600">Alt Açıklaması</label>
              <textarea
                rows={2}
                value={formData.servicesSubtitle || ''}
                onChange={(e) => handleChange('servicesSubtitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-normal"
              />
            </div>

            {/* Dietitians */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-extrabold text-slate-900">Diyetisyen Kadromuz Bölüm Başlığı</label>
              <input
                type="text"
                value={formData.dietitiansTitle || ''}
                onChange={(e) => handleChange('dietitiansTitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold"
              />
              <label className="block text-[11px] font-bold text-slate-600">Alt Açıklaması</label>
              <textarea
                rows={2}
                value={formData.dietitiansSubtitle || ''}
                onChange={(e) => handleChange('dietitiansSubtitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-normal"
              />
            </div>

            {/* Testimonials */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-extrabold text-slate-900">Başarı Hikayeleri Bölüm Başlığı</label>
              <input
                type="text"
                value={formData.testimonialsTitle || ''}
                onChange={(e) => handleChange('testimonialsTitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold"
              />
              <label className="block text-[11px] font-bold text-slate-600">Alt Açıklaması</label>
              <textarea
                rows={2}
                value={formData.testimonialsSubtitle || ''}
                onChange={(e) => handleChange('testimonialsSubtitle', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-normal"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="gradient-btn-emerald px-6 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Tüm Bölüm Metinlerini Kaydet</span>
          </button>
        </div>
      </form>
    </div>
  );
}
