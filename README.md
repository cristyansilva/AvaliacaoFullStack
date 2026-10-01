# ⚡ Monitoria Flow — Plataforma Acadêmica Integrada

> **Faculdade Municipal de Palhoça (FMP)**  
> **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas (ADS)  
> **Disciplina:** Projeto Integrador III / Avaliação Full Stack  
> **Professora Orientadora:** Daniela Amorim  
> **Alinhamento:** ONU ODS 4 — *Educação de Qualidade*

---

## 👥 Equipe de Desenvolvimento

- **Cristyan das Neves Silva** — Front-End Lead & Arquitetura de Componentes
- **Marlon da Silva** — Integração, Modelagem de Dados e Testes
- **Lauren Helena De Oliveira Leao** — UI/UX Design & Engenharia de Requisitos
- **Taíse da Rosa** — Garantia de Qualidade, Estilização e Testes

---

## 📌 Visão do Produto

O **Monitoria Flow** é uma plataforma digital integrada desenvolvida para simplificar, organizar e democratizar o programa de monitorias do curso de Análise e Desenvolvimento de Sistemas da FMP. 

A aplicação permite aos acadêmicos encontrar horários, disciplinas atendidas, corpo de monitores e agendar atendimentos individuais (**RF07**) ou coletivos pré-avaliação (**RF08**), com controle automatizado de vagas, validação de frequência e integração com comunidades de estudo.

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
- [x] **Projeto React com Vite:** Setup ultra-rápido com Vite v8;
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

---

## 🌿 Estrutura de Branches do Projeto

O desenvolvimento foi organizado em branches separadas com commits fracionados:

- `main` — Branch principal com a documentação do projeto e base inicial;
- `aula-04` — Branch com a implementação completa de componentes React, useState e React Router;
- `aula-05` — Branch com consumo de API externa (Axios), testes automatizados (Testing Library/Vitest) e aplicação institucional em Next.js + Tailwind CSS.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Gerenciador de pacotes npm

### 1. Aplicação Principal (React SPA)
```bash
# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Executar a suíte de testes automatizados
npm run test

# Executar o linter
npm run lint

# Gerar build de produção
npm run build
```

### 2. Página Institucional (Next.js + Tailwind CSS)
```bash
# Executar a partir da raiz:
npm run dev:next

# Ou dentro da pasta institucional-next:
cd institucional-next
npm install
npm run dev
```

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
