import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Settings, Save, Check, Globe, Phone, Mail, MapPin, Clock, Lock, ShieldCheck, Sparkles } from 'lucide-react';

export default function BrandSettingsManager() {
  const { brandConfig, setBrandConfig } = useAuth();
  const [formData, setFormData] = useState({ ...brandConfig });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBrandConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Marka & Site Genel Ayarları</h2>
            <p className="text-xs text-slate-500 font-medium">Sitede görünen tüm isim, iletişim, istatistik ve güvenlik bilgilerini canlı düzenleyin</p>
          </div>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md animate-fade-in">
            <Check className="w-4 h-4" />
            <span>Ayarlar Güncellendi!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Brand Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Site / Kurum Adı</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Slogan / Alt Başlık</label>
            <input
              type="text"
              value={formData.tagline || ''}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Hakkımızda / Tanıtım Açıklaması</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>İletişim & Konum Bilgileri</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Telefon Numarası</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">E-posta Adresi</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Klinik Adresi</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Çalışma Saatleri</label>
              <input
                type="text"
                value={formData.workingHours || ''}
                onChange={(e) => handleChange('workingHours', e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Security & Password Config */}
        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Yönetici & Personel Şifre Güvenliği</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sistem Varsayılan Giriş Şifresi</label>
              <input
                type="text"
                value={formData.staffDefaultPassword || 'Deneme123'}
                onChange={(e) => handleChange('staffDefaultPassword', e.target.value)}
                className="w-full p-3 rounded-xl border border-emerald-300 bg-emerald-50 text-xs font-bold text-emerald-900 focus:outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1 font-medium">Bu şifre Yönetici & Diyetisyen hızlı girişinde geçerlidir.</p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="gradient-btn-emerald px-6 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Marka Ayarlarını Kaydet</span>
          </button>
        </div>
      </form>
    </div>
  );
}
