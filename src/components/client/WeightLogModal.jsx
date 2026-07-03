import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Scale, Activity, Calendar, X, Check } from 'lucide-react';

export default function WeightLogModal({ isOpen, onClose, clientId }) {
  const { addWeightLog } = useAuth();
  const [weight, setWeight] = useState('');
  const [fat, setFat] = useState('');
  const [dateLabel, setDateLabel] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weight) return;

    addWeightLog(clientId, weight, fat || 25, dateLabel);
    setWeight('');
    setFat('');
    setDateLabel('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-white space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Yeni Kilo & Ölçüm Kaydı</h2>
            <p className="text-xs text-slate-400">Güncel kilo ve vücut yağ oranınızı kaydedin</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>Yeni Kilo (kg) *</span>
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="Örn: 70.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-white text-sm font-medium focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              <span>Vücut Yağ Oranı (%) (Opsiyonel)</span>
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="Örn: 25.4"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-white text-sm font-medium focus:border-teal-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Etiket / Dönem (Opsiyonel)</span>
            </label>
            <input
              type="text"
              placeholder="Örn: 5. Hafta veya 4 Temmuz"
              value={dateLabel}
              onChange={(e) => setDateLabel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-white text-sm font-medium focus:border-indigo-400 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-white/5"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 gradient-btn-emerald py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg"
            >
              <Check className="w-4 h-4" />
              <span>Kaydet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
