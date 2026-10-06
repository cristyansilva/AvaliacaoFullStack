# ⚡ Monitoria Flow — API Back-end

> **Faculdade Municipal de Palhoça (FMP)**  
> **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas (ADS)  
> **Disciplina:** Módulo 2 — Back-end, Node.js, Express e Banco de Dados  
> **Professor Orientador:** Rafael Novo da Rosa  
> **Alinhamento:** ONU ODS 4 — *Educação de Qualidade*

---

## 👥 Equipe de Desenvolvimento

- **Cristyan das Neves Silva** — Back-end & Arquitetura de Servidor
- **Lauren Helena De Oliveira Leao** — Documentação, Estruturação do README e Regras de Negócio
- **Marlon da Silva** — Rotas, Endpoints e Integração
- **Taíse da Rosa** — Testes de Endpoints e Qualidade de Código

---

## 📌 Visão Geral da API

Esta aplicação representa a camada **Back-end** da plataforma **Monitoria Flow**. Ela foi desenvolvida para intermediar a comunicação entre o cliente (Front-end desenvolvido no Módulo 1) e o gerenciamento das regras de negócio do sistema de monitorias da FMP.

A API é responsável por gerenciar solicitações de monitoria individual (**RF07**) e coletiva (**RF08**), listagem de monitores e disponibilidade de horários. 

O projeto adota a **Arquitetura Cliente-Servidor** baseada no protocolo **HTTP**, desenvolvida com **Node.js** e o framework **Express**.

---

## 📋 Mapeamento de Requisitos Atendidos — Aula 08

### 🔹 1. Estrutura Inicial e Gerenciador de Pacotes
- [x] **Projeto Node.js e NPM:** Inicializado via `npm init -y` com a criação do arquivo `package.json`;
- [x] **Instalação do Express:** Framework web instalado como dependência do projeto (`npm install express`);
- [x] **Scripts de Execução:** Scripts de inicialização configurados no `package.json` (`"start"` e `"dev"`);
- [x] **Arquivo Principal:** Servidor configurado no arquivo `server.js` (ou `index.js`).

### 🔹 2. Servidor Express e Comunicação HTTP
- [x] **Servidor Ativo:** Servidor escutando na porta `3000` (ou `3333`);
- [x] **Feedback no Terminal:** Log formatado exibido no terminal informando a inicialização do servidor;
- [x] **Respostas em JSON:** Endpoints configurados para retornar dados estruturados no formato JSON;
- [x] **Status Codes HTTP:** Utilização semântica dos códigos de status HTTP nas respostas (`200 OK`, `201 Created`, `404 Not Found`).

### 🔹 3. Controle de Versão Colaborativo (GitHub)
- [x] **Repositório Público:** Código acessível publicamente no GitHub;
- [x] **Histórico de Commits:** Commits fracionados contendo a participação individual de todos os integrantes do grupo via `git config`.

---

## 🛠️ Tabela de Mapeamento de Endpoints

Abaixo está o mapeamento de todas as rotas criadas para o tema do projeto:

| VERBO | ENDPOINT (URL) | AÇÃO EXECUTADA | STATUS CODE |
| :---: | :--- | :--- | :---: |
| **GET** | `/api/health` | Rota de verificação de status e saúde do servidor | `200 OK` |
| **GET** | `/api/monitorias` | Retorna a lista completa de monitorias cadastradas | `200 OK` |
| **GET** | `/api/monitorias/:id` | Busca os detalhes de uma monitoria específica através do seu ID | `200 OK` / `404 Not Found` |
| **POST** | `/api/monitorias` | Cadastra uma nova solicitação/agendamento de monitoria | `201 Created` |
| **GET** | `/api/monitores` | Retorna a lista com todos os monitores ativos no sistema | `200 OK` |

---

## 📂 Estrutura do Repositório

```text
AvaliacaoFullStack/
├── frontend/             # Código-fonte do Front-end (Módulo 1)
├── backend/              # API REST Back-end (Módulo 2)
│   ├── node_modules/     # Pacotes e dependências instaladas pelo NPM
│   ├── package.json      # Configurações do projeto e scripts
│   ├── package-lock.json # Registro de versões exatas das dependências
│   └── server.js         # Arquivo principal de execução do servidor Express
├── docs/                 # Documentações e arquivos auxiliares
└── README.md             # Documentação principal do projeto integrador
```

---

## 🚀 Como Executar a API Localmente

### Pré-requisitos
- **Node.js** (versão 18.x ou superior)
- **NPM** (gerenciador de pacotes incluso no Node.js)

### Passos para Execução:

1. **Acesse a pasta do Back-end no terminal:**
   ```bash
   cd backend
   ```

2. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

3. **Inicie o servidor Express:**
   ```bash
   npm start
   ```

4. **Confirmação de execução:**
   Após rodar o comando, o terminal exibirá a seguinte confirmação:
   ```text
   🚀 Servidor rodando com sucesso na porta 3000!
   🔗 Acesse: http://localhost:3000/api/monitorias
   ```

---

## 🧪 Exemplos de Requisição e Resposta (JSON)

### 📍 `GET /api/monitorias`
**Resposta (`200 OK`):**
```json
[
  {
    "id": 1,
    "disciplina": "Estrutura de Dados",
    "monitor": "Cristyan Silva",
    "horario": "Terça-feira, 19:00 - 20:30",
    "vagas": 5,
    "tipo": "Individual"
  },
  {
    "id": 2,
    "disciplina": "Programação Web",
    "monitor": "Marlon da Silva",
    "horario": "Quinta-feira, 18:00 - 19:30",
    "vagas": 12,
    "tipo": "Coletiva"
  }
]
```

### 📍 `POST /api/monitorias` (Payload de Envio)
```json
{
  "disciplina": "Banco de Dados I",
  "aluno": "Estudante FMP",
  "tipo": "Individual"
}
```

**Resposta (`201 Created`):**
```json
{
  "mensagem": "Solicitação de monitoria agendada com sucesso!",
  "id": 3,
  "status": "Confirmado"
}
```