const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE GLOBAL: lê JSON do body (sem isso, req.body = undefined)
app.use(express.json());

// MIDDLEWARE 1: o "porteiro" que registra tudo (logs)
function registrarLog(req, res, next) {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next(); // SEMPRE chamar next(), senão a requisição trava
}
app.use(registrarLog);

// MIDDLEWARE 2: validação de dados de usuário (usado no POST e PUT)
function validarUsuario(req, res, next) {
    const { nome, email } = req.body;
    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório' });
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'O e-mail é obrigatório' });
    }
    next();
}

// MIDDLEWARE 3: validação de dados de monitoria (usado no POST e PUT)
function validarMonitoria(req, res, next) {
    const { disciplina, monitor, data } = req.body;
    if (!disciplina) {
        return res.status(400).json({ mensagem: 'A disciplina é obrigatória' });
    }
    if (!monitor) {
        return res.status(400).json({ mensagem: 'O monitor é obrigatório' });
    }
    if (!data) {
        return res.status(400).json({ mensagem: 'A data é obrigatória' });
    }
    next();
}

let usuarios = [
    { id: 1, nome: "Marlon da Silva", email: "marlon@email.com" },
    { id: 2, nome: "Taíse da Rosa", email: "taise@email.com" },
    { id: 3, nome: "Cristyan Silva", email: "cristyan@email.com" },
    { id: 4, nome: "Lauren Leão", email: "lauren@email.com" },
];

let monitorias = [
    { id: 1, disciplina: "Estrutura de Dados", monitor: "Cristyan da Silva", data: "2026-10-15" },
    { id: 2, disciplina: "Programação Web", monitor: "Taíse da Rosa", data: "2026-10-18" },
];

// 1. GET /api/usuarios - Retorna a lista completa de usuários em JSON (Status Code: 200)
app.get('/api/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

// 2. GET /api/usuarios/:id - Retorna um usuário específico pelo ID (Status Code: 200 ou 404)
app.get('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id)

    if(!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    res.status(200).json(usuario);
});

// 3. POST /api/usuarios - Cria um novo usuário (Status Code: 201 ou 400)
app.post('/api/usuarios', validarUsuario, (req, res) => {
    const { nome, email } = req.body;

    const novoUsuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
        nome,
        email
    };

    usuarios.push(novoUsuario);

    return res.status(201).json(novoUsuario);
});

// 4. GET /api/monitorias - Retorna a lista de monitorias (Status Code: 200)
app.get('/api/monitorias', (req, res) => {
    return res.status(200).json(monitorias);
});

// 5. GET /api/monitorias/:id - Retorna uma monitoria específica pelo ID (Status Code: 200 ou 404)
app.get('/api/monitorias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const monitoria = monitorias.find(m => m.id === id);

    if(!monitoria) {
        return res.status(404).json({ mensagem: 'Monitoria não encontrada.' });
    }

    return res.status(200).json(monitoria);
});

// 6. POST /api/monitorias - Cria uma nova monitoria (Status Code: 201 ou 400)
app.post('/api/monitorias', validarMonitoria, (req, res) => {
    const { disciplina, monitor, data } = req.body;

    const novaMonitoria = {
        id: monitorias.length > 0 ? monitorias[monitorias.length - 1].id + 1 : 1,
        disciplina,
        monitor,
        data
    };

    monitorias.push(novaMonitoria);

    return res.status(201).json(novaMonitoria);
});

app.listen(PORT, () => {
    console.log(`O SERVIDOR está rodando na porta ${PORT}.`);
});