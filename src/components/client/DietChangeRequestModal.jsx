import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Send, Utensils, AlertCircle, Sparkles } from 'lucide-react';

export default function DietChangeRequestModal({ isOpen, onClose, client }) {
  const { submitChangeRequest } = useAuth();
  const [mealName, setMealName] = useState('Ara Öğün (16:30)');
  const [currentContent, setCurrentContent] = useState('');
  const [requestedChange, setRequestedChange] = useState('');
  const [reason, setReason] = useState('İş Sebebiyle Değişiklik');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitChangeRequest({
      clientId: client.id,
      clientName: client.name,
      mealName,
      currentContent: currentContent || "Genel Menü Öğünü",
      requestedChange,
      reason
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Utensils className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-white">Diyet Değişiklik Talebi</h3>
          <p className="text-xs text-slate-400 mt-1">
            Diyetisyeniniz <strong className="text-emerald-400">{client?.assignedDietitianName}</strong> tarafına iletilecektir.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Değişiklik İstediğiniz Öğün
            </label>
            <select
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-xs"
            >
              <option value="Kahvaltı (08:30)">Kahvaltı (08:30)</option>
              <option value="Öğle Yemeği (13:00)">Öğle Yemeği (13:00)</option>
              <option value="Ara Öğün (16:30)">Ara Öğün (16:30)</option>
              <option value="Akşam Yemeği (19:30)">Akşam Yemeği (19:30)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Değişiklik Sebebi
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-xs"
            >
              <option value="İş Sebebiyle Değişiklik">İş Sebebiyle Değişiklik</option>
              <option value="Sosyal Etkinlik / Dışarıda Yemek">Sosyal Etkinlik / Dışarıda Yemek</option>
              <option value="Besin İntoleransı / Sevmeme">Besin İntoleransı / Sevmeme</option>
              <option value="Malzeme Temin Edememe">Malzeme Temin Edememe</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              İstediğiniz Alternatif Yiyecek / Açıklama
            </label>
            <textarea
              rows={3}
              value={requestedChange}
              onChange={(e) => setRequestedChange(e.target.value)}
              placeholder="Örn: Bu akşam balık yerine tavuk sote tüketebilir miyim?"
              required
              className="w-full p-3 rounded-xl glass-input text-xs"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full gradient-btn-emerald py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Send className="w-4 h-4" />
            <span>Talebi Diyetisyene Gönder</span>
          </button>
        </form>
      </div>
    </div>
  );
}
