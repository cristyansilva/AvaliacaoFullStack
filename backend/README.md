# ⚡ Monitoria Flow — API Back-end (v2.0)

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

## 📌 Visão Geral e Evolução da API (v2.0)

Nesta segunda versão (v2.0), a API da plataforma **Monitoria Flow** evoluiu de uma estrutura básica para um servidor robusto e completo, preparado para o gerenciamento dinâmico de solicitações de monitoria individual (**RF07**) e coletiva (**RF08**).

### 🚀 Principais Novidades da Versão 2.0:
1. **Reinício Automático (Nodemon):** Configuração do ambiente de desenvolvimento com atualização automática a cada alteração salva.
2. **Segurança e Configuração (.env e .gitignore):** Isolamento de variáveis de ambiente sensíveis (porta do servidor) e proteção de arquivos locais no GitHub.
3. **Middlewares ("Porteiros"):**
   - **Log de Requisições:** Registro em tempo real no terminal de todas as chamadas HTTP (Data/Hora, Método e URL).
   - **Validação de Payload:** Interceptação e validação de dados obrigatórios em requisições de criação e edição.
   - **Tratamento de Rotas Inexistentes:** Middleware global para captura de erros 404.
4. **CRUD Completo com Parâmetros de Rota:** Implementação dos métodos **GET**, **POST**, **PUT** e **DELETE** com conversão explícita de tipos de parâmetros (`req.params.id`) e tratamento semântico de status codes HTTP (`200`, `201`, `400`, `404`).

---

## 📋 Mapeamento de Requisitos Atendidos — Aula 09

### 🔹 1. Ambiente e Ferramentas de Desenvolvimento
- [x] **Nodemon Instalado:** Dependência de desenvolvimento (`npm install nodemon --save-dev`) configurada no `package.json`;
- [x] **Scripts Atualizados:** Adicionado o script `"dev": "nodemon server.js"` para execução dinâmica;
- [x] **Dotenv Configurado:** Biblioteca `dotenv` aplicada para leitura de variáveis do arquivo `.env` (`process.env.PORT`).

### 🔹 2. Segurança e Arquivos de Configuração
- [x] **Arquivo `.env`:** Criação e isolamento da porta de execução (`PORT=3000`);
- [x] **Arquivo `.gitignore`:** Proteção das pastas e arquivos sensíveis (`node_modules` e `.env`) para evitar upload no repositório.

### 🔹 3. Middlewares e Validações
- [x] **Middleware Global de JSON:** `app.use(express.json())` configurado para leitura do corpo da requisição (`req.body`);
- [x] **Middleware de Logging:** Função `registrarLog` para exibição de logs no terminal a cada requisição;
- [x] **Middleware de Validação:** Função `validarMonitoria` para garantir o envio de campos obrigatórios (`disciplina` e `monitor`);
- [x] **Middleware Fallback (404):** Captura de requisições enviadas para rotas não registradas.

### 🔹 4. Rotas CRUD e Status Codes HTTP
- [x] **GET `/api/monitorias`:** Retorna a lista completa de monitorias (`200 OK`);
- [x] **GET `/api/monitorias/:id`:** Busca individual com conversão do ID para tipo `Number` (`200 OK` ou `404 Not Found`);
- [x] **POST `/api/monitorias`:** Cadastro de monitorias com validação de corpo (`201 Created` ou `400 Bad Request`);
- [x] **PUT `/api/monitorias/:id`:** Atualização de monitorias existentes (`200 OK`, `400 Bad Request` ou `404 Not Found`);
- [x] **DELETE `/api/monitorias/:id`:** Remoção de registro pelo ID (`200 OK` ou `404 Not Found`).

---

## 🛠️ Tabela de Endpoints da API (v2.0)

