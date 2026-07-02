import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { exportToExcel, exportToPdf } from '../../utils/exportHelpers';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { CreditCard, DollarSign, ArrowUpRight, CheckCircle, Clock, FileText, Download, Plus, Trash2, Edit3, Save, X } from 'lucide-react';

export default function PaymentTracker() {
  const { payments, clients, addPayment, updatePayment, deletePayment } = useAuth();
  const [filter, setFilter] = useState('All');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Add payment form states
  const [clientId, setClientId] = useState(clients[0]?.id || 'c-101');
  const [packageName, setPackageName] = useState('3 Aylık VIP Online Diyet');
  const [amount, setAmount] = useState(4500);
  const [method, setMethod] = useState('Kredi Kartı / Online');
  const [status, setStatus] = useState('Ödendi');

  const filteredPayments = payments.filter(p => filter === 'All' || p.status === filter);

  const totalRevenue = payments
    .filter(p => p.status === 'Ödendi')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingRevenue = payments
    .filter(p => p.status === 'Bekliyor')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleExportExcel = () => {
    const data = filteredPayments.map(p => ({
      "İşlem Kodu": p.id,
      "Müşteri": p.clientName,
      "Paket Türü": p.packageName,
      "Tutar": `${p.amount} ₺`,
      "Ödeme Yöntemi": p.method,
      "Tarih": p.date,
      "Durum": p.status
    }));
    exportToExcel(data, "Odeme_Abonelik_Raporu", "Finansal Tahsilat Raporu");
  };

  const handleExportPdf = () => {
    const rowsHtml = filteredPayments.map(p => `
      <tr>
        <td><strong>${p.id}</strong></td>
        <td><strong>${p.clientName}</strong></td>
        <td>${p.packageName}</td>
        <td><strong style="color: #047857;">${p.amount.toLocaleString('tr-TR')} ₺</strong></td>
        <td>${p.method} (${p.date})</td>
        <td><span style="background: ${p.status === 'Ödendi' ? '#ecfdf5' : '#fef3c7'}; color: ${p.status === 'Ödendi' ? '#047857' : '#b45309'}; padding: 3px 8px; border-radius: 10px; font-weight: bold;">${p.status}</span></td>
      </tr>
    `).join('');

    const contentHtml = `
      <div style="background: #f8fafc; padding: 15px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
        <p style="margin: 0; font-size: 13px; color: #0f172a;">
          <strong>Toplam Tahsilat:</strong> ${totalRevenue.toLocaleString('tr-TR')} ₺ | 
          <strong>Bekleyen Tahsilat:</strong> ${pendingRevenue.toLocaleString('tr-TR')} ₺
        </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>İşlem Kodu</th>
            <th>Müşteri Adı</th>
            <th>Paket Açıklaması</th>
            <th>Tutar</th>
            <th>Yöntem & Tarih</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;

    exportToPdf("Finans ve Abonelik Tahsilat Raporu", contentHtml, `Ödeme İşlem Sayısı: ${filteredPayments.length}`);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const selectedClient = clients.find(c => c.id === clientId) || clients[0];
    addPayment({
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      packageName,
      amount: Number(amount),
      method,
      status
    });
    setIsAddOpen(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6">
      {/* Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <span>Ödeme & Abonelik Takip Sistemi</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Müşteri ödemeleri, paket faturaları ve tahsilat takibi</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAddOpen(true)}
            className="gradient-btn-emerald px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Ödeme Kaydı Ekle</span>
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
            <span>PDF Rapor</span>
          </button>
        </div>
      </div>

      {/* Stats KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-600 uppercase">Toplam Tahsilat</span>
            <p className="text-3xl font-black text-emerald-800 mt-1">{totalRevenue.toLocaleString('tr-TR')} ₺</p>
            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
              <ArrowUpRight className="w-3 h-3" /> %18 Aylık Büyüme
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-300 flex items-center justify-center shadow-sm">
            <DollarSign className="w-6 h-6 text-emerald-700" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-600 uppercase">Bekleyen Tahsilat</span>
            <p className="text-3xl font-black text-amber-700 mt-1">{pendingRevenue.toLocaleString('tr-TR')} ₺</p>
            <span className="text-[10px] text-amber-800 font-bold mt-0.5 block">1 Adet İşlem</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white border border-amber-300 flex items-center justify-center shadow-sm">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-600 uppercase">Ortalama Paket Tutarı</span>
            <p className="text-3xl font-black text-slate-900 mt-1">3,937 ₺</p>
            <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">Standard & VIP Karma</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-300 flex items-center justify-center shadow-sm">
            <CreditCard className="w-6 h-6 text-slate-700" />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50">
              <th className="py-3 px-4">İşlem ID</th>
              <th className="py-3 px-4">Müşteri</th>
              <th className="py-3 px-4">Paket Açıklaması</th>
              <th className="py-3 px-4">Tutar</th>
              <th className="py-3 px-4">Yöntem & Tarih</th>
              <th className="py-3 px-4">Durum</th>
              <th className="py-3 px-4 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {filteredPayments.map((pay) => (
              <tr key={pay.id} className="hover:bg-emerald-50/50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{pay.id}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{pay.clientName}</td>
                <td className="py-3.5 px-4 text-slate-700">{pay.packageName}</td>
                <td className="py-3.5 px-4 font-black text-emerald-800">{pay.amount.toLocaleString('tr-TR')} ₺</td>
                <td className="py-3.5 px-4 text-slate-500 text-[11px]">{pay.method} ({pay.date})</td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => updatePayment(pay.id, { status: pay.status === 'Ödendi' ? 'Bekliyor' : 'Ödendi' })}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer ${
                      pay.status === 'Ödendi' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                    title="Durumu Değiştir"
                  >
                    {pay.status} (Değiştir)
                  </button>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => {
                      if (confirm(`${pay.id} kodlu ödeme kaydını silmek istediğinize emin misiniz?`)) {
                        deletePayment(pay.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                    title="Ödemeyi Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Payment Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-emerald-200 shadow-2xl">
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-4">Yeni Ödeme Kaydı Ekle</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Müşteri Seçin</label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs font-bold"
                >
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Paket / Hizmet Açıklaması</label>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl glass-input text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tutar (₺)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="w-full p-2 rounded-xl glass-input text-xs font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ödeme Durumu</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 rounded-xl glass-input text-xs font-bold"
                  >
                    <option value="Ödendi">Ödendi</option>
                    <option value="Bekliyor">Bekliyor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ödeme Yöntemi</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs font-semibold"
                >
                  <option value="Kredi Kartı / Online">Kredi Kartı / Online</option>
                  <option value="Havale / EFT">Havale / EFT</option>
                  <option value="Nakit Tahsilat">Nakit Tahsilat</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full gradient-btn-emerald py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Ödeme Kaydını Kaydet</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-100">
        ⚡ {BRAND_CONFIG.footprint} - Ödeme Takip Modülü
      </div>
    </div>
  );
}
