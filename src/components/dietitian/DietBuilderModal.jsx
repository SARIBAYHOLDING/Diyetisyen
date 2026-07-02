import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Save, Plus, Trash2, Utensils, Flame } from 'lucide-react';

export default function DietBuilderModal({ isOpen, onClose, client }) {
  const { dietPlans, updateDietPlan } = useAuth();

  const [title, setTitle] = useState('');
  const [targetCalories, setTargetCalories] = useState(1650);
  const [protein, setProtein] = useState(95);
  const [carbs, setCarbs] = useState(160);
  const [fat, setFat] = useState(55);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (client) {
      const existingPlan = dietPlans[client.id] || dietPlans["c-101"];
      setTitle(existingPlan?.title || `${client.name} - Özel Yağ Yakım Programı`);
      setTargetCalories(existingPlan?.targetCalories || 1700);
      setProtein(existingPlan?.macros?.protein || 90);
      setCarbs(existingPlan?.macros?.carbs || 150);
      setFat(existingPlan?.macros?.fat || 50);
      setMeals(existingPlan?.meals || []);
    }
  }, [client, dietPlans]);

  if (!isOpen || !client) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateDietPlan(client.id, {
      clientId: client.id,
      title,
      targetCalories: Number(targetCalories),
      macros: { protein: Number(protein), carbs: Number(carbs), fat: Number(fat) },
      meals
    });
    onClose();
  };

  const handleMealChange = (index, field, value) => {
    const updated = [...meals];
    updated[index][field] = value;
    setMeals(updated);
  };

  const addMeal = () => {
    setMeals(prev => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        name: "Yeni Ekstra Öğün",
        icon: "Coffee",
        items: ["1 porsiyon meyve veya kuruyemiş"],
        calories: 150
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-teal-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Utensils className="w-5 h-5 text-teal-300" />
            <span>Diyet Programı Düzenle: {client.name}</span>
          </h3>
          <p className="text-xs text-slate-400">Danışanın günlük beslenme programını güncelleyin</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Program Başlığı</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Hedef Kalori</label>
              <input
                type="number"
                value={targetCalories}
                onChange={(e) => setTargetCalories(e.target.value)}
                className="w-full p-2 rounded-xl glass-input text-xs font-bold text-emerald-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Protein (g)</label>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full p-2 rounded-xl glass-input text-xs font-bold text-teal-300"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Karbonhidrat (g)</label>
              <input
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="w-full p-2 rounded-xl glass-input text-xs font-bold text-indigo-300"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Yağ (g)</label>
              <input
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="w-full p-2 rounded-xl glass-input text-xs font-bold text-amber-400"
              />
            </div>
          </div>

          {/* Meals Builder List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Öğün İçerikleri</h4>
              <button
                type="button"
                onClick={addMeal}
                className="px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Öğün Ekle</span>
              </button>
            </div>

            {meals.map((meal, idx) => (
              <div key={meal.id || idx} className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={meal.name}
                    onChange={(e) => handleMealChange(idx, 'name', e.target.value)}
                    className="flex-1 p-2 rounded-lg glass-input text-xs font-bold text-white"
                  />
                  <input
                    type="number"
                    value={meal.calories}
                    onChange={(e) => handleMealChange(idx, 'calories', Number(e.target.value))}
                    className="w-24 p-2 rounded-lg glass-input text-xs text-amber-400 font-bold"
                    placeholder="kcal"
                  />
                </div>

                <textarea
                  rows={2}
                  value={Array.isArray(meal.items) ? meal.items.join('\n') : meal.items}
                  onChange={(e) => handleMealChange(idx, 'items', e.target.value.split('\n'))}
                  placeholder="Her satıra bir besin maddesi yazın..."
                  className="w-full p-2.5 rounded-xl glass-input text-xs text-slate-300"
                ></textarea>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full gradient-btn-emerald py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Diyet Programını Kaydet ve Yayınla</span>
          </button>
        </form>
      </div>
    </div>
  );
}
