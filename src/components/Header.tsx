import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur-xl z-50 flex justify-between items-center px-6 h-16 shadow-none">
      <div className="flex items-center gap-4">
        <span className="font-h2 text-xl font-bold tracking-tight text-white antialiased">AutoLead</span>
        <div className="hidden md:flex ml-10 space-x-6">
          <span className="text-blue-400 font-semibold font-body-sm cursor-pointer transition-all duration-300">Dashboard</span>
          <span className="text-slate-400 hover:text-white font-body-sm cursor-pointer transition-all duration-300">Leads</span>
          <span className="text-slate-400 hover:text-white font-body-sm cursor-pointer transition-all duration-300">Campanhas</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
          <span className="flex h-2 w-2 rounded-full bg-secondary pulse-dot"></span>
          <span className="font-label-caps text-secondary text-[10px] uppercase tracking-widest">Automação Ativa</span>
        </div>
        <div className="flex items-center gap-3 ml-4">
          {/* Mocked user icon */}
          <div className="h-8 w-8 rounded-full overflow-hidden border border-white/20 bg-slate-700 flex items-center justify-center">
            <span className="text-xs text-white">AD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
