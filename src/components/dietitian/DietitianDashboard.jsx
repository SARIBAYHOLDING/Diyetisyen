import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DietBuilderModal from './DietBuilderModal';
import PatientNotesModal from './PatientNotesModal';
import StickyNotes from './StickyNotes';
import CreateClientModal from '../common/CreateClientModal';
import { exportToExcel } from '../../utils/exportHelpers';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { Stethoscope, Users, Calendar, FileText, Utensils, Search, UserPlus, Download, CheckCircle, Clock } from 'lucide-react';

export default function DietitianDashboard() {
  const { clients, appointments, currentUser, changeRequests, updateChangeRequestStatus } = useAuth();
  const [activeTab, setActiveTab] = useState('clients');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.package.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportClientsExcel = () => {
    const exportData = clients.map(c => ({
      "Danışan Adı": c.name,
      "E-posta": c.email,
      "Telefon": c.phone,
      "Paket": c.package,
      "Başlangıç Kilosu": c.startWeight,
      "Mevcut Kilo": c.currentWeight,
      "Hedef Kilo": c.targetWeight,
      "Sorumlu Diyetisyen": c.assignedDietitianName,
      "Durum": c.status
    }));
    exportToExcel(exportData, "Danisanlar_Listesi", "Danışan Müşteri Listesi");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Dietitian Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1594824813566-82823d5afe9a?w=200&auto=format&fit=crop&q=80"}
            alt={currentUser?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
          />
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              Hoş Geldiniz, {currentUser?.name || "Dyt. Zeynep Kaya"} 🩺
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {currentUser?.title || "Klinik Beslenme Uzmanı"} • <strong className="text-emerald-700">{clients.length} Atanmış Danışan</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsCreateClientOpen(true)}
            className="gradient-btn-emerald px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md"
          >
            <UserPlus className="w-4 h-4" />
            <span>Yeni Danışan Hesabı Oluştur</span>
          </button>

          <button
            onClick={handleExportClientsExcel}
            className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Excel İndir</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('clients')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'clients' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Danışanlarım ({clients.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'requests' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Diyet Değişiklik Talepleri ({changeRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('sticky')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'sticky' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Özel Notlarım & Scratchpad
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'appointments' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Randevu Takip Paneli ({appointments.length})
        </button>
      </div>

      {/* 1. CLIENTS LIST TAB */}
      {activeTab === 'clients' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Danışan adı veya paket ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs font-medium"
              />
            </div>

            <button
              onClick={() => setIsCreateClientOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-200 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Danışan Ekle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClients.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-emerald-300"
                      />
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">{c.package}</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                      {c.status}
                    </span>
                  </div>

                  {/* Body stats */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center mb-4">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block">Başlangıç</span>
                      <span className="text-xs font-black text-slate-700">{c.startWeight} kg</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block">Mevcut</span>
                      <span className="text-xs font-black text-emerald-700">{c.currentWeight} kg</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block">Hedef</span>
                      <span className="text-xs font-black text-emerald-800">{c.targetWeight} kg</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedClient(c);
                      setIsBuilderOpen(true);
                    }}
                    className="py-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Diyetini Düzenle</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedClient(c);
                      setIsNotesOpen(true);
                    }}
                    className="py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Klinik Notlar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. CHANGE REQUESTS TAB */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
          <h3 className="text-base font-bold text-slate-900 mb-2">Danışan Diyet Değişiklik Talepleri</h3>
          
          <div className="space-y-4">
            {changeRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-900">{req.clientName}</span>
                    <span className="text-xs text-slate-500">({req.mealName})</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    req.status === 'Onaylandı' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <p className="text-xs text-slate-700 font-medium">
                  <strong className="text-emerald-800">İstenen Değişiklik:</strong> {req.requestedChange}
                </p>

                {req.status === 'Beklemede' && (
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => updateChangeRequestStatus(req.id, 'Onaylandı', 'Değişiklik onaylanmıştır, afiyet olsun!')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() => updateChangeRequestStatus(req.id, 'Revize Edildi', 'Lütfen tavuk yerine ızgara köfte seçiniz.')}
                      className="px-4 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold hover:bg-amber-100"
                    >
                      Revize Gönder
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. STICKY NOTES TAB */}
      {activeTab === 'sticky' && <StickyNotes />}

      {/* 4. APPOINTMENTS TAB */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
          <h3 className="text-base font-bold text-slate-900 mb-2">Randevu Takip Ekranı</h3>
          <div className="space-y-3">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{apt.clientName}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{apt.date} - {apt.time} ({apt.type})</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footprint Badge */}
      <div className="text-center text-[11px] text-slate-400 pt-4">
        ⚡ {BRAND_CONFIG.footprint} - Klinik Diyetisyen Yönetim Portalı
      </div>

      {/* Modals */}
      <DietBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        client={selectedClient}
      />

      <PatientNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        client={selectedClient}
      />

      <CreateClientModal
        isOpen={isCreateClientOpen}
        onClose={() => setIsCreateClientOpen(false)}
      />
    </div>
  );
}
