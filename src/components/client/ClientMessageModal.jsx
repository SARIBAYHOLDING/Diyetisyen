import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, Send, X, User } from 'lucide-react';

export default function ClientMessageModal({ isOpen, onClose, client }) {
  const { messages, sendMessage, currentUser, role } = useAuth();
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const targetClientId = client?.id || currentUser?.id || 'c-101';
  const clientMessages = messages.filter(m => m.receiverId === targetClientId || m.senderId === targetClientId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const senderRole = role === 'dietitian' ? 'dietitian' : 'client';
    const senderName = currentUser?.name || (role === 'dietitian' ? 'Dyt. Zeynep Kaya' : client?.name || 'Ahsen Yılmaz');

    sendMessage(targetClientId, inputText, senderRole, senderName);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-lg w-full shadow-2xl text-white flex flex-col h-[520px] relative overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-800/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {role === 'dietitian' ? `${client?.name} ile Mesajlaşma` : 'Diyetisyeniniz ile Direkt Mesaj'}
              </h3>
              <p className="text-[10px] text-slate-400">Canlı ve Kalıcı Danışan İletişim Hattı</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-950/50">
          {clientMessages.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500 italic">
              Henüz bir mesaj geçmişi bulunmuyor. İlk mesajı siz yazın!
            </div>
          ) : (
            clientMessages.map((msg) => {
              const isMine = (role === 'client' && msg.senderRole === 'client') || (role === 'dietitian' && msg.senderRole === 'dietitian');
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center space-x-1 mb-1 text-[10px] text-slate-400">
                    <span className="font-bold">{msg.senderName}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs font-medium shadow-md leading-relaxed ${
                      isMine
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-slate-800 border border-white/10 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Input */}
        <form onSubmit={handleSend} className="p-4 bg-slate-800/80 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            placeholder="Mesajınızı yazın..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-medium focus:border-emerald-400 focus:outline-none"
          />
          <button
            type="submit"
            className="gradient-btn-emerald p-2.5 rounded-xl text-white flex items-center justify-center shrink-0 shadow-md hover:brightness-110"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
