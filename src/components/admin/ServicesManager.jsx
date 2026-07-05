import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Target, Plus, Trash2, Edit3, Save, Check, DollarSign, ListCheck } from 'lucide-react';

export default function ServicesManager() {
  const { services, setServices } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    features: ['Haftalık Takip', 'Diyet Listesi']
  });

  const handleStartEdit = (service) => {
    setEditingId(service.id);
    setEditForm({ ...service, featuresStr: (service.features || []).join('\n') });
  };

  const handleSaveEdit = (id) => {
    const featuresArr = editForm.featuresStr ? editForm.featuresStr.split('\n').filter(Boolean) : editForm.features;
    setServices(prev => prev.map(s => s.id === id ? { ...editForm, features: featuresArr } : s));
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu hizmet paketini silmek istediğinize emin misiniz?")) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = `srv-${Date.now()}`;
    const newObj = {
      id: newId,
      icon: "Target",
      title: newService.title,
      description: newService.description,
      price: newService.price || "2.500 ₺ / Ay",
      features: newService.features
    };
    setServices(prev => [...prev, newObj]);
    setIsAddOpen(false);
    setNewService({ title: '', description: '', price: '', features: ['Haftalık Takip', 'Diyet Listesi'] });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-600" />
            <span>Hizmetler & Paket Fiyatlandırma Yönetimi</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">Anasayfadaki hizmet paketlerini, fiyatları ve paket özelliklerini düzenleyin</p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="gradient-btn-emerald px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Hizmet Paketi Ekle</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div key={srv.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm relative flex flex-col justify-between space-y-4">
            {editingId === srv.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold"
                  placeholder="Hizmet Başlığı"
                />
                <textarea
                  rows={2}
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs"
                  placeholder="Açıklama"
                />
                <input
                  type="text"
                  value={editForm.price || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-emerald-700"
                  placeholder="Fiyat (örn: 2.500 ₺ / Ay)"
                />
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1">Paket Özellikleri (Her satıra bir özellik)</label>
                  <textarea
                    rows={3}
                    value={editForm.featuresStr}
                    onChange={(e) => setEditForm(prev => ({ ...prev, featuresStr: e.target.value }))}
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    İptal
                  </button>
                  <button
                    onClick={() => handleSaveEdit(srv.id)}
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
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-extrabold text-slate-900">{srv.title}</h3>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-300 shrink-0">
                      {srv.price || "İletişime Geçin"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium mb-3">{srv.description}</p>
                  
                  {srv.features && srv.features.length > 0 && (
                    <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100">
                      {srv.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                  <button
                    onClick={() => handleStartEdit(srv)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Düzenle</span>
                  </button>
                  <button
                    onClick={() => handleDelete(srv.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
            <h3 className="text-lg font-black text-slate-900">Yeni Hizmet Paketi Ekleyin</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Paket Adı</label>
                <input
                  type="text"
                  value={newService.title}
                  onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                  placeholder="örn: Bariatrik Beslenme Paketi"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama</label>
                <textarea
                  rows={2}
                  value={newService.description}
                  onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  placeholder="Paket detaylı açıklaması"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Paket Fiyatı</label>
                <input
                  type="text"
                  value={newService.price}
                  onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-emerald-800"
                  placeholder="3.500 ₺ / Ay"
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
                  Paketi Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
