/**
 * Serviço simples para envio de mensagens via WhatsApp (Mock ou Real)
 * Integra com Evolution API ou qualquer API que aceite POST JSON
 */

export async function sendWhatsAppMessage(to: string, text: string) {
  const apiUrl = process.env.WHATSAPP_API_URL;
  const apiKey = process.env.WHATSAPP_API_KEY;

  console.log(`[WhatsApp Service] Tentando enviar notificação para ${to}...`);

  if (!apiUrl || !apiKey) {
    console.warn('⚠️ WHATSAPP_API_URL ou WHATSAPP_API_KEY não configurados no .env');
    console.log(`[MOCK NOTIFICATION] Mensagem: ${text}`);
    return { success: false, error: 'Configuração ausente' };
  }

  try {
    // Exemplo de integração com Evolution API (padrão comum)
    // Se a sua API for diferente, ajustaremos o payload aqui.
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({
        number: to,
        text: text
      })
    });

    const data = await response.json();
    console.log('[WhatsApp Service] Resposta da API:', data);
    
    return { success: response.ok, data };
  } catch (error) {
    console.error('[WhatsApp Service] Erro ao enviar mensagem:', error);
    return { success: false, error };
  }
}
