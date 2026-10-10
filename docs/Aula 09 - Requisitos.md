**DESAFIO Aula 09: EVOLUINDO A API DO PROJETO INTEGRADOR (V2)**  
**Módulo 2 \- Aula 09 (Back-end)**

**CONCEITO DA AULA**  
Na Aula 09 vocês ligaram o motor da API (projeto iniciado, Express instalado, primeiras rotas GET e POST). Neste desafio prático, vamos transformar esse motor em um carro completo: reinício automático (nodemon), configuração protegida (.env), "porteiros" na entrada (middlewares), rotas inteligentes com parâmetros e respostas com status codes corretos.

**IMPORTANTE**: não comecem do zero. O ponto de partida é a API que o  
grupo já criou na Aula 08\.

**PONTE COM O PROJETO INTEGRADOR (aviso para os grupos)**  
No projeto de vocês, troquem /usuarios pelo recurso do tema do grupo (ex.: /livros, /consultas, /produtos). A estrutura é exatamente esta: array em memória por enquanto, middlewares de validação, parâmetros de rota e status codes corretos. **O banco de dados real modelado na disciplina do Projeto Integrador entra nas próximas aulas.** Hoje o foco é a API responder certo.

**ESTRUTURA DO PROJETO AO FINAL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\***

*nome-do-projeto/*  
  *node\_modules/*  
  *.env               \<- NOVO: porta e configurações fora do código*  
  *.gitignore         \<- NOVO: protege .env e node\_modules do GitHub*  
  *package-lock.json*  
  *package.json       \<- ATUALIZADO: scripts start e dev (nodemon)*  
  *server.js          \<- EVOLUÍDO: middlewares, params, status codes, CRUD*

**PASSO 1 \- Nodemon (reinício automático)**  
npm install nodemon \--save-dev  
npm install dotenv

*No package.json, atualizar os scripts:*  
*"scripts": {*  
  *"start": "node server.js",*  
  *"dev": "nodemon server.js"*  
*}*

A partir de agora, rodar com: npm run dev  
Explicação: o node executa; o nodemon monitora e reinicia sozinho  
a cada alteração salva.

**PASSO 2 \- Criar .env e .gitignore**  
Arquivo .env:  
PORT=3000

Arquivo .gitignore:  
node\_modules  
.env

Explicação: o .env guarda configurações fora do código e nunca sobe  
para o GitHub; o .gitignore garante isso. No código, lemos com  
process.env.PORT.  
**PASSO 3 \- Evoluir o server.js**

Atenção: troque "usuarios" pelo recurso do tema / Proj. Integrador do seu grupo  
(ex.: livros, consultas, produtos).

*// \===== DEPENDÊNCIAS \=====*  
*const express \= require("express");*  
*require("dotenv").config(); // lê o arquivo .env*

*const app \= express();*  
*const PORT \= process.env.PORT || 3000;*

*// MIDDLEWARE GLOBAL: lê JSON do body (sem isso, req.body \= undefined)*  
*app.use(express.json());*

*// "BANCO DE DADOS" EM MEMÓRIA (array) \- o banco real vem nas próximas aulas*  
*let usuarios \= \[*  
  *{ id: 1, nome: "Igor", idade: 21 },*  
  *{ id: 2, nome: "Fábio", idade: 23 },*  
*\];*

