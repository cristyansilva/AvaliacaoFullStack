# ⚡ Monitoria Flow — Plataforma Acadêmica Integrada

> **Faculdade Municipal de Palhoça (FMP)**  
> **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas (ADS)  
> **Disciplina:** Avaliação Full Stack & Back-End
> **Professores Orientadores:** Rafael Novo da Rosa  
> **Alinhamento:** ONU ODS 4 — *Educação de Qualidade*

---

## 👥 Equipe de Desenvolvimento

- **Cristyan das Neves Silva** — Front-End Lead, Arquitetura de Componentes & Back-End
- **Marlon da Silva** — Integração, Modelagem de Dados, SQL & Testes
- **Lauren Helena De Oliveira Leao** — UI/UX Design, Engenharia de Requisitos & Documentação
- **Taíse da Rosa** — Garantia de Qualidade, Estilização e Testes

---

## 📌 Visão do Produto

O **Monitoria Flow** é uma plataforma digital integrada desenvolvida para simplificar, organizar e democratizar o programa de monitorias do curso de Análise e Desenvolvimento de Sistemas da FMP. 

A aplicação permite aos acadêmicos encontrar horários, disciplinas atendidas, corpo de monitores e agendar atendimentos individuais (**RF07**) ou coletivos pré-avaliação (**RF08**), com controle automatizado de vagas, validação de frequência, persistência em **banco de dados PostgreSQL** e integração com comunidades de estudo.

---

## 📋 Mapeamento de Requisitos Atendidos por Aula

### 🔹 AULA 02 — Git e GitHub, SCSS, Box Model e Flexbox
- [x] **Repositório Público no GitHub:** Histórico de commits fracionados com a participação da equipe;
- [x] **Estilização com SCSS:** Arquitetura modular (`_variables.scss`, `_responsive.scss`, `global.scss`), variáveis de tema, aninhamento (*nesting*) e múltiplos mixins (`@mixin tablet`, `@mixin desktop`, `@mixin flex-center`);
- [x] **Layout com Flexbox:** Aplicado no cabeçalho/navbar, agrupamentos de botões, headers/footers dos cards de monitoria e layout principal;
- [x] **Aplicação de Box Model:** Configuração explícita de `box-sizing: border-box`, `padding`, `margin` e `border`.

### 🔹 AULA 03 — Responsividade + Fundamentos de JavaScript
- [x] **Mobile-First & Media Queries:** Estilos base desenhados para mobile com breakpoints adaptativos para tablet (`≥ 768px`) e desktop (`≥ 1024px`);
- [x] **Layout Adaptado a 3 Tamanhos:** Celular (< 768px), Tablet (768px - 1023px) e Desktop (≥ 1024px);
- [x] **JavaScript Moderno:** Aplicação de `let` e `const`, tipos primitivos e complexos (arrays de objetos), condicionais lógicas, loops `for`, funções com parâmetros e manipulação de eventos de interação em tela.

### 🔹 AULA 04 — React: Componentes, Hooks e Rotas
- [x] **Projeto React com Vite:** Setup ultra-rápido com Vite;
- [x] **Componentização Reutilizável (`src/components/`):**
  - `Navbar`: Menu de navegação superior com links do React Router e alternância mobile;
  - `CardMonitoria`: Card de monitoria com badge, tópicos, cálculo de vagas e botão de ação interativo;
  - `Badge`: Etiqueta com variantes semânticas (`success`, `warning`, `info`, `danger`);
  - `FiltroBar`: Barra de pesquisa e filtros combinados por texto, disciplina e tipo de atendimento;
  - `FormSolicitacao`: Formulário de requisição com validação de dados e alertas de feedback;
- [x] **useState em Interações:**
  - Formulário controlado com estados de dados, validação de erros e alertas de sucesso;
  - Busca textual em tempo real e filtros dinâmicos;
  - Contadores de vagas atualizados reativamente;
  - Inscrição e cancelamento dinâmico de vagas com reserva em tempo real;
- [x] **Renderização de Listas:** Uso intensivo de `map()` com `key` única em todas as coleções;
- [x] **Rotas com React Router:** 5 rotas funcionais com navegação via `<Link>`:
  - `/` — Painel Geral de Monitorias Disponíveis e Estatísticas;
  - `/solicitar` — Solicitação de Monitoria Individual ou Coletiva (RF07 / RF08);
  - `/monitores` — Catálogo de Monitores Ativos e Agendas;
  - `/comunidade` — Fórum Integrado com API Externa;
  - `/sobre` — Apresentação Institucional e Compromisso com a ODS 4.

