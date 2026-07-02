import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StickyNote, Plus, Trash2, CheckCircle2, Pin } from 'lucide-react';

export default function StickyNotes() {
  const { stickyNotes, addStickyNote, deleteStickyNote } = useAuth();
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [color, setColor] = useState('amber');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addStickyNote({ title: newTitle, text: newText, color });
    setNewTitle('');
    setNewText('');
  };

  const colorMap = {
    amber: "bg-amber-500/10 border-amber-500/40 text-amber-300",
    emerald: "bg-emerald-500/10 border-emerald-500/40 text-emerald-300",
    indigo: "bg-indigo-500/10 border-indigo-500/40 text-indigo-300"
  };

  return (
    <div className="space-y-6">
      {/* Header & Creator */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <StickyNote className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Diyetisyenin Kişisel Not Defteri</h3>
            <p className="text-xs text-slate-400">Günün önemli hatırlatmalarını ve araştırma notlarını kaydedin</p>
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-3 pt-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Not başlığı..."
            required
            className="w-full p-2.5 rounded-xl glass-input text-xs font-bold"
          />
          <textarea
            rows={2}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Detaylar veya hatırlatma notu..."
            className="w-full p-2.5 rounded-xl glass-input text-xs text-slate-300"
          ></textarea>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Renk:</span>
              <button
                type="button"
                onClick={() => setColor('amber')}
                className={`w-5 h-5 rounded-full bg-amber-400 border-2 ${color === 'amber' ? 'border-white' : 'border-transparent'}`}
              ></button>
              <button
                type="button"
                onClick={() => setColor('emerald')}
                className={`w-5 h-5 rounded-full bg-emerald-400 border-2 ${color === 'emerald' ? 'border-white' : 'border-transparent'}`}
              ></button>
              <button
                type="button"
                onClick={() => setColor('indigo')}
                className={`w-5 h-5 rounded-full bg-indigo-400 border-2 ${color === 'indigo' ? 'border-white' : 'border-transparent'}`}
              ></button>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold hover:bg-amber-400 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Not Ekle</span>
            </button>
          </div>
        </form>
      </div>

      {/* Sticky Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stickyNotes.map((note) => (
          <div
            key={note.id}
            className={`p-5 rounded-2xl border ${colorMap[note.color] || colorMap.amber} relative group transition-all hover:scale-102`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Pin className="w-3.5 h-3.5" />
                {note.title}
              </h4>
              <button
                onClick={() => deleteStickyNote(note.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 text-red-400 transition-all"
                title="Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap">
              {note.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
