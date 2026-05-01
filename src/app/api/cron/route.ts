import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const NAMES = [
  'Ana Silva', 'Bruno Oliveira', 'Carla Souza', 'Diego Santos', 
  'Elena Lima', 'Felipe Costa', 'Gisele Rocha', 'Hugo Mendes',
  'Isabela Ferreira', 'João Pereira', 'Kelly Oliveira', 'Lucas Lima',
  'Mariana Costa', 'Natan Souza', 'Olivia Santos', 'Paulo Rocha'
];

const MESSAGES = [
  'Quero saber mais sobre os serviços.',
  'Como funciona a automação?',
  'Tenho interesse no plano premium.',
  'Pode me mandar a tabela de preços?',
  'Gostaria de agendar uma demonstração.',
  'Vi seu anúncio no Instagram e fiquei curioso.',
  'Vocês atendem empresas de qual porte?',
  'Quero automatizar meu atendimento, como começo?',
];

async function generateRandomLead() {
  const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
  const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  const randomContact = `55119${Math.floor(10000000 + Math.random() * 90000000)}`;

  const dataEnvioFollowUp = new Date();
  dataEnvioFollowUp.setHours(dataEnvioFollowUp.getHours() + 24);

  return prisma.cliente.create({
    data: {
      nome: randomName,
      contato: randomContact,
      mensagem: randomMsg,
      status: 'novo',
      followUps: {
        create: {
          mensagem: `Olá ${randomName.split(' ')[0]}! Tudo bem? Ontem você entrou em contato sobre "${randomMsg}". Conseguiu analisar?`,
          dataEnvio: dataEnvioFollowUp,
          status: 'pendente'
        }
      }
    }
  });
}

export async function GET(request: Request) {
  try {
    const agora = new Date();
    const { searchParams } = new URL(request.url);
    const shouldGenerateLead = searchParams.get('generate') === 'true' || Math.random() < 0.1; // 10% de chance de gerar lead em cada execução do cron

    // 1. Processar Follow-ups
    const followUps = await prisma.followUp.findMany({
      where: {
        status: 'pendente',
        dataEnvio: { lte: agora },
      },
      include: { cliente: true },
    });

    const processados = [];
    for (const followUp of followUps) {
      console.log(`[CRON] Disparando WhatsApp para ${followUp.cliente.nome || followUp.cliente.contato}`);
      await prisma.followUp.update({
        where: { id: followUp.id },
        data: { status: 'enviado' },
      });
      processados.push(followUp.id);
    }

    // 2. Gerar Lead Aleatório (opcional)
    let leadGerado = null;
    if (shouldGenerateLead) {
      leadGerado = await generateRandomLead();
      console.log(`[CRON] Novo lead gerado: ${leadGerado.nome}`);
    }

    return NextResponse.json({ 
      success: true,
      followUpsEnviados: processados.length,
      leadGerado: leadGerado ? leadGerado.nome : 'Nenhum'
    }, { status: 200 });

  } catch (error) {
    console.error('Erro no cron consolidado:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
