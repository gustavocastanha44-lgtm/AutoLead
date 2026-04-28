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

export async function GET() {
  try {
    const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
    const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    // Gera um número aleatório no formato 55119XXXXXXXX
    const randomContact = `55119${Math.floor(10000000 + Math.random() * 90000000)}`;

    const dataEnvioFollowUp = new Date();
    dataEnvioFollowUp.setHours(dataEnvioFollowUp.getHours() + 24);

    const cliente = await prisma.cliente.create({
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

    return NextResponse.json({ 
      success: true, 
      message: 'Lead aleatório gerado com sucesso!',
      cliente 
    }, { status: 200 });

  } catch (error) {
    console.error('Erro ao gerar lead aleatório:', error);
    return NextResponse.json({ error: 'Erro interno ao gerar lead' }, { status: 500 });
  }
}
