import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Utensils, Edit3, Plus, Trash2, Save, Check, Flame, Coffee, Sun, Moon, Sparkles } from 'lucide-react';

export default function DietPlanMasterEditor() {
  const { clients, dietPlans, updateDietPlan } = useAuth();
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const activeClient = clients.find(c => c.id === selectedClientId) || clients[0];
  const activePlan = dietPlans[selectedClientId] || {
    clientId: selectedClientId,
    title: `${activeClient?.name || 'Danışan'} - Özel Beslenme Programı`,
    targetCalories: 1750,
    macros: { protein: 95, carbs: 170, fat: 55 },
    meals: [
      { id: 'm1', name: 'Kahvaltı (08:30)', icon: 'Sun', items: ['2 Haşlanmış Yumurta', '1 Dilim Süzme Peynir', '5 Zeytin'], calories: 420 },
      { id: 'm2', name: 'Öğle (13:00)', icon: 'Utensils', items: ['150 gr Izgara Tavuk', 'Salata', '4 YK Karabuğday'], calories: 480 },
      { id: 'm3', name: 'Ara Öğün (16:30)', icon: 'Coffee', items: ['1 Yeşil Elma', '10 Çiğ Badem'], calories: 200 },
      { id: 'm4', name: 'Akşam (19:30)', icon: 'Moon', items: ['1 Kase Sebze Çorbası', 'Zeytinyağlı Fırın Sebze'], calories: 450 }
    ]
  };

  const [currentPlan, setCurrentPlan] = useState({ ...activePlan });

  const handleSelectClient = (clientId) => {
    setSelectedClientId(clientId);
    const plan = dietPlans[clientId] || {
      clientId: clientId,
      title: `${clients.find(c => c.id === clientId)?.name} - Özel Beslenme Programı`,
      targetCalories: 1750,
      macros: { protein: 95, carbs: 170, fat: 55 },
      meals: [
        { id: 'm1', name: 'Kahvaltı (08:30)', icon: 'Sun', items: ['2 Haşlanmış Yumurta', '1 Dilim Süzme Peynir', '5 Zeytin'], calories: 420 },
        { id: 'm2', name: 'Öğle (13:00)', icon: 'Utensils', items: ['150 gr Izgara Tavuk', 'Salata', '4 YK Karabuğday'], calories: 480 },
        { id: 'm3', name: 'Ara Öğün (16:30)', icon: 'Coffee', items: ['1 Yeşil Elma', '10 Çiğ Badem'], calories: 200 },
        { id: 'm4', name: 'Akşam (19:30)', icon: 'Moon', items: ['1 Kase Sebze Çorbası', 'Zeytinyağlı Fırın Sebze'], calories: 450 }
      ]
    };
    setCurrentPlan(plan);
  };

  const handleMealItemChange = (mealId, itemIdx, value) => {
    setCurrentPlan(prev => ({
      ...prev,
      meals: prev.meals.map(m => {
        if (m.id === mealId) {
          const newItems = [...m.items];
          newItems[itemIdx] = value;
          return { ...m, items: newItems };
        }
        return m;
      })
    }));
  };

  const handleAddMealItem = (mealId) => {
    setCurrentPlan(prev => ({
      ...prev,
      meals: prev.meals.map(m => {
        if (m.id === mealId) {
          return { ...m, items: [...m.items, 'Yeni Besin Maddesi'] };
        }
        return m;
      })
    }));
  };

  const handleDeleteMealItem = (mealId, itemIdx) => {
    setCurrentPlan(prev => ({
      ...prev,
      meals: prev.meals.map(m => {
        if (m.id === mealId) {
          const newItems = m.items.filter((_, i) => i !== itemIdx);
          return { ...m, items: newItems };
        }
        return m;
      })
    }));
  };

  const handleSavePlan = () => {
    updateDietPlan(selectedClientId, currentPlan);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-emerald-600" />
            <span>Danışan Diyet Listeleri Master Düzenleyicisi</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">Tüm danışanların diyet listelerini, makro/kalori hedeflerini canlı olarak düzenleyin</p>
        </div>

        {/* Client Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-700 whitespace-nowrap">Danışan Seçin:</label>
          <select
            value={selectedClientId}
            onChange={(e) => handleSelectClient(e.target.value)}
            className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-xs font-bold text-emerald-900 focus:outline-none"
          >
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.package})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Plan Overview & Macros */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Diyet Program Başlığı</label>
            <input
              type="text"
              value={currentPlan.title || ''}
              onChange={(e) => setCurrentPlan(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Hedef Kalori (kcal)</span>
            </label>
            <input
              type="number"
              value={currentPlan.targetCalories || 1750}
              onChange={(e) => setCurrentPlan(prev => ({ ...prev, targetCalories: parseInt(e.target.value) || 0 }))}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-black text-emerald-700"
            />
          </div>

          <div className="grid grid-cols-3 gap-1">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Protein (g)</label>
              <input
                type="number"
                value={currentPlan.macros?.protein || 90}
                onChange={(e) => setCurrentPlan(prev => ({ ...prev, macros: { ...prev.macros, protein: parseInt(e.target.value) } }))}
                className="w-full p-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Karb (g)</label>
              <input
                type="number"
                value={currentPlan.macros?.carbs || 160}
                onChange={(e) => setCurrentPlan(prev => ({ ...prev, macros: { ...prev.macros, carbs: parseInt(e.target.value) } }))}
                className="w-full p-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Yağ (g)</label>
              <input
                type="number"
                value={currentPlan.macros?.fat || 50}
                onChange={(e) => setCurrentPlan(prev => ({ ...prev, macros: { ...prev.macros, fat: parseInt(e.target.value) } }))}
                className="w-full p-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Meals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPlan.meals?.map((meal) => (
          <div key={meal.id} className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-600" />
                <span>{meal.name}</span>
              </h4>
              <span className="text-xs font-bold text-slate-500">{meal.calories} kcal</span>
            </div>

            <div className="space-y-2">
              {meal.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleMealItemChange(meal.id, idx, e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 focus:border-emerald-500"
                  />
                  <button
                    onClick={() => handleDeleteMealItem(meal.id, idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleAddMealItem(meal.id)}
              className="w-full py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni Besin Maddesi Ekle</span>
            </button>
          </div>
        ))}
      </div>

      {/* Save Button Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        {saveSuccess ? (
          <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4" />
            <span>{activeClient?.name} diyet programı başarıyla kaydedildi!</span>
          </div>
        ) : (
          <span className="text-xs text-slate-500 font-medium">💡 Değişiklikler canlı danışan paneline anında aktarılır.</span>
        )}

        <button
          onClick={handleSavePlan}
          className="gradient-btn-emerald px-6 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Diyet Programını Kaydet</span>
        </button>
      </div>
    </div>
  );
}
