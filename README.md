# 🏋️‍♂️ Gym CRM — Biofit

Sistema web de gestão desenvolvido para a **Academia Biofit**, com foco em controle de alunos, planos, pagamentos e indicadores financeiros.

---

## 🌐 Acesso ao Sistema

* 🔗 Frontend: [https://gym-crm-front.onrender.com/](https://gym-crm-front.onrender.com/)
* 🔗 Backend API: [https://gym-crm-pba7.onrender.com](https://gym-crm-pba7.onrender.com)

---

## 🚀 Visão Geral

O **Gym CRM (Biofit)** é uma aplicação web que centraliza toda a operação administrativa da academia, substituindo processos manuais e ferramentas dispersas por uma solução integrada, eficiente e escalável.

---

## 🎯 Funcionalidades

### 👤 Gestão de Alunos

* Cadastro, edição e listagem
* Controle de status (ativo/inativo)
* Identificação de inadimplência

### 💳 Planos

* Criação e gerenciamento de planos
* Vinculação de planos aos alunos

### 💰 Pagamentos

* Registro de pagamentos
* Controle de status (pago / pendente)
* Histórico financeiro por aluno

### 📊 Dashboard

* Total de alunos ativos
* Faturamento
* Inadimplentes
* Novos alunos
* Visualização gráfica com Chart.js

### 🔐 Autenticação

* Login com JWT
* Refresh Token
* Logout seguro
* Proteção de rotas no frontend

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* Angular (Standalone Components)
* Angular Material
* Reactive Forms
* HTTP Interceptor (JWT)
* AuthGuard
* Chart.js

### Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL

### Infraestrutura

* Frontend: Render
* Backend: Render
* Banco de dados: PostgreSQL (Render)

---

## 🏗️ Arquitetura

### Frontend

* Organização por features:

  * alunos
  * planos
  * pagamentos
* Services desacoplados por domínio
* Configuração via environment

### Backend

* Arquitetura modular:

  * controllers → camada HTTP
  * services → regras de negócio
  * routes → endpoints
  * middlewares → autenticação e validações

---

## 🔐 Autenticação

* Access Token (curta duração)
* Refresh Token (persistido no banco)
* Renovação automática via interceptor
* Proteção de rotas com AuthGuard

---

## ⚙️ Como Rodar o Projeto

### 🔧 Backend

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

---

### 💻 Frontend

```bash
npm install
ng serve
```

Configuração:

```ts
export const environment = {
  apiUrl: 'https://gym-crm-pba7.onrender.com'
};
```

---

## 🔒 Variáveis de Ambiente (Backend)

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
PORT=3000
```

---

## 📌 Status do Projeto

### ✅ Implementado

* Backend com Prisma e PostgreSQL
* Autenticação JWT + refresh token
* CRUD de alunos
* Dashboard com indicadores
* Integração completa frontend ↔ backend

### 🚧 Em evolução

* Módulo financeiro avançado
* Controle de permissões (roles)
* Melhorias de UI/UX
* Segurança (CORS e validações)

---

## 🔮 Próximas Evoluções

* Controle de acesso por perfil (ADMIN / USER)
* Relatórios financeiros mais completos
* Melhorias na experiência do usuário
* Otimizações de performance

---

## 🧠 Considerações Técnicas

O sistema foi desenvolvido com foco em:

* Separação clara de responsabilidades
* Código modular e escalável
* Facilidade de manutenção
* Evolução contínua da aplicação

---

## 👨‍💻 Desenvolvimento

Projeto desenvolvido por [@lizianegarcia](https://github.com/lizianegarcia)

---
