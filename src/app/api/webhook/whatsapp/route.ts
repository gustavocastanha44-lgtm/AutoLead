import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWhatsAppMessage } from '@/lib/whatsapp';


// Webhook mock para WhatsApp (ex: Evolution API)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Formato mock. Na API real, os campos variam.
    // Exemplo: { "contact": "551199999999", "message": "Olá", "name": "Guilherme" }
    const contato = body.contact || body.from;
    const mensagem = body.message || body.body;
    const nome = body.name || body.pushName || 'Desconhecido';

    if (!contato) {
      return NextResponse.json({ error: 'Contato não fornecido' }, { status: 400 });
    }

    // Verifica se já existe
    let cliente = await prisma.cliente.findUnique({
      where: { contato }
    });

    if (!cliente) {
      // Novo cliente: agenda follow up
      const dataEnvioFollowUp = new Date();
      dataEnvioFollowUp.setHours(dataEnvioFollowUp.getHours() + 24);

      cliente = await prisma.cliente.create({
        data: {
          nome,
          contato,
          mensagem,
          status: 'novo',
          followUps: {
            create: {
              mensagem: 'Olá! Recebemos sua mensagem ontem pelo WhatsApp. Conseguiu resolver?',
              dataEnvio: dataEnvioFollowUp,
              status: 'pendente'
            }
          }
        }
      });

      // Dispara auto-resposta imediata (Mock)
      console.log(`[WhatsApp API Mock] Enviando auto-resposta para ${contato}: Olá ${nome}, recebemos sua mensagem e retornaremos em breve!`);

      // Notifica o Administrador
      const adminPhone = process.env.ADMIN_PHONE;
      if (adminPhone) {
        await sendWhatsAppMessage(adminPhone, `🚀 *Novo Lead no Dashboard!*\n\n*Nome:* ${nome}\n*Contato:* ${contato}\n*Mensagem:* ${mensagem}`);
      }

    } else {
      // Cliente já existe, apenas atualiza mensagem ou ignora auto-resposta (depende da regra)
      console.log(`[WhatsApp API Mock] Mensagem recebida de contato existente (${contato}).`);
    }

    return NextResponse.json({ success: true, cliente }, { status: 200 });

  } catch (error: any) {
    console.error('Erro no Webhook WhatsApp:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
