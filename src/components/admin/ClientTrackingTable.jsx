import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { exportToExcel, exportToPdf } from '../../utils/exportHelpers';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { Users, Search, Filter, Calendar, Award, Edit3, Trash2, Download, FileText, UserPlus, Save, X } from 'lucide-react';

export default function ClientTrackingTable({ onOpenCreateClient }) {
  const { clients, updateClient, deleteClient, dietitians } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingClient, setEditingClient] = useState(null);

  // Form states for edit modal
  const [editName, setEditName] = useState('');
  const [editPackage, setEditPackage] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [editStatus, setEditStatus] = useState('Aktif');

  const filtered = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.assignedDietitianName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportExcel = () => {
    const data = filtered.map(c => ({
      "Müşteri ID": c.id,
      "Ad Soyad": c.name,
      "E-posta": c.email,
      "Telefon": c.phone,
      "Paket Türü": c.package,
      "Diyetisyen": c.assignedDietitianName,
      "Başlangıç Kilo": `${c.startWeight} kg`,
      "Mevcut Kilo": `${c.currentWeight} kg`,
      "Hedef Kilo": `${c.targetWeight} kg`,
      "Verilen Kilo": `${(c.startWeight - c.currentWeight).toFixed(1)} kg`,
      "Durum": c.status
    }));
    exportToExcel(data, "Musteri_Takip_Raporu", "Müşteri Takip Listesi");
  };

  const handleExportPdf = () => {
    const rowsHtml = filtered.map(c => `
      <tr>
        <td><strong>${c.name}</strong><br><span style="color: #64748b;">${c.phone}</span></td>
        <td>${c.package}</td>
        <td>${c.assignedDietitianName}</td>
        <td><strong>-${(c.startWeight - c.currentWeight).toFixed(1)} kg</strong> (${c.startWeight} → ${c.currentWeight}kg)</td>
        <td><span style="background: #ecfdf5; color: #047857; padding: 3px 8px; border-radius: 10px; font-weight: bold;">${c.status}</span></td>
      </tr>
    `).join('');

    const tableHtml = `
      <table>
        <thead>
          <tr>
            <th>Danışan Müşteri</th>
            <th>Paket Türü</th>
            <th>Sorumlu Diyetisyen</th>
            <th>Kilo Değişimi</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;

    exportToPdf("Müşteri Takip ve Analiz Raporu", tableHtml, `Toplam Kayıtlı Müşteri: ${filtered.length} Kişi`);
  };

  const startEdit = (c) => {
    setEditingClient(c);
    setEditName(c.name);
    setEditPackage(c.package);
    setEditWeight(c.currentWeight);
    setEditStatus(c.status);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingClient) return;
    updateClient(editingClient.id, {
      name: editName,
      package: editPackage,
      currentWeight: Number(editWeight),
      status: editStatus
    });
    setEditingClient(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>Müşteri Takip & Analiz Sistemi</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Kayıtlı tüm danışanların paket, kilo ve diyetisyen verileri</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenCreateClient}
            className="gradient-btn-emerald px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Müşteri Ekle</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Excel</span>
          </button>

          <button
            onClick={handleExportPdf}
            className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Müşteri veya Diyetisyen adı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-input text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-bold">Filtre:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-1.5 rounded-xl glass-input text-xs font-bold"
          >
            <option value="All">Tüm Durumlar</option>
            <option value="Aktif">Aktif</option>
            <option value="Tamamlandı">Tamamlandı</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50">
              <th className="py-3 px-4">Danışan Müşteri</th>
              <th className="py-3 px-4">Paket Türü</th>
              <th className="py-3 px-4">Sorumlu Diyetisyen</th>
              <th className="py-3 px-4">Kilo Değişimi</th>
              <th className="py-3 px-4">Durum</th>
              <th className="py-3 px-4 text-right">İşlemler (CRUD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {filtered.map((c) => {
              const weightDiff = (c.startWeight - c.currentWeight).toFixed(1);
              return (
                <tr key={c.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center space-x-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-8 h-8 rounded-xl object-cover border border-emerald-300"
                    />
                    <div>
                      <span>{c.name}</span>
                      <span className="text-[10px] text-slate-500 block font-normal">{c.email} • {c.phone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-semibold">{c.package}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800">{c.assignedDietitianName}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-emerald-700">-{weightDiff} kg</span>
                    <span className="text-[10px] text-slate-500 block font-normal">({c.startWeight} → {c.currentWeight} kg)</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      c.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => startEdit(c)}
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                        title="Müşteri Bilgilerini Düzenle"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`${c.name} müşterisini silmek istediğinize emin misiniz?`)) {
                            deleteClient(c.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                        title="Müşteriyi Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Client Modal */}
      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-emerald-200 shadow-2xl">
            <button
              onClick={() => setEditingClient(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-4">Müşteri Düzenle: {editingClient.name}</h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ad Soyad</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl glass-input text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Paket Türü</label>
                <input
                  type="text"
                  value={editPackage}
                  onChange={(e) => setEditPackage(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl glass-input text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mevcut Kilo (kg)</label>
                  <input
                    type="number"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                    required
                    className="w-full p-2 rounded-xl glass-input text-xs font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Durum</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full p-2 rounded-xl glass-input text-xs font-bold"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tamamlandı">Tamamlandı</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full gradient-btn-emerald py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Müşteri Bilgilerini Kaydet</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-100">
        ⚡ {BRAND_CONFIG.footprint} - Müşteri Yönetim Modülü
      </div>
    </div>
  );
}
