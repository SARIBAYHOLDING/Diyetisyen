import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DietPlanView from './DietPlanView';
import HydrationTracker from './HydrationTracker';
import DietChangeRequestModal from './DietChangeRequestModal';
import WeightLogModal from './WeightLogModal';
import ClientMessageModal from './ClientMessageModal';
import { Scale, Activity, Calendar, MessageSquare, Plus, Award } from 'lucide-react';

export default function ClientDashboard() {
  const { currentUser, clients } = useAuth();
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' | 'progress'
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Retrieve latest client object from Context to sync live state updates
  const activeClientId = currentUser?.id || "c-101";
  const client = clients.find(c => c.id === activeClientId) || currentUser || {
    id: "c-101",
    name: "Ahsen Yılmaz",
    assignedDietitianName: "Dyt. Zeynep Kaya",
    package: "3 Aylık VIP Online Diyet",
    startWeight: 78.5,
    currentWeight: 71.2,
    targetWeight: 63.0,
    bodyFatPercent: 26.4,
    waterIntakeGoal: 2500,
    waterIntakeCurrent: 1750,
    weightHistory: [
      { date: '1. Hafta', weight: 78.5, fat: 29.2 },
      { date: '2. Hafta', weight: 76.2, fat: 28.0 },
      { date: '3. Hafta', weight: 74.0, fat: 27.1 },
      { date: '4. Hafta', weight: 71.2, fat: 26.4 }
    ]
  };

  const history = client.weightHistory || [
    { date: 'Başlangıç', weight: client.startWeight, fat: client.bodyFatPercent + 2 },
    { date: 'Mevcut', weight: client.currentWeight, fat: client.bodyFatPercent }
  ];

  const weightLost = (client.startWeight - client.currentWeight).toFixed(1);
  const remainingWeight = (client.currentWeight - client.targetWeight).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Client Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={client.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
            alt={client.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400/50 shadow-lg"
          />
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              Hoş Geldiniz, {client.name} 👋
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Paket: <strong className="text-emerald-400">{client.package}</strong> • Diyetisyen: <strong className="text-teal-300">{client.assignedDietitianName}</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsWeightModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold flex items-center gap-2 border border-white/10 shadow-md transition-all"
          >
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Kilo Kaydı Ekle</span>
          </button>

          <button
            onClick={() => setIsChangeModalOpen(true)}
            className="gradient-btn-emerald px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Değişiklik Talebi İlet</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel rounded-2xl p-5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold">Mevcut Kilo</span>
            <p className="text-2xl font-black text-white mt-1">{client.currentWeight} <span className="text-xs text-slate-400">kg</span></p>
            <p className="text-[11px] text-emerald-400 font-medium mt-0.5">Başlangıç: {client.startWeight} kg</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <Scale className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold">Verilen Kilo</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">-{weightLost} <span className="text-xs text-emerald-300">kg</span></p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Hedefe Kalan: {remainingWeight} kg</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <Award className="w-6 h-6 text-amber-400" />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold">Vücut Yağ Oranı</span>
            <p className="text-2xl font-black text-teal-300 mt-1">%{client.bodyFatPercent}</p>
            <p className="text-[11px] text-emerald-400 font-medium mt-0.5">Düzenli Takip Ediliyor</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
            <Activity className="w-6 h-6 text-teal-300" />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold">Sonraki Görüşme</span>
            <p className="text-sm font-bold text-white mt-1">4 Temmuz 11:00</p>
            <p className="text-[11px] text-indigo-400 font-medium mt-0.5">Online Görüntülü</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-indigo-300" />
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Main View (Diet Plan or Progress) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Navigation Sub-tabs */}
          <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('plan')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'plan' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Diyet Programım & Talepler
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'progress' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kilo & Yağ Gelişim Grafiği
            </button>
          </div>

          {activeTab === 'plan' ? (
            <DietPlanView
              client={client}
              onRequestChange={() => setIsChangeModalOpen(true)}
            />
          ) : (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Canlı Kilo & Yağ Oranı Gelişimi</h3>
                  <p className="text-xs text-slate-400">Girdiğiniz kayıtlara göre anlık güncellenen gelişim tablosu</p>
                </div>
                <button
                  onClick={() => setIsWeightModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-500/30 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ölçüm Ekle</span>
                </button>
              </div>
              
              {/* Dynamic Graphical Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-4 border-b border-white/10 px-4 overflow-x-auto">
                {history.map((item, idx) => (
                  <div key={idx} className="flex-1 min-w-[60px] flex flex-col items-center gap-2 h-full justify-end">
                    <div className="w-full flex justify-center gap-1.5 items-end h-full">
                      {/* Weight bar */}
                      <div
                        className="w-7 rounded-t-xl bg-gradient-to-t from-emerald-600 to-emerald-400 text-[10px] font-bold text-slate-950 flex items-center justify-center pt-2 transition-all hover:brightness-110 shadow-sm"
                        style={{ height: `${Math.min(100, Math.max(20, (parseFloat(item.weight) / 100) * 100))}%` }}
                      >
                        {item.weight}
                      </div>
                      {/* Fat % bar */}
                      <div
                        className="w-7 rounded-t-xl bg-gradient-to-t from-teal-600 to-teal-400 text-[10px] font-bold text-slate-950 flex items-center justify-center pt-2 transition-all hover:brightness-110 shadow-sm"
                        style={{ height: `${Math.min(100, Math.max(15, (parseFloat(item.fat) / 45) * 100))}%` }}
                      >
                        %{item.fat}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold truncate max-w-full">{item.date}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-6 text-xs font-bold text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span> Kilo (kg)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-teal-400"></span> Yağ Oranı (%)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Hydration Tracker */}
          <HydrationTracker client={client} />

          {/* Assigned Dietitian Card */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Atanmış Diyetisyeniniz</h3>
            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-900/80 border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1594824813566-82823d5afe9a?w=120&auto=format&fit=crop&q=80"
                alt="Dyt. Zeynep Kaya"
                className="w-12 h-12 rounded-xl object-cover border border-emerald-400/40"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{client.assignedDietitianName || "Dyt. Zeynep Kaya"}</h4>
                <p className="text-[10px] text-emerald-400 font-medium">Klinik Beslenme Uzmanı</p>
              </div>
            </div>

            <button
              onClick={() => setIsMessageModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-2 border border-white/5 transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direkt Mesaj Gönder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DietChangeRequestModal
        isOpen={isChangeModalOpen}
        onClose={() => setIsChangeModalOpen(false)}
        client={client}
      />

      <WeightLogModal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        clientId={client.id}
      />

      <ClientMessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        client={client}
      />
    </div>
  );
}
