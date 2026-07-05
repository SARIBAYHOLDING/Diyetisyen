import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Award, Plus, Trash2, Edit3, Save, Star, CheckCircle, Quote } from 'lucide-react';

export default function TestimonialsManager() {
  const { testimonials, setTestimonials } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    age: 30,
    job: '',
    loss: '-12.0 kg',
    period: '2 Ayda',
    dietitian: 'Dyt. Ceren Çetinkaya',
    comment: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5
  });

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSaveEdit = (id) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...editForm } : t));
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu başarı hikayesini silmek istediğinize emin misiniz?")) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newObj = {
      id: Date.now(),
      ...newItem
    };
    setTestimonials(prev => [newObj, ...prev]);
    setIsAddOpen(false);
    setNewItem({
      name: '',
      age: 30,
      job: '',
      loss: '-12.0 kg',
      period: '2 Ayda',
      dietitian: 'Dyt. Ceren Çetinkaya',
      comment: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: 5
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-600" />
            <span>Başarı Hikayeleri & Danışan Yorumları</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">Anasayfadaki başarı dönüşümlerini, kg kayıplarını ve danışan yorumlarını yönetin</p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="gradient-btn-emerald px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Başarı Hikayesi Ekle</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            {editingId === item.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold"
                  placeholder="Danışan Ad Soyad"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={editForm.job}
                    onChange={(e) => setEditForm(prev => ({ ...prev, job: e.target.value }))}
                    className="p-2 rounded-lg border border-slate-300 text-xs"
                    placeholder="Meslek"
                  />
                  <input
                    type="number"
                    value={editForm.age}
                    onChange={(e) => setEditForm(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    className="p-2 rounded-lg border border-slate-300 text-xs"
                    placeholder="Yaş"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={editForm.loss}
                    onChange={(e) => setEditForm(prev => ({ ...prev, loss: e.target.value }))}
                    className="p-2 rounded-lg border border-slate-300 text-xs font-bold text-emerald-700"
                    placeholder="örn: -15.5 kg"
                  />
                  <input
                    type="text"
                    value={editForm.period}
                    onChange={(e) => setEditForm(prev => ({ ...prev, period: e.target.value }))}
                    className="p-2 rounded-lg border border-slate-300 text-xs"
                    placeholder="örn: 3 Ayda"
                  />
                </div>
                <input
                  type="text"
                  value={editForm.dietitian}
                  onChange={(e) => setEditForm(prev => ({ ...prev, dietitian: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs"
                  placeholder="Diyetisyen Adı"
                />
                <textarea
                  rows={3}
                  value={editForm.comment}
                  onChange={(e) => setEditForm(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs"
                  placeholder="Yorum metni"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    İptal
                  </button>
                  <button
                    onClick={() => handleSaveEdit(item.id)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Kaydet</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-xl object-cover border border-emerald-300"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                          {item.name}
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium">{item.job}, {item.age} Yaş</p>
                      </div>
                    </div>

                    <div className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-right">
                      <span className="text-xs font-black block">{item.loss}</span>
                      <span className="text-[9px] text-slate-600 font-medium">{item.period}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-100">
                    "{item.comment}"
                  </p>

                  <div className="mt-2 text-[10px] text-slate-500 font-bold flex justify-between items-center">
                    <span>Diyetisyen: <strong className="text-emerald-700">{item.dietitian}</strong></span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Düzenle</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Sil</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-emerald-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Yeni Başarı Hikayesi Ekle</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Danışan Adı</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                  placeholder="örn: Zeynep Arslan"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meslek</label>
                  <input
                    type="text"
                    value={newItem.job}
                    onChange={(e) => setNewItem(prev => ({ ...prev, job: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    placeholder="Mimar"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Yaş</label>
                  <input
                    type="number"
                    value={newItem.age}
                    onChange={(e) => setNewItem(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kilo Kaybı</label>
                  <input
                    type="text"
                    value={newItem.loss}
                    onChange={(e) => setNewItem(prev => ({ ...prev, loss: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-emerald-800"
                    placeholder="-14 kg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Süre</label>
                  <input
                    type="text"
                    value={newItem.period}
                    onChange={(e) => setNewItem(prev => ({ ...prev, period: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    placeholder="3 Ayda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Takip Eden Diyetisyen</label>
                <input
                  type="text"
                  value={newItem.dietitian}
                  onChange={(e) => setNewItem(prev => ({ ...prev, dietitian: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Danışan Yorumu</label>
                <textarea
                  rows={3}
                  value={newItem.comment}
                  onChange={(e) => setNewItem(prev => ({ ...prev, comment: e.target.value }))}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  placeholder="Diyet deneyimi açıklaması..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="gradient-btn-emerald px-5 py-2 rounded-xl text-xs font-extrabold"
                >
                  Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
