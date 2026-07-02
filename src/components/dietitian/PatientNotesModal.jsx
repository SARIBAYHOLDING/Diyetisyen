import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, FileText, Save, Lock, HeartPulse } from 'lucide-react';

export default function PatientNotesModal({ isOpen, onClose, client }) {
  const { updateClientClinicalNotes } = useAuth();
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (client) {
      setNotes(client.clinicalNotes || '');
    }
  }, [client]);

  if (!isOpen || !client) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateClientClinicalNotes(client.id, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-teal-500/30 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 mb-3 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
            <FileText className="w-6 h-6 text-teal-300" />
          </div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            Klinik Hasta Notları: {client.name}
          </h3>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
            <Lock className="w-3 h-3 text-emerald-400" />
            Bu notlar sadece diyetisyen gözlemine özeldir, danışan göremez.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Tahlil Bulguları, Alerjiler ve Klinik İlerleme Notu
            </label>
            <textarea
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Danışana ait insülin, tiroid, B12 tahlil detaylarını ve özel besin hassasiyetlerini buraya yazabilirsiniz..."
              className="w-full p-3.5 rounded-xl glass-input text-xs text-slate-200 leading-relaxed"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full gradient-btn-emerald py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Notları Gizli Olarak Kaydet</span>
          </button>
        </form>
      </div>
    </div>
  );
}
