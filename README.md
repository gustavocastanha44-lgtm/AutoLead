# 🚀 AutoLead - MVP de Automação de Atendimento e Follow-up

O **AutoLead** é um sistema inteligente de gestão de leads e automação de atendimento focado em pequenas e médias empresas. Ele resolve o problema de perda de vendas por falta de resposta rápida ou esquecimento de follow-up.

Este projeto é um MVP funcional que combina um Dashboard moderno com um motor de automação invisível.

---

## ✨ Funcionalidades Principais

- **Dashboard Premium:** Visualização clara de métricas (leads novos, convertidos, pendentes) em uma interface arrojada com Dark Mode e Glassmorphism.
- **Captura Multicanal:** Rotas de API prontas para receber leads tanto de formulários de sites quanto de webhooks de WhatsApp (ex: Evolution API, Z-API).
- **Follow-up Inteligente:** O sistema agenda automaticamente uma mensagem de acompanhamento para 24 horas após o primeiro contato do cliente.
- **Motor de CRON:** Script integrado para varredura e disparo automático das mensagens agendadas.
- **Persistência Leve:** Utiliza SQLite com Prisma ORM para máxima performance com zero configuração de infraestrutura.

---

## 🛠️ Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework React para alta performance e SSR.
- **[Prisma ORM](https://www.prisma.io/)** - Modelagem de dados e comunicação eficiente com o banco.
- **[SQLite](https://www.sqlite.org/)** - Banco de dados local rápido e confiável.
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Estilização moderna e responsiva.
- **[Date-fns](https://date-fns.org/)** - Manipulação inteligente de datas e horários.

---

## 🚀 Como Iniciar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/gustavocastanha44-lgtm/AutoLead.git
cd AutoLead
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar o Banco de Dados
O projeto já vem com o SQLite configurado. Basta gerar o cliente do Prisma:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Rodar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📡 Endpoints de Integração (Webhooks)

### Receber Lead do Site
`POST /api/leads`
Corpo esperado: `{ "nome": "...", "contato": "...", "mensagem": "..." }`

### Webhook do WhatsApp
`POST /api/webhook/whatsapp`
Corpo esperado: `{ "contact": "...", "message": "...", "name": "..." }`

### Processar Follow-ups (CRON)
`GET /api/cron`
*Dica: Configure um serviço de CRON externo para chamar esta URL a cada 1 hora.*

---

## 📂 Estrutura do Projeto

```text
├── prisma/             # Schema e Migrations do Banco de Dados
├── src/
│   ├── app/            # Páginas e Rotas da API (Next.js App Router)
│   │   ├── api/        # Endpoints de Automação e Cron
│   │   └── page.tsx    # Dashboard Visual do Empresário
│   ├── lib/            # Configurações do Prisma Client
│   └── globals.css     # Design System e Estilos Globais
└── package.json        # Dependências e Scripts do Projeto
```

---

## 👨‍💻 Desenvolvedor
Criado como um MVP de alta performance para automação de processos comerciais.

---
*Este projeto foi desenvolvido com foco em simplicidade, rapidez e conversão.*
