import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ClientTrackingTable from './ClientTrackingTable';
import PaymentTracker from './PaymentTracker';
import MotivationManager from './MotivationManager';
import DietitianManager from './DietitianManager';
import BrandSettingsManager from './BrandSettingsManager';
import ServicesManager from './ServicesManager';
import TestimonialsManager from './TestimonialsManager';
import DietPlanMasterEditor from './DietPlanMasterEditor';
import SiteSectionEditor from './SiteSectionEditor';
import CreateClientModal from '../common/CreateClientModal';
import {
  ShieldCheck, Users, CreditCard, Sparkles, Stethoscope, UserPlus,
  Settings, Target, Award, Utensils, RotateCcw, Download, Upload,
  TrendingUp, Activity, CheckCircle2, DollarSign, Lock, Layout
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    clients, payments, dietitians, motivationQuotes, services,
    testimonials, currentUser, brandConfig, resetToDefaults
  } = useAuth();

  const [activeTab, setActiveTab] = useState('brand');
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);

  // System KPI Calculations
  const totalRevenue = (payments || []).reduce((sum, p) => p.status === 'Ödendi' ? sum + (parseFloat(p.amount) || 0) : sum, 0);
  const activeClientsCount = (clients || []).filter(c => c.status === 'Aktif').length;
  const averageFatLoss = "-4.8 kg";

  const handleReset = () => {
    if (window.confirm("Dikkat! Tüm veriler ve yaptığınız değişiklikler varsayılan fabrika durumuna sıfırlanacaktır. Devam etmek istediğinize emin misiniz?")) {
      resetToDefaults();
    }
  };

  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      brandConfig: localStorage.getItem('nutrivibe_brandConfig'),
      clients: localStorage.getItem('nutrivibe_clients'),
      services: localStorage.getItem('nutrivibe_services'),
      testimonials: localStorage.getItem('nutrivibe_testimonials'),
      payments: localStorage.getItem('nutrivibe_payments'),
      dietPlans: localStorage.getItem('nutrivibe_dietPlans'),
      motivationQuotes: localStorage.getItem('nutrivibe_motivationQuotes')
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dyt_Ceren_Cetinkaya_Sistem_Yedegi_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.brandConfig) localStorage.setItem('nutrivibe_brandConfig', parsed.brandConfig);
        if (parsed.clients) localStorage.setItem('nutrivibe_clients', parsed.clients);
        if (parsed.services) localStorage.setItem('nutrivibe_services', parsed.services);
        if (parsed.testimonials) localStorage.setItem('nutrivibe_testimonials', parsed.testimonials);
        if (parsed.payments) localStorage.setItem('nutrivibe_payments', parsed.payments);
        if (parsed.dietPlans) localStorage.setItem('nutrivibe_dietPlans', parsed.dietPlans);
        if (parsed.motivationQuotes) localStorage.setItem('nutrivibe_motivationQuotes', parsed.motivationQuotes);

        alert("Sistem yedeği başarıyla yüklendi! Sayfa yenileniyor...");
        window.location.reload();
      } catch (err) {
        alert("Geçersiz yedek dosyası formatı!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src="/ceren_cetinkaya.jpg"
            alt="Dyt. Ceren Çetinkaya"
            className="w-16 h-16 rounded-2xl object-cover object-[center_30%] border-2 border-emerald-500 shadow-md shrink-0"
          />
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              Master Admin Kontrol Paneli ⚡
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Proje Sahibi: <strong className="text-emerald-800 font-extrabold">{brandConfig.name || "Dyt. Ceren Çetinkaya"}</strong> • Ultra Yönetim & Canlı İçerik Sistemi
            </p>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportBackup}
            title="Sistem Yedeğini JSON olarak İndir"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Yedek İndir</span>
          </button>

          <label
            title="Yedek Dosyası Yükle"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Yedek Yükle</span>
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>

          <button
            onClick={handleReset}
            title="Fabrika Ayarlarına Dön"
            className="px-3.5 py-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-red-600" />
            <span className="hidden sm:inline">Fabrika Sıfırlama</span>
          </button>

          <button
            onClick={() => setIsCreateClientOpen(true)}
            className="gradient-btn-emerald px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg"
          >
            <UserPlus className="w-4 h-4" />
            <span>Yeni Danışan Hesabı</span>
          </button>
        </div>
      </div>

      {/* KPI Live Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold">Toplam Ciro Tahsilatı</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalRevenue.toLocaleString('tr-TR')} ₺</p>
            <p className="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Finansal Takip Aktif</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold">Aktif Takipteki Danışan</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">{activeClientsCount} Kişi</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Toplam Danışan: {clients.length}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold">Ortalama Başarı & Kayıp</span>
            <p className="text-2xl font-black text-emerald-800 mt-1">{averageFatLoss}</p>
            <p className="text-[11px] text-emerald-600 font-bold mt-0.5">Danışan Başarı Oranı %99.1</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold">Aktif Hizmet Paketleri</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{(services || []).length} Paket</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Canlı Fiyat Listesi</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <Target className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs (Scrollable Grid) */}
      <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-1.5">
        <button
          onClick={() => setActiveTab('brand')}
          className={`py-3 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'brand' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span className="truncate">Marka Ayarları</span>
        </button>

        <button
          onClick={() => setActiveTab('sections')}
          className={`py-3 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'sections' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layout className="w-4 h-4 shrink-0" />
          <span className="truncate">Metin & Bölüm</span>
        </button>

        <button
          onClick={() => setActiveTab('clients')}
          className={`py-3 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'clients' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 shrink-0" />
          <span className="truncate">Danışanlar ({clients.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('plans')}
          className={`py-3 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'plans' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Utensils className="w-4 h-4 shrink-0" />
          <span className="truncate">Diyet Listeleri</span>
        </button>

        <button
          onClick={() => setActiveTab('dietitians')}
          className={`py-3 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'dietitians' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-4 h-4 shrink-0" />
          <span className="truncate">Kadromuz ({dietitians.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`py-3 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'services' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Target className="w-4 h-4 shrink-0" />
          <span className="truncate">Hizmet & Fiyat</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`py-3 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'payments' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-4 h-4 shrink-0" />
          <span className="truncate">Ödemeler ({payments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('testimonials')}
          className={`py-3 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'testimonials' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4 shrink-0" />
          <span className="truncate">Yorumlar ({testimonials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('motivation')}
          className={`py-3 px-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'motivation' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="truncate">Motivasyon</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="space-y-6">
        {activeTab === 'brand' && <BrandSettingsManager />}

        {activeTab === 'sections' && <SiteSectionEditor />}

        {activeTab === 'clients' && (
          <ClientTrackingTable onOpenCreateClient={() => setIsCreateClientOpen(true)} />
        )}

        {activeTab === 'plans' && <DietPlanMasterEditor />}

        {activeTab === 'dietitians' && <DietitianManager />}

        {activeTab === 'services' && <ServicesManager />}

        {activeTab === 'payments' && <PaymentTracker />}

        {activeTab === 'testimonials' && <TestimonialsManager />}

        {activeTab === 'motivation' && <MotivationManager />}
      </div>

      {/* Suda Dynamics Footprint */}
      <div className="text-center text-[11px] text-slate-400 pt-4">
        ⚡ {brandConfig.footprint || "Powered by Suda Dynamics"} - {brandConfig.engineVersion || "Suda Dynamics v4.8 Engine"}
      </div>

      {/* Create Client Modal */}
      <CreateClientModal
        isOpen={isCreateClientOpen}
        onClose={() => setIsCreateClientOpen(false)}
      />
    </div>
  );
}