| MÉTODO | ENDPOINT (URL) | DESCRIÇÃO / AÇÃO | MIDDLEWARE | STATUS CODES |
| :---: | :--- | :--- | :---: | :---: |
| **GET** | `/api/monitorias` | Lista todas as monitorias em memória | Log | `200 OK` |
| **GET** | `/api/monitorias/:id` | Busca monitoria específica por ID | Log | `200 OK` / `404 Not Found` |
| **POST** | `/api/monitorias` | Cadastra uma nova monitoria | Log + Validação | `201 Created` / `400 Bad Request` |
| **PUT** | `/api/monitorias/:id` | Atualiza os dados de uma monitoria | Log + Validação | `200 OK` / `400 Bad Request` / `404 Not Found` |
| **DELETE** | `/api/monitorias/:id` | Remove uma monitoria cadastrada | Log | `200 OK` / `404 Not Found` |

---

## 📂 Estrutura Atualizada do Repositório (v2.0)

```text
AvaliacaoFullStack/
├── frontend/             # Interface do usuário (Módulo 1)
├── backend/              # API REST Back-end (Módulo 2)
│   ├── node_modules/     # Dependências do projeto (ignorado no Git)
│   ├── .env              # Variáveis de ambiente (ignorado no Git)
│   ├── .gitignore        # Mapeamento de arquivos ignorados pelo Git
│   ├── package.json      # Dependências e scripts ("start" e "dev")
│   ├── package-lock.json # Registro de versões exatas
│   └── server.js         # Servidor Express evoluído (Middlewares, CRUD e status codes)
├── docs/                 # Documentação complementar
└── README.md             # Documentação principal do projeto
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18.x ou superior)
- **NPM** (gerenciador de pacotes)

### Passos para Execução:

1. **Acesse a pasta do Back-end:**
   ```bash
   cd backend
   ```

2. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

3. **Inicie o servidor em modo de desenvolvimento (com Nodemon):**
   ```bash
   npm run dev
   ```

4. **Confirmação no Terminal:**
   ```text
   [Nodemon] watching path(s): *.*
   [Nodemon] starting `node server.js`
   🚀 Servidor rodando com sucesso na porta 3000!
   ```

---

## 🧪 Tabela de Testes no Postman (Sucesso e Erros)

Abaixo estão os cenários testados via Postman para validação de todas as rotas e middlewares da API:

| # | MÉTODO | URL | CORPO DA REQUISIÇÃO (JSON) | RESPOSTA ESPERADA | STATUS CODE |
| :-: | :---: | :--- | :--- | :--- | :---: |
| **1** | `GET` | `http://localhost:3000/api/monitorias` | *Nenhum* | Lista completa em JSON | `200 OK` |
| **2** | `GET` | `http://localhost:3000/api/monitorias/1` | *Nenhum* | Dados da monitoria ID 1 | `200 OK` |
| **3** | `GET` | `http://localhost:3000/api/monitorias/999` | *Nenhum* | `{"mensagem": "Monitoria não encontrada"}` | `404 Not Found` |
| **4** | `POST` | `http://localhost:3000/api/monitorias` | `{"disciplina": "Banco de Dados I", "monitor": "Lauren Leão"}` | Objeto criado com novo ID | `201 Created` |
| **5** | `POST` | `http://localhost:3000/api/monitorias` | `{}` *(sem campos obrigatórios)* | `{"mensagem": "A disciplina e o monitor são obrigatórios"}` | `400 Bad Request` |
| **6** | `PUT` | `http://localhost:3000/api/monitorias/1` | `{"disciplina": "Estrutura de Dados Avançada", "monitor": "Cristyan Silva"}` | Objeto atualizado | `200 OK` |
| **7** | `DELETE` | `http://localhost:3000/api/monitorias/1` | *Nenhum* | `{"mensagem": "Monitoria removida com sucesso"}` | `200 OK` |
| **8** | `GET` | `http://localhost:3000/api/rota-inexistente` | *Nenhum* | `{"mensagem": "Rota não encontrada"}` | `404 Not Found` |