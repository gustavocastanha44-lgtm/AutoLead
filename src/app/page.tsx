import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const revalidate = 10;

export default async function Dashboard() {
  const clientes = await prisma.cliente.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      followUps: {
        orderBy: { dataEnvio: 'desc' },
      },
    },
  });

  const totais = {
    novos: clientes.filter((c: any) => c.status === 'novo').length,
    convertidos: clientes.filter((c: any) => c.status === 'convertido').length,
    total: clientes.length,
    followUpsPendentes: clientes.flatMap((c: any) => c.followUps).filter((f: any) => f.status === 'pendente').length
  };

  return (
    <main className="min-h-screen p-8 md:p-12 lg:p-24 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>
            AutoLead<span className="text-primary" style={{ color: 'var(--color-primary)' }}>.</span>
          </h1>
          <p className="text-gray-400 text-lg">Visão geral dos seus atendimentos automatizados</p>
        </div>
        
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ backgroundColor: 'var(--color-success)' }}></div>
          <span className="text-sm font-medium">Automação Ativa</span>
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total de Leads', value: totais.total, color: 'text-white' },
          { label: 'Novos', value: totais.novos, color: 'text-primary' },
          { label: 'Follow-ups Pendentes', value: totais.followUpsPendentes, color: 'text-orange-400' },
          { label: 'Convertidos', value: totais.convertidos, color: 'text-green-500' },
        ].map((kpi, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-gray-400 text-sm font-medium mb-2">{kpi.label}</h3>
            <p className={`text-4xl font-bold ${kpi.color}`} style={{ fontFamily: 'var(--font-outfit)', ...(kpi.color === 'text-primary' ? { color: 'var(--color-primary)' } : {}) }}>
              {kpi.value}
            </p>
          </div>
        ))}
      </section>

      {/* Leads Table */}
      <section className="glass rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-outfit)' }}>Leads Recentes</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-6 font-medium">Cliente</th>
                <th className="p-6 font-medium">Contato</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium">Próximo Follow-up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clientes.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">Nenhum lead recebido ainda.</td>
                </tr>
              )}
              {clientes.map((cliente) => {
                const pendentes = cliente.followUps.filter(f => f.status === 'pendente');
                const proxFollowUp = pendentes.length > 0 ? pendentes[0].dataEnvio : null;

                return (
                  <tr key={cliente.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-6">
                      <div className="font-medium text-white">{cliente.nome || 'Sem Nome'}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs" title={cliente.mensagem || ''}>
                        {cliente.mensagem || '-'}
                      </div>
                    </td>
                    <td className="p-6 text-gray-300">{cliente.contato}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        cliente.status === 'novo' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                        cliente.status === 'convertido' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                        'bg-gray-800 border-gray-700 text-gray-300'
                      }`}>
                        {cliente.status}
                      </span>
                    </td>
                    <td className="p-6 text-gray-400 text-sm">
                      {proxFollowUp 
                        ? format(new Date(proxFollowUp), "dd 'de' MMMM, HH:mm", { locale: ptBR })
                        : 'Concluído'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
