import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { Sparkles, Plus, Search, Quote, Flame, Clock, Trash2, Edit3, Save, X } from 'lucide-react';

export default function MotivationManager() {
  const {
    motivationQuotes,
    addMotivationQuote,
    updateMotivationQuote,
    deleteMotivationQuote,
    triggerRandomQuote,
    motivationIntervalSec,
    setMotivationIntervalSec,
    motivationEnabled,
    setMotivationEnabled
  } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState('Beslenme');
  const [newAuthor, setNewAuthor] = useState('NutriVibe Rehberi');
  const [editingQuote, setEditingQuote] = useState(null);

  const filteredQuotes = motivationQuotes.filter(q =>
    q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    addMotivationQuote(newText, newCategory, newAuthor);
    setNewText('');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingQuote) return;
    updateMotivationQuote(editingQuote.id, newText, newCategory, newAuthor);
    setEditingQuote(null);
    setNewText('');
  };

  const startEdit = (q) => {
    setEditingQuote(q);
    setNewText(q.text);
    setNewCategory(q.category);
    setNewAuthor(q.author);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>200+ Motivasyon Mesajları Kütüphanesi</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Sitede her <strong>{motivationIntervalSec} saniyede bir</strong> 5 saniye duran motivasyon ve sağlık mesajları yönetimi
          </p>
        </div>

        <button
          onClick={triggerRandomQuote}
          className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold hover:bg-amber-400 transition-all shadow-md flex items-center gap-1.5 shrink-0"
        >
          <Flame className="w-4 h-4 text-slate-950" />
          <span>Şimdi Test Et (Popup Çıkar)</span>
        </button>
      </div>

      {/* Settings Bar */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-amber-600" />
          <span className="text-slate-700">Pop-up Frekansı:</span>
          <select
            value={motivationIntervalSec}
            onChange={(e) => setMotivationIntervalSec(Number(e.target.value))}
            className="p-1.5 rounded-lg glass-input text-xs font-bold text-emerald-800"
          >
            <option value={15}>15 Saniyede Bir (Hızlı Test)</option>
            <option value={30}>30 Saniyede Bir</option>
            <option value={45}>45 Saniyede Bir (Varsayılan)</option>
            <option value={60}>60 Saniyede Bir</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-700">Otomatik Gösterim:</span>
          <button
            onClick={() => setMotivationEnabled(!motivationEnabled)}
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              motivationEnabled ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-red-100 text-red-700 border-red-300'
            }`}
          >
            {motivationEnabled ? 'Açık (Aktif)' : 'Kapalı (Duraklatıldı)'}
          </button>
        </div>
      </div>

      {/* Add / Edit Form */}
      <form onSubmit={editingQuote ? handleUpdate : handleAdd} className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-extrabold text-emerald-900 uppercase">
            {editingQuote ? "Mesajı Düzenle" : "Yeni Motivasyon İpucu Ekle"}
          </h4>
          {editingQuote && (
            <button
              type="button"
              onClick={() => { setEditingQuote(null); setNewText(''); }}
              className="text-xs text-slate-500 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> İptal
            </button>
          )}
        </div>

        <textarea
          rows={2}
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Motivasyon mesajını buraya yazın..."
          required
          className="w-full p-2.5 rounded-xl glass-input text-xs font-medium"
        ></textarea>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Kategori"
              className="p-2 rounded-xl glass-input text-xs font-bold"
            />
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Yazar / Başlık"
              className="p-2 rounded-xl glass-input text-xs font-semibold"
            />
          </div>

          <button
            type="submit"
            className="gradient-btn-emerald px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-sm"
          >
            {editingQuote ? <Save className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{editingQuote ? "Güncelle" : "Kütüphaneye Ekle"}</span>
          </button>
        </div>
      </form>

      {/* Quote Search & List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">
            Toplam {motivationQuotes.length} Mesaj Kayıtlı
          </span>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Mesajlarda ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1 rounded-xl glass-input text-xs font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {filteredQuotes.slice(0, 40).map((q) => (
            <div
              key={q.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-2 group hover:border-emerald-300 transition-all"
            >
              <div className="flex items-start gap-2.5">
                <Quote className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs text-slate-800 leading-relaxed italic font-medium">"{q.text}"</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      {q.category}
                    </span>
                    <span>— {q.author}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={() => startEdit(q)}
                  className="p-1 rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                  title="Düzenle"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => deleteMotivationQuote(q.id)}
                  className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                  title="Sil"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-100">
        ⚡ {BRAND_CONFIG.footprint}
      </div>
    </div>
  );
}
