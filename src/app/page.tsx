import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import SideNavBar from '@/components/SideNavBar';
import DashboardKPIs from '@/components/DashboardKPIs';
import LeadsTable from '@/components/LeadsTable';

export const dynamic = 'force-dynamic';
export const revalidate = 10;

export default async function Dashboard(props: { 
  searchParams: Promise<{ name?: string, date?: string }> 
}) {
  const searchParams = await props.searchParams;
  const { name, date } = searchParams;

  const whereClause: any = {};
  
  if (name) {
    whereClause.nome = {
      contains: name,
      mode: 'insensitive',
    };
  }

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);
    
    whereClause.createdAt = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  const clientes = await prisma.cliente.findMany({
    where: whereClause,
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
    <>
      <Header />
      <SideNavBar />
      <main className="lg:ml-64 pt-24 px-6 md:px-12 pb-12 min-h-screen w-full lg:w-[calc(100%-16rem)]">
        <div className="mb-10">
          <h1 className="font-h1 text-h2 md:text-h1 text-on-surface mb-2">Visão Geral</h1>
          <p className="text-on-surface-variant font-body-lg">Acompanhe seus leads e automações em tempo real.</p>
        </div>
        
        <DashboardKPIs totais={totais} />
        
        <LeadsTable clientes={clientes} />
      </main>
    </>
  );
}
