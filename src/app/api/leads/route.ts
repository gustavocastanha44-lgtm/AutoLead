import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { nome, contato, mensagem } = await request.json();

    if (!contato) {
      return NextResponse.json({ error: 'Contato é obrigatório' }, { status: 400 });
    }

    // Cria o lead e o follow-up para 24h depois
    const dataEnvioFollowUp = new Date();
    dataEnvioFollowUp.setHours(dataEnvioFollowUp.getHours() + 24);

    const lead = await prisma.cliente.create({
      data: {
        nome,
        contato,
        mensagem,
        status: 'novo',
        followUps: {
          create: {
            mensagem: 'Olá! Vimos que você entrou em contato ontem. Como podemos ajudar?',
            dataEnvio: dataEnvioFollowUp,
            status: 'pendente'
          }
        }
      },
      include: {
        followUps: true
      }
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar lead:', error);
    // Validação de Unique constraint do Prisma
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Contato já cadastrado.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
