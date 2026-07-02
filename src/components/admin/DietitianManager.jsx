import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { Stethoscope, Plus, Edit3, Trash2, Save, X, Award, Users, Star } from 'lucide-react';

export default function DietitianManager() {
  const { dietitians, addDietitian, updateDietitian, deleteDietitian } = useAuth();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingDietitian, setEditingDietitian] = useState(null);

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('5 Yıl');
  const [speciality, setSpeciality] = useState('Kilo Yönetimi, Sporcu Beslenmesi');
  const [bio, setBio] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    addDietitian({ name, title, experience, speciality, bio });
    setIsAddOpen(false);
    setName(''); setTitle(''); setBio('');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingDietitian) return;
    updateDietitian(editingDietitian.id, { name, title, experience, speciality, bio });
    setEditingDietitian(null);
  };

  const startEdit = (dyt) => {
    setEditingDietitian(dyt);
    setName(dyt.name);
    setTitle(dyt.title);
    setExperience(dyt.experience);
    setSpeciality(dyt.speciality);
    setBio(dyt.bio);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-600" />
            <span>Diyetisyen & Personel Yönetim Paneli</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Kurumda görev alan uzman diyetisyen kadrosunu yönetin</p>
        </div>

        <button
          onClick={() => {
            setName(''); setTitle(''); setBio('');
            setIsAddOpen(true);
          }}
          className="gradient-btn-emerald px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Diyetisyen Ekle</span>
        </button>
      </div>

      {/* Dietitians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dietitians.map((dyt) => (
          <div
            key={dyt.id}
            className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={dyt.avatar}
                  alt={dyt.name}
                  className="w-12 h-12 rounded-xl object-cover border border-emerald-300"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{dyt.name}</h4>
                  <p className="text-[11px] text-emerald-700 font-bold">{dyt.title}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">{dyt.bio}</p>

              <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Tecrübe:</span>
                  <strong className="text-slate-900">{dyt.experience}</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Aktif Danışan:</span>
                  <strong className="text-emerald-700">{dyt.clientCount} Kişi</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => startEdit(dyt)}
                className="flex-1 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 text-xs font-bold flex items-center justify-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Düzenle</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`${dyt.name} uzmanını sistemden silmek istediğinize emin misiniz?`)) {
                    deleteDietitian(dyt.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-bold"
                title="Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isAddOpen || editingDietitian) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-emerald-200 shadow-2xl">
            <button
              onClick={() => { setIsAddOpen(false); setEditingDietitian(null); }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-4">
              {editingDietitian ? `${editingDietitian.name} Düzenle` : "Yeni Diyetisyen Ekle"}
            </h3>

            <form onSubmit={editingDietitian ? handleUpdate : handleAdd} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ad Soyad</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dyt. Neslihan Yıldız"
                  required
                  className="w-full p-2.5 rounded-xl glass-input text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Unvan</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Klinik Beslenme & Diyetetik Uzmanı"
                  required
                  className="w-full p-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tecrübe</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="7 Yıl"
                  required
                  className="w-full p-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Uzmanlık Alanları</label>
                <input
                  type="text"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  placeholder="Ketojenik Diyet, Diyabet, PCOS"
                  required
                  className="w-full p-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Biyografi & Özgeçmiş</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Üniversite mezuniyeti ve akademik geçmiş bilgisi..."
                  required
                  className="w-full p-2.5 rounded-xl glass-input text-xs font-medium"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full gradient-btn-emerald py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{editingDietitian ? "Değişiklikleri Kaydet" : "Diyetisyeni Sisteme Ekle"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-100">
        ⚡ {BRAND_CONFIG.footprint}
      </div>
    </div>
  );
}
