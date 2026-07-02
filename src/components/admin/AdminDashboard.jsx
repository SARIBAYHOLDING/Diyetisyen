import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ClientTrackingTable from './ClientTrackingTable';
import PaymentTracker from './PaymentTracker';
import MotivationManager from './MotivationManager';
import DietitianManager from './DietitianManager';
import CreateClientModal from '../common/CreateClientModal';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { ShieldCheck, Users, CreditCard, Sparkles, Stethoscope, UserPlus } from 'lucide-react';

export default function AdminDashboard() {
  const { clients, payments, dietitians, motivationQuotes, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('clients');
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-700 to-emerald-600 flex items-center justify-center text-white shadow-lg shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              Yönetici Kontrol Paneli ⚡
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {currentUser?.name || "Serkan Sarıbay"} • Kurumsal Genel Takip, Müşteri Hesabı Oluşturma & CRUD Sistemleri
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCreateClientOpen(true)}
          className="gradient-btn-emerald px-5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Yeni Danışan Hesabı Oluştur</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('clients')}
          className={`flex-1 py-3 px-4 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
            activeTab === 'clients' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Müşteri Takip ({clients.length})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('payments')}
          className={`flex-1 py-3 px-4 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
            activeTab === 'payments' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Ödeme & Abonelik ({payments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('dietitians')}
          className={`flex-1 py-3 px-4 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
            activeTab === 'dietitians' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Diyetisyen Kadrosu ({dietitians.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('motivation')}
          className={`flex-1 py-3 px-4 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
            activeTab === 'motivation' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Motivasyon Kütüphanesi ({motivationQuotes.length})</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="space-y-6">
        {activeTab === 'clients' && (
          <ClientTrackingTable onOpenCreateClient={() => setIsCreateClientOpen(true)} />
        )}

        {activeTab === 'payments' && <PaymentTracker />}

        {activeTab === 'dietitians' && <DietitianManager />}

        {activeTab === 'motivation' && <MotivationManager />}
      </div>

      {/* Suda Dynamics Footprint */}
      <div className="text-center text-[11px] text-slate-400 pt-4">
        ⚡ {BRAND_CONFIG.footprint} - {BRAND_CONFIG.engineVersion}
      </div>

      {/* Create Client Modal */}
      <CreateClientModal
        isOpen={isCreateClientOpen}
        onClose={() => setIsCreateClientOpen(false)}
      />
    </div>
  );
}