### 🔹 AULA 05 — Consumo de API, Next.js com Tailwind, Testes e Deploy
- [x] **Consumo de API Pública com Axios:** Requisição `GET` com `axios`, gerenciada por ciclo de vida `useEffect`, tratamentos de estados com `useState` (`carregando`, `erro`, `dados`) e renderização com `map()`;
- [x] **Página Institucional em Next.js com Tailwind CSS:**
  - Criada no diretório `/institucional-next`;
  - Estilização moderna com Tailwind CSS;
  - Responsividade explícita com os utilitários `sm:`, `md:`, `lg:`;
  - Seções: Hero, Estatísticas, Diferenciais, ODS 4 ONU, Equipe e FAQ;
- [x] **Testes Automatizados (Jest & React Testing Library):**
  - Suíte de testes com **Vitest** (100% Jest compatível) e **React Testing Library**;
  - Testes unitários para funções de regras de negócio (`helpers.test.js`);
  - Testes de renderização e disparo de eventos em componentes (`CardMonitoria.test.jsx`);
  - **11 testes passando com 100% de sucesso**;
- [x] **Deploy na Vercel:**
  - Configuração de roteamento SPA com `vercel.json`;
  - Preparado para publicação tanto do SPA React quanto da Landing Page Next.js.

### 🔹 AULA 10 — Modelagem e Banco de Dados Relacional (PostgreSQL)
- [x] **Estruturação Física SQL (`db/script.sql`):** Script DDL e DML completo contendo a criação do banco de dados na raiz do repositório;
- [x] **Relacionamentos Mapeados:**
  - **1:N**: `disciplinas` ➔ `monitorias` e `usuarios` (monitores) ➔ `monitorias`;
  - **N:N**: `usuarios` (alunos) ↔ `monitorias` via tabela associativa `agendamentos`;
- [x] **Integridade de Dados:** Definição explicita de `PRIMARY KEY`, `FOREIGN KEY` com `REFERENCES ... ON DELETE CASCADE`, `NOT NULL`, `UNIQUE` e `CHECK`;
- [x] **Povoamento DML:** Pelo menos 4 registros `INSERT` por tabela para testes do ambiente acadêmico;
- [x] **Consultas Avançadas DQL:** `SELECT` estruturado com múltiplos `JOIN`s relacionando alunos, disciplinas, monitores, horários e status da reserva.

---

## 🗄️ Modelagem e Banco de Dados PostgreSQL (Aula 10)

O banco de dados relacional **PostgreSQL** é responsável pela persistência das informações. O script de criação e povoamento está localizado na pasta **`db/`** na raiz do projeto (`db/script.sql`).

### 📌 Mapeamento das Tabelas e Entidades:
- **`usuarios`**: Tabela principal para armazenamento de alunos, monitores e professores (PK: `id`).
- **`disciplinas`**: Cataloga as disciplinas ofertadas na grade curricular do curso de ADS (PK: `id`).
- **`monitorias`**: Registra as ofertas de atendimento dos monitores (PK: `id`, FKs para `disciplinas` e `usuarios`).
- **`agendamentos`**: Tabela associativa que resolve o relacionamento N:N entre alunos (`usuarios`) e `monitorias` (PK: `id`, FKs para `usuarios` e `monitorias`).

---

## 🛠️ Tabela de Endpoints da API (Back-End)

| MÉTODO | ENDPOINT (URL) | DESCRIÇÃO / AÇÃO | MIDDLEWARE | STATUS CODES |
| :---: | :--- | :--- | :---: | :---: |
| **GET** | `/api/monitorias` | Lista todas as monitorias cadastradas | Log | `200 OK` |
| **GET** | `/api/monitorias/:id` | Busca monitoria específica por ID | Log | `200 OK` / `404 Not Found` |
| **POST** | `/api/monitorias` | Cadastra uma nova oferta de monitoria | Log + Validação | `201 Created` / `400 Bad Request` |
| **PUT** | `/api/monitorias/:id` | Atualiza dados de uma monitoria | Log + Validação | `200 OK` / `400 Bad Request` / `404 Not Found` |
| **DELETE** | `/api/monitorias/:id` | Remove uma monitoria cadastrada | Log | `200 OK` / `404 Not Found` |

