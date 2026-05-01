import React from 'react';

export default function SideNavBar() {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-white/10 bg-slate-900/70 backdrop-blur-xl hidden lg:flex flex-col py-6 gap-2 font-medium">
      <div className="px-6 mb-8">
        <h2 className="text-[#3b82f6] font-black text-xl font-h2">AutoLead Pro</h2>
        <p className="text-slate-400 text-xs">Lead Automation</p>
      </div>
      <nav className="flex-1 space-y-1">
        <div className="flex items-center gap-3 px-6 py-3 bg-[#3b82f6]/10 text-[#3b82f6] border-r-2 border-[#3b82f6] cursor-pointer transition-all">
          <span className="text-body-md font-semibold">Dashboard</span>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer group">
          <span className="text-body-md">Leads</span>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer group">
          <span className="text-body-md">Campanhas</span>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer group">
          <span className="text-body-md">Relatórios</span>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer group">
          <span className="text-body-md">Configurações</span>
        </div>
      </nav>
      <div className="mt-auto px-6 pt-4 border-t border-white/5">
        <button className="w-full bg-[#3b82f6] text-white py-3 rounded-lg font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all mb-4">
            Novo Lead
        </button>
      </div>
    </aside>
  );
}
