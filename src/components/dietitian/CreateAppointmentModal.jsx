import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, User, Video, X, Check } from 'lucide-react';

export default function CreateAppointmentModal({ isOpen, onClose }) {
  const { clients, dietitians, addAppointment } = useAuth();
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedDietitianId, setSelectedDietitianId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00');
  const [type, setType] = useState('Görüntülü Online Görüşme');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientObj = clients.find(c => c.id === selectedClientId) || clients[0];
    const dietitianObj = dietitians.find(d => d.id === selectedDietitianId) || dietitians[0];

    addAppointment({
      clientId: clientObj.id,
      clientName: clientObj.name,
      dietitianId: dietitianObj.id,
      dietitianName: dietitianObj.name,
      date: date || new Date().toISOString().split('T')[0],
      time: time,
      type: type
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-slate-900 space-y-6 relative border border-emerald-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Yeni Randevu Oluştur</h2>
            <p className="text-xs text-slate-500">Danışan görüşmesi için zaman planlayın</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Danışan Seçin *</span>
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">Seçiniz...</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.package})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sorumlu Diyetisyen *</span>
            </label>
            <select
              value={selectedDietitianId}
              onChange={(e) => setSelectedDietitianId(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">Seçiniz...</option>
              {dietitians.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tarih *</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saat *</span>
              </label>
              <input
                type="text"
                placeholder="11:00"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-emerald-600" />
              <span>Görüşme Tipi</span>
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="Görüntülü Online Görüşme">Görüntülü Online Görüşme</option>
              <option value="Klinik Yüz Yüze Görüşme">Klinik Yüz Yüze Görüşme</option>
              <option value="Telefon Kontrol Görüşmesi">Telefon Kontrol Görüşmesi</option>
            </select>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 gradient-btn-emerald py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg"
            >
              <Check className="w-4 h-4" />
              <span>Randevu Oluştur</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