---

## 📂 Estrutura de Pastas do Repositório

```text
AvaliacaoFullStack/
├── db/                   # 🗄️ Modelagem e Scripts do Banco de Dados (Aula 10)
│   └── script.sql        # Script DDL (CREATE TABLE), DML (INSERTs) e DQL (SELECT JOIN)
├── backend/              # ⚙️ Servidor API RESTful (Node.js + Express)
│   ├── node_modules/     # Dependências (ignorado pelo Git)
│   ├── .env              # Variáveis de ambiente (ignorado pelo Git)
│   ├── package.json      # Dependências do servidor Express e scripts npm
│   └── server.js         # Servidor Express com Middlewares, Rotas e Regras
├── frontend/             # 💻 Aplicação Principal em React SPA (Vite)
│   ├── src/              # Componentes, Páginas, Hooks e Testes Vitest
│   └── package.json      # Dependências do React e scripts de teste/build
├── institucional-next/   # 🌐 Landing Page Institucional (Next.js + Tailwind CSS)
├── docs/                 # 📄 Documentação complementar, diagramas e anexos
├── vercel.json           # ⚙️ Configuração de rewrite para SPA na Vercel
└── README.md             # 📝 Documentação principal do projeto
```

---

## 🚀 Como Executar o Projeto Localmente

### 📋 Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18.x ou superior)
- **NPM** (gerenciador de pacotes do Node)
- **PostgreSQL** e **pgAdmin 4** (ou cliente SQL de sua preferência)
- **Git**

---

### 1️⃣ Passo 1: Configurar o Banco de Dados (PostgreSQL)

1. Abra o **pgAdmin 4** e conecte-se ao seu servidor local do PostgreSQL.
2. Crie um novo Banco de Dados chamado: `monitoria_flow_db`
3. Selecione o banco criado e abra a ferramenta **Query Tool** (`Ctrl + Shift + Q`).
4. Importe ou cole o conteúdo do arquivo localizado na raiz do projeto:
   ```text
   db/script.sql
   ```
5. Pressione **F5** (ou clique em *Execute*) para rodar o script.
6. **Resultado Esperado:** O script criará as 4 tabelas (`usuarios`, `disciplinas`, `monitorias`, `agendamentos`), inserirá os dados de teste e exibirá os resultados do `SELECT` com `JOIN`.

---

### 2️⃣ Passo 2: Executar o Back-end (API Express)

1. No terminal, acesse a pasta do servidor:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na pasta `backend/` e configure a porta de execução:
   ```env
   PORT=3000
   ```
4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
5. **Confirmação:** O terminal exibirá:
   ```text
   🚀 Servidor rodando com sucesso na porta 3000!
   ```

---

### 3️⃣ Passo 3: Executar a Aplicação Principal (React SPA)

1. Em uma nova janela/aba do terminal, acesse a pasta do Front-end a partir da raiz:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute a aplicação e a suíte de testes:
   ```bash
   # Iniciar o servidor de desenvolvimento Vite
   npm run dev

   # Executar a suíte de testes automatizados (Vitest)
   npm run test

   # Executar o linter
   npm run lint

   # Gerar o build de produção
   npm run build
   ```
4. Acesse a aplicação no seu navegador (geralmente em `http://localhost:5173`).

---

### 4️⃣ Passo 4: Executar a Página Institucional (Next.js + Tailwind)

1. Para rodar a landing page do Next.js a partir da raiz do projeto:
   ```bash
   npm run dev:next
   ```
2. Ou entre diretamente na pasta do Next.js:
   ```bash
   cd institucional-next
   npm install
   npm run dev
   ```
3. Acesse a landing page no seu navegador (geralmente em `http://localhost:3001`).

---

## 🌐 Instruções de Deploy na Vercel

### Deploy da Aplicação React (SPA)
1. Conecte o repositório na [Vercel](https://vercel.com);
2. Selecione a raiz do projeto (`./`);
3. Framework Preset: **Vite**;
4. O arquivo `vercel.json` na raiz já contém o rewrite para roteamento SPA sem erros 404:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
5. Clique em **Deploy**.

### Deploy da Página Institucional Next.js
1. Na Vercel, crie um novo projeto importando o mesmo repositório;
2. Defina o **Root Directory** como `institucional-next`;
3. Framework Preset: **Next.js**;
4. Clique em **Deploy**.