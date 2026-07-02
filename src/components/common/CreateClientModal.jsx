import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { X, UserPlus, Save, Lock, Mail, Phone, Scale, UserCheck, Sparkles } from 'lucide-react';

export default function CreateClientModal({ isOpen, onClose }) {
  const { dietitians, addClient } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Pass123');
  const [phone, setPhone] = useState('+90 53');
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState('Kadın');
  const [startWeight, setStartWeight] = useState(72);
  const [targetWeight, setTargetWeight] = useState(60);
  const [height, setHeight] = useState(168);
  const [packageName, setPackageName] = useState('3 Aylık VIP Online Diyet');
  const [assignedDietitianId, setAssignedDietitianId] = useState(dietitians[0]?.id || 'dyt-1');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDyt = dietitians.find(d => d.id === assignedDietitianId) || dietitians[0];

    addClient({
      name,
      email,
      password,
      phone,
      age: Number(age),
      gender,
      startWeight: Number(startWeight),
      currentWeight: Number(startWeight),
      targetWeight: Number(targetWeight),
      height: Number(height),
      package: packageName,
      assignedDietitianId: selectedDyt.id,
      assignedDietitianName: selectedDyt.name
    });

    alert(`✅ ${name} için danışan hesabı başarıyla oluşturuldu!\nE-posta: ${email}\nŞifre: ${password}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 mb-2 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-emerald-700" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Yeni Danışan Hesabı Oluştur</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Sisteme yeni müşteri kaydı yapın ve giriş şifresi tanımlayın.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ad Soyad</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Canan Yücel"
                required
                className="w-full p-2.5 rounded-xl glass-input text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Telefon</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+90 5XX XXX XX XX"
                required
                className="w-full p-2.5 rounded-xl glass-input text-xs font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Giriş E-postası</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="danisan@domain.com"
                required
                className="w-full p-2.5 rounded-xl glass-input text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Giriş Şifresi</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Örn: Pass123"
                required
                className="w-full p-2.5 rounded-xl glass-input text-xs font-bold text-emerald-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Başlangıç Kilosu (kg)</label>
              <input
                type="number"
                value={startWeight}
                onChange={(e) => setStartWeight(e.target.value)}
                required
                className="w-full p-2 rounded-xl glass-input text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Hedef Kilo (kg)</label>
              <input
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                required
                className="w-full p-2 rounded-xl glass-input text-xs font-bold text-emerald-700"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Boy (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                className="w-full p-2 rounded-xl glass-input text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Paket Türü</label>
              <select
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full p-2.5 rounded-xl glass-input text-xs font-bold"
              >
                <option value="1 Aylık Standart Paket">1 Aylık Standart Paket</option>
                <option value="3 Aylık VIP Online Diyet">3 Aylık VIP Online Diyet</option>
                <option value="6 Aylık Bütüncül Paket">6 Aylık Bütüncül Paket</option>
                <option value="Sporcu Beslenmesi Özel">Sporcu Beslenmesi Özel</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sorumlu Diyetisyen</label>
              <select
                value={assignedDietitianId}
                onChange={(e) => setAssignedDietitianId(e.target.value)}
                className="w-full p-2.5 rounded-xl glass-input text-xs font-bold text-emerald-800"
              >
                {dietitians.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full gradient-btn-emerald py-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg"
            >
              <UserCheck className="w-4 h-4" />
              <span>Danışan Hesabını Oluştur ve Şifreyi Kaydet</span>
            </button>
          </div>

          <div className="text-center text-[10px] text-slate-400 border-t border-slate-100 pt-3">
            ⚡ {BRAND_CONFIG.footprint} - Güvenli Müşteri Oluşturma Modülü
          </div>
        </form>
      </div>
    </div>
  );
}
