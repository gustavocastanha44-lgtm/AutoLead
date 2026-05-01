'use client';

import React, { useTransition } from 'react';
import { createNewLeadAction } from '@/app/actions';

export default function SideNavBar() {
  const [isPending, startTransition] = useTransition();

  const handleNewLead = () => {
    startTransition(async () => {
      await createNewLeadAction();
    });
  };

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-slate-200 bg-white/80 backdrop-blur-xl hidden lg:flex flex-col py-6 gap-2 font-medium z-40">
      <div className="px-6 mb-8">
        <h2 className="text-[#2563eb] font-black text-xl font-h2">AutoLead Pro</h2>
        <p className="text-slate-500 text-xs">Lead Automation</p>
      </div>
      <nav className="flex-1 space-y-1">
        <div className="flex items-center gap-3 px-6 py-3 bg-[#eff6ff] text-[#2563eb] border-r-4 border-[#2563eb] cursor-pointer transition-all">
          <span className="text-body-md font-semibold">Dashboard</span>
        </div>
      </nav>
      <div className="mt-auto px-6 pt-4 border-t border-slate-200">
        <button 
          onClick={handleNewLead}
          disabled={isPending}
          className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-bold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:scale-105 hover:bg-[#1d4ed8] active:scale-95 transition-all mb-4 disabled:opacity-50 disabled:scale-100 cursor-pointer"
        >
          {isPending ? 'Adicionando...' : 'Novo Lead'}
        </button>
      </div>
    </aside>
  );
}