*// MIDDLEWARE 1: o "porteiro" que registra tudo (logs)*  
*function registrarLog(req, res, next) {*  
  *console.log(\`\[\${new Date().toLocaleTimeString()}\] \${req.method} \${req.url}\`);*  
  *next(); // SEMPRE chamar next(), senão a requisição trava*  
*}*  
*app.use(registrarLog);*

*// MIDDLEWARE 2: validação de dados (usado só no POST e PUT)*  
*function validarUsuario(req, res, next) {*  
  *const { nome, idade } \= req.body;*  
  *if (\!nome) {*  
    *return res.status(400).json({ mensagem: "O nome é obrigatório" });*  
  *}*  
  *if (\!idade) {*  
    *return res.status(400).json({ mensagem: "A idade é obrigatória" });*  
  *}*  
  *next(); // dados ok, pode continuar*  
*}*

*// \===== ROTAS \=====*

*// GET /usuarios \-\> lista todos (status 200\)*  
*app.get("/usuarios", (req, res) \=\> {*  
  *return res.status(200).json(usuarios);*  
*});*

*// GET /usuarios/:id \-\> busca por ID (parâmetro de rota)*  
*app.get("/usuarios/:id", (req, res) \=\> {*  
  *const id \= Number(req.params.id); // :id vem como STRING \-\> converter\!*  
  *const usuario \= usuarios.find((u) \=\> u.id \=== id);*

  *if (\!usuario) {*  
    *return res.status(404).json({ mensagem: "Usuário não encontrado" });*  
  *}*  
  *return res.status(200).json(usuario);*  
*});*

*// POST /usuarios \-\> cria novo (com middleware de validação)*  
*app.post("/usuarios", validarUsuario, (req, res) \=\> {*  
  *const { nome, idade } \= req.body;*  
  *const novoUsuario \= { id: usuarios.length \+ 1, nome, idade };*  
  *usuarios.push(novoUsuario);*  
  *return res.status(201).json(novoUsuario); // 201 \= criado com sucesso*  
*});*

*// PUT /usuarios/:id \-\> atualiza existente*  
*app.put("/usuarios/:id", validarUsuario, (req, res) \=\> {*  
  *const id \= Number(req.params.id);*  
  *const usuario \= usuarios.find((u) \=\> u.id \=== id);*

  *if (\!usuario) {*  
    *return res.status(404).json({ mensagem: "Usuário não encontrado" });*  
  *}*

  *const { nome, idade } \= req.body;*  
  *usuario.nome \= nome;*  
  *usuario.idade \= idade;*  
  *return res.status(200).json(usuario);*  
*});*

*// DELETE /usuarios/:id \-\> remove*  
*app.delete("/usuarios/:id", (req, res) \=\> {*  
  *const id \= Number(req.params.id);*  
  *const usuario \= usuarios.find((u) \=\> u.id \=== id);*

  *if (\!usuario) {*  
    *return res.status(404).json({ mensagem: "Usuário não encontrado" });*  
  *}*

  *usuarios \= usuarios.filter((u) \=\> u.id \!== id);*  
  *return res.status(200).json({ mensagem: "Usuário removido com sucesso" });*  
*});*

*// MIDDLEWARE FINAL: rota que não existe \-\> 404*  
*app.use((req, res) \=\> {*  
  *return res.status(404).json({ mensagem: "Rota não encontrada" });*  
*});*

*// SUBIR O SERVIDOR*  
*app.listen(PORT, () \=\> {*  
  *console.log(\`Servidor rodando na porta \${PORT}\`);*  
*});*

**PASSO 4 \- Testar tudo no Postman**  
Veja o arquivo em anexo: TABELA-TESTES-POSTMAN.txt  
(a tabela é genérica: cada grupo adapta \[recurso\] e os campos  
do body para o tema do seu projeto integrador).

| TABELA DE TESTES NO POSTMAN (GENÉRICA) \- Desafio Prático v2 |  |  |  |  |
| :---- | :---- | :---- | :---- | :---- |
| Como adaptar: troque \[recurso\] pelo recurso do tema Pi do grupo e adapte os campos do body. |  |  |  |  |
|   |   |   |   |   |
| \# | MÉTODO | URL | BODY (raw \-\> JSON) | ESPERADO |
| 1 | GET | http\://localhost:3000/\[recurso\] | \-- | 200 \+ lista completa |
| 2 | GET | http\://localhost:3000/\[recurso\]/1 | \-- | 200 \+ item de id 1 |
| 3 | GET | http\://localhost:3000/\[recurso\]/999 | \-- | 404 (não encontrado) |
| 4 | POST | http\://localhost:3000/\[recurso\] | {"nome":"Exemplo","campo2":10} | 201 \+ item criado |
| 5 | POST | http\://localhost:3000/\[recurso\] | {} (ou sem campo obrigatório) | 400 (middleware de validação) |
| 6 | PUT | http\://localhost:3000/\[recurso\]/1 | {"nome":"Novo valor","campo2":20} | 200 \+ item atualizado |
| 7 | DELETE | http\://localhost:3000/\[recurso\]/1 | \-- | 200 \+ mensagem de remoção |

OBSERVAÇÕES  
O navegador só faz GET. POST, PUT e DELETE são testados no Postman.  
Durante os testes, acompanhe o terminal: o middleware de log imprime cada requisição.  
Registre os resultados (prints) para usar na documentação e no vídeo.  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
**Continuação: erros comuns \+ ponte com o projeto**  
ERROS COMUNS (para revisar antes de entregar)

| ERRO | CONSEQUÊNCIA |
| :---- | :---- |
| Esquecer app.use(express.json()) | req.body vem undefined |
| Esquecer o next() no middleware | Requisição fica carregando para sempre |
| Esquecer os dois pontos (/recurso/id) | Parâmetro de rota não funciona |
| Comparar req.params.id (string) com id (number) | find nunca encontra o item |
| Não usar return antes do res.status() | Código continua executando após a resposta |
| Colocar o middleware depois da rota | Ele nunca é executado |
| Esquecer o Body como JSON no Postman | O servidor não entende os dados |

**ENTREGA (OBRIGATÓRIA)**  
1\. Link público do repositório no GitHub com a API evoluída  
   (nodemon, .env, .gitignore, middlewares e rotas com parâmetros);

2\. Vídeo narrado (3 a 5 minutos) em que CADA integrante participa com a  
   própria voz (pode ser gravado em Meet, Zoom ou Teams), apresentando  
   de forma simples:  
   \- A evolução da API da Aula 01 para a v2 (nodemon, .env e .gitignore);  
   \- Os middlewares funcionando: log das requisições no terminal e a  
     validação retornando erro 400 quando o body está incompleto;  
   \- As rotas com parâmetros (GET por id, PUT e DELETE) respondendo com  
     os status codes corretos (200, 201, 400, 404);  
   \- Os testes realizados no Postman (POST com body JSON e casos de erro);  
   \- O repositório no GitHub mostrando os commits de cada integrante.

Sugestão de divisão da narração (adaptar ao número de integrantes):  
\- Integrante 1: estrutura do projeto, nodemon e .env/.gitignore;  
\- Integrante 2: middlewares (log e validação) e status codes;  
\- Integrante 3: rotas com parâmetros e testes no Postman;  
\- Integrante 4: repositório, commits de cada integrante e tabela de  
  endpoints no README.

VALIDAÇÃO  
O desafio só será validado com:  
\- Link público do GitHub com commits de todos os integrantes;  
\- Vídeo com a voz de todos os integrantes mostrando a API evoluída e  
  os testes no Postman.

Repositório privado, commits feitos por um único integrante para o  
grupo todo ou ausência de vídeo não serão validados.

DATA DE ENTREGA  
\[Inserir data\]  
