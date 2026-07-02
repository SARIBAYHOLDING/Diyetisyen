import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { exportToPdf, exportToExcel } from '../../utils/exportHelpers';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { Utensils, Sun, Coffee, Moon, Flame, Plus, MessageSquare, FileText, Download } from 'lucide-react';

export default function DietPlanView({ client, onRequestChange }) {
  const { dietPlans, changeRequests } = useAuth();

  const plan = dietPlans[client?.id] || dietPlans["c-101"];
  const myRequests = changeRequests.filter(r => r.clientId === client?.id);

  const getMealIcon = (iconName) => {
    if (iconName === 'Sun') return Sun;
    if (iconName === 'Coffee') return Coffee;
    if (iconName === 'Moon') return Moon;
    return Utensils;
  };

  const handleExportPdf = () => {
    let mealsHtml = plan?.meals?.map(m => `
      <div style="background: #f8fafc; padding: 15px; border-radius: 12px; margin-bottom: 15px; border: 1px solid #e2e8f0;">
        <div style="display: flex; justify-content: space-between; font-weight: 800; color: #047857; font-size: 14px; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-bottom: 10px;">
          <span>${m.name}</span>
          <span style="color: #d97706;">${m.calories} kcal</span>
        </div>
        <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #334155;">
          ${m.items.map(i => `<li style="margin-bottom: 4px;">${i}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    let fullContent = `
      <div style="background: #ecfdf5; padding: 15px; border-radius: 12px; border: 1px solid #a7f3d0; margin-bottom: 20px;">
        <h3 style="margin: 0 0 8px 0; color: #047857; font-size: 16px;">Danışan: ${client?.name}</h3>
        <p style="margin: 0; font-size: 12px; color: #475569;">
          <strong>Hedef Kalori:</strong> ${plan?.targetCalories} kcal | 
          <strong>Protein:</strong> ${plan?.macros?.protein}g | 
          <strong>Karbonhidrat:</strong> ${plan?.macros?.carbs}g | 
          <strong>Yağ:</strong> ${plan?.macros?.fat}g
        </p>
      </div>
      <h4 style="color: #0f172a; font-size: 14px; margin-bottom: 15px;">Öğün Programı</h4>
      ${mealsHtml}
    `;

    exportToPdf(`${client?.name} - Beslenme Programı`, fullContent, plan?.title);
  };

  return (
    <div className="space-y-8">
      {/* Diet Plan Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 mb-2">
              <Utensils className="w-3.5 h-3.5" />
              <span>Aktif Beslenme Programı</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{plan?.title}</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Diyetisyeniniz <strong className="text-emerald-700">{client?.assignedDietitianName}</strong> tarafından özel olarak oluşturuldu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportPdf}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Diyet PDF İndir</span>
            </button>

            {onRequestChange && (
              <button
                onClick={onRequestChange}
                className="gradient-btn-emerald px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Diyet Değişiklik Talebi</span>
              </button>
            )}
          </div>
        </div>

        {/* Macro Nutrient Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
            <span className="text-[11px] text-slate-600 font-bold uppercase block">Hedef Kalori</span>
            <span className="text-2xl font-black text-emerald-800 flex items-center justify-center gap-1 mt-1">
              <Flame className="w-5 h-5 text-amber-500" />
              {plan?.targetCalories} kcal
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
            <span className="text-[11px] text-slate-600 font-bold uppercase block">Protein</span>
            <span className="text-2xl font-black text-emerald-700 mt-1">{plan?.macros?.protein} g</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
            <span className="text-[11px] text-slate-600 font-bold uppercase block">Karbonhidrat</span>
            <span className="text-2xl font-black text-emerald-800 mt-1">{plan?.macros?.carbs} g</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
            <span className="text-[11px] text-slate-600 font-bold uppercase block">Sağlıklı Yağ</span>
            <span className="text-2xl font-black text-amber-600 mt-1">{plan?.macros?.fat} g</span>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plan?.meals?.map((meal) => {
          const IconComp = getMealIcon(meal.icon);
          return (
            <div
              key={meal.id}
              className="bg-white rounded-3xl p-6 border border-emerald-200 hover:border-emerald-400 transition-all flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                      <IconComp className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{meal.name}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-amber-700 text-xs font-bold border border-slate-200">
                    {meal.calories} kcal
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  {meal.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Change Requests Status Log */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <span>Diyet Değişiklik Talepleri Geçmişi</span>
        </h3>

        {myRequests.length === 0 ? (
          <p className="text-xs text-slate-500 italic">Henüz bir değişiklik talebiniz bulunmuyor.</p>
        ) : (
          <div className="space-y-3">
            {myRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{req.mealName}</span>
                    <span className="text-[10px] text-slate-500">{req.date}</span>
                  </div>
                  <p className="text-xs text-slate-700">Talep: "{req.requestedChange}"</p>
                  {req.dietitianNote && (
                    <p className="text-[11px] text-emerald-700 font-bold">
                      💡 Diyetisyen Cevabı: {req.dietitianNote}
                    </p>
                  )}
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  req.status === 'Onaylandı' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 pt-3 text-right text-[10px] text-slate-400 border-t border-slate-100">
          ⚡ {BRAND_CONFIG.footprint}
        </div>
      </div>
    </div>
  );
}
