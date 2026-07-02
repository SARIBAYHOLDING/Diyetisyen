import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Droplets, Plus, Minus, CheckCircle, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HydrationTracker({ client }) {
  const { updateWaterIntake } = useAuth();

  const currentMl = client?.waterIntakeCurrent || 0;
  const goalMl = client?.waterIntakeGoal || 2500;
  const percent = Math.min(100, Math.round((currentMl / goalMl) * 100));

  const addWater = (amount) => {
    const nextVal = currentMl + amount;
    updateWaterIntake(client.id, nextVal);
    if (nextVal >= goalMl && currentMl < goalMl) {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
    }
  };

  const removeWater = (amount) => {
    updateWaterIntake(client.id, Math.max(0, currentMl - amount));
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-teal-500/30 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-teal-300 animate-bounce" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Günlük Su Takibi</h3>
            <p className="text-[11px] text-slate-400">Hedef: {(goalMl / 1000).toFixed(1)} Litre</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black">
          %{percent}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-300">
        <span>Mevcut: <strong className="text-teal-300">{currentMl} ml</strong></span>
        <span>Kalan: <strong className="text-slate-400">{Math.max(0, goalMl - currentMl)} ml</strong></span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        <button
          onClick={() => addWater(250)}
          className="py-2 px-3 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30 transition-all text-xs font-bold flex items-center justify-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+250 ml (Bardak)</span>
        </button>

        <button
          onClick={() => addWater(500)}
          className="py-2 px-3 rounded-xl bg-teal-500/30 text-teal-200 border border-teal-500/40 hover:bg-teal-500/40 transition-all text-xs font-bold flex items-center justify-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+500 ml (Matara)</span>
        </button>

        <button
          onClick={() => removeWater(250)}
          className="py-2 px-3 rounded-xl bg-slate-800 text-slate-400 border border-white/5 hover:bg-slate-700 transition-all text-xs font-bold flex items-center justify-center gap-1"
        >
          <Minus className="w-3.5 h-3.5" />
          <span>-250 ml</span>
        </button>
      </div>
    </div>
  );
}
