import React from 'react';

interface DashboardKPIsProps {
  totais: {
    novos: number;
    convertidos: number;
    total: number;
    followUpsPendentes: number;
  };
}

export default function DashboardKPIs({ totais }: DashboardKPIsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      <div className="glass-panel p-6 rounded-xl flex flex-col justify-between h-36 group">
        <div className="flex justify-between items-start">
          <span className="font-label-caps text-on-surface-variant">Total de Leads</span>
          <span className="material-symbols-outlined text-[#3b82f6]/60 group-hover:text-[#3b82f6] transition-colors">groups</span>
        </div>
        <div className="font-h1 text-[#3b82f6] text-4xl">{totais.total}</div>
      </div>
      
      <div className="glass-panel p-6 rounded-xl flex flex-col justify-between h-36 group">
        <div className="flex justify-between items-start">
          <span className="font-label-caps text-on-surface-variant">Novos</span>
          <span className="material-symbols-outlined text-[#3b82f6]/60 group-hover:text-[#3b82f6] transition-colors">fiber_new</span>
        </div>
        <div className="font-h1 text-[#3b82f6] text-4xl">{totais.novos}</div>
      </div>
      
      <div className="glass-panel p-6 rounded-xl flex flex-col justify-between h-36 group">
        <div className="flex justify-between items-start">
          <span className="font-label-caps text-on-surface-variant">Follow-ups Pendentes</span>
          <span className="material-symbols-outlined text-[#f97316]/60 group-hover:text-[#f97316] transition-colors">schedule</span>
        </div>
        <div className="font-h1 text-[#f97316] text-4xl">{totais.followUpsPendentes}</div>
      </div>
      
      <div className="glass-panel p-6 rounded-xl flex flex-col justify-between h-36 group">
        <div className="flex justify-between items-start">
          <span className="font-label-caps text-on-surface-variant">Convertidos</span>
          <span className="material-symbols-outlined text-[#10b981]/60 group-hover:text-[#10b981] transition-colors">check_circle</span>
        </div>
        <div className="font-h1 text-[#10b981] text-4xl">{totais.convertidos}</div>
      </div>
    </div>
  );
}
