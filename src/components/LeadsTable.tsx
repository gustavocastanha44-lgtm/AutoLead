'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface LeadsTableProps {
  clientes: any[];
}

export default function LeadsTable({ clientes }: LeadsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [showFilters, setShowFilters] = useState(false);
  const [nameFilter, setNameFilter] = useState(searchParams.get('name') || '');
  const [dateFilter, setDateFilter] = useState(searchParams.get('date') || '');

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (nameFilter) params.set('name', nameFilter);
    else params.delete('name');
    
    if (dateFilter) params.set('date', dateFilter);
    else params.delete('date');
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setNameFilter('');
    setDateFilter('');
    router.push(pathname);
  };

  return (
    <section className="glass-panel rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-slate-200 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="font-h3 text-slate-800">Leads Recentes</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border font-label-caps transition-colors cursor-pointer ${
                showFilters || nameFilter || dateFilter 
                  ? 'bg-[#2563eb] text-white border-[#2563eb]' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {showFilters ? 'Fechar Filtros' : 'Filtrar'}
            </button>
            <button 
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] font-label-caps hover:bg-[#dbeafe] transition-colors cursor-pointer"
            >
              Ver Todos
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
              <label className="text-xs font-bold text-slate-500 uppercase">Nome do Cliente</label>
              <input 
                type="text" 
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="Ex: Ana Silva..."
                className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
              />
            </div>
            <div className="flex flex-col gap-1.5 min-w-[150px]">
              <label className="text-xs font-bold text-slate-500 uppercase">Data de Criação</label>
              <input 
                type="date" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
              />
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleFilter}
                className="px-6 py-2 bg-[#2563eb] text-white rounded-md text-sm font-bold hover:bg-[#1d4ed8] transition-colors cursor-pointer h-[38px]"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 font-label-caps text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Contato</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Próximo Follow-up</th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-slate-700">
            {clientes.length === 0 && (
              <tr>
                <td colSpan={4} className="p-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-4xl opacity-20">search_off</span>
                    <span>Nenhum lead encontrado com esses filtros.</span>
                  </div>
                </td>
              </tr>
            )}
            
            {clientes.map((cliente) => {
              const pendentes = cliente.followUps?.filter((f: any) => f.status === 'pendente') || [];
              const proxFollowUp = pendentes.length > 0 ? pendentes[0].dataEnvio : null;
              
              return (
                <tr key={cliente.id} className="hover:bg-slate-50 border-b border-slate-100 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 font-['Inter']">{cliente.nome || 'Sem Nome'}</span>
                      <span className="text-xs text-slate-500 mt-0.5 truncate max-w-[200px]" title={cliente.mensagem || ''}>
                        {cliente.mensagem || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-xs text-slate-600">{cliente.contato}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      cliente.status === 'novo' ? 'bg-blue-50 text-[#2563eb] border border-blue-100' :
                      cliente.status === 'convertido' ? 'bg-green-50 text-green-700 border border-green-100' :
                      'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {cliente.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-slate-500">
                    {proxFollowUp 
                      ? <span className="italic">{format(new Date(proxFollowUp), "dd 'de' MMM, HH:mm", { locale: ptBR })}</span>
                      : <span className="text-green-600 font-medium">Concluído</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

