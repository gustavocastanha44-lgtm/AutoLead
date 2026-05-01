import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LeadsTableProps {
  clientes: any[];
}

export default function LeadsTable({ clientes }: LeadsTableProps) {
  return (
    <section className="glass-panel rounded-xl overflow-hidden shadow-2xl">
      <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-h3 text-on-surface">Leads Recentes</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-surface-container-high border border-white/5 font-label-caps hover:bg-surface-variant transition-colors cursor-pointer">Filtrar</button>
          <button className="px-4 py-2 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 font-label-caps hover:bg-[#3b82f6]/20 transition-colors cursor-pointer">Ver Todos</button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 font-label-caps text-on-surface-variant border-b border-white/5">
            <tr>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Contato</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Próximo Follow-up</th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-on-surface">
            {clientes.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-on-surface-variant">Nenhum lead recebido ainda.</td>
              </tr>
            )}
            
            {clientes.map((cliente) => {
              const pendentes = cliente.followUps?.filter((f: any) => f.status === 'pendente') || [];
              const proxFollowUp = pendentes.length > 0 ? pendentes[0].dataEnvio : null;
              
              return (
                <tr key={cliente.id} className="hover:bg-white/[0.03] border-b border-white/[0.05] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface font-['Inter']">{cliente.nome || 'Sem Nome'}</span>
                      <span className="text-xs text-on-surface-variant mt-0.5 truncate max-w-[200px]" title={cliente.mensagem || ''}>
                        {cliente.mensagem || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-xs">{cliente.contato}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      cliente.status === 'novo' ? 'bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/20' :
                      cliente.status === 'convertido' ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/20' :
                      'bg-gray-800 text-gray-300 border border-gray-700'
                    }`}>
                      {cliente.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-on-surface-variant">
                    {proxFollowUp 
                      ? <span className="italic">{format(new Date(proxFollowUp), "dd 'de' MMM, HH:mm", { locale: ptBR })}</span>
                      : <span className="text-secondary font-medium">Concluído</span>}
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
