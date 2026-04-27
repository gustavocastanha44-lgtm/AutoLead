import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Num ambiente de produção, adicione uma verificação de Authorization Header
  // para garantir que apenas seu serviço de CRON consiga chamar essa rota.

  try {
    const agora = new Date();

    // Busca follow-ups pendentes onde a data de envio já passou
    const followUps = await prisma.followUp.findMany({
      where: {
        status: 'pendente',
        dataEnvio: {
          lte: agora,
        },
      },
      include: {
        cliente: true,
      },
    });

    if (followUps.length === 0) {
      return NextResponse.json({ message: 'Nenhum follow-up pendente para agora.' }, { status: 200 });
    }

    const processados = [];

    for (const followUp of followUps) {
      const { cliente, mensagem } = followUp;

      // TODO: Aqui entraria a chamada para a API do WhatsApp real (Evolution API, etc)
      console.log(`[CRON] Disparando WhatsApp para ${cliente.nome || cliente.contato}: "${mensagem}"`);

      // Atualiza o status do follow-up para enviado
      await prisma.followUp.update({
        where: { id: followUp.id },
        data: { status: 'enviado' },
      });

      processados.push(followUp.id);
    }

    return NextResponse.json({ 
      message: `${processados.length} follow-ups enviados com sucesso.`,
      ids: processados 
    }, { status: 200 });

  } catch (error) {
    console.error('Erro ao processar cron de follow-up:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
