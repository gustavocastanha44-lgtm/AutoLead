import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl z-50 flex justify-between items-center px-6 h-16 shadow-none">
      <div className="flex items-center gap-4">
        <span className="font-h2 text-xl font-bold tracking-tight text-[#2563eb] antialiased">AutoLead</span>
        <div className="hidden md:flex ml-10 space-x-6">
          <span className="text-[#2563eb] font-semibold font-body-sm cursor-pointer transition-all duration-300">Dashboard</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
          <span className="flex h-2 w-2 rounded-full bg-green-500 pulse-dot"></span>
          <span className="font-label-caps text-green-700 text-[10px] uppercase tracking-widest font-bold">Automação Ativa</span>
        </div>
        <div className="flex items-center gap-3 ml-4">
          {/* Mocked user icon */}
          <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 bg-[#eff6ff] flex items-center justify-center">
            <span className="text-xs font-bold text-[#2563eb]">AD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
