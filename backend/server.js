const express = require('express');
const app = express();
const porta = 3001;

app.use(express.json());

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
app.post('/api/usuarios', (req, res) => {
    const { nome, email } = req.body;

    if(!nome || !email) {
        return res.status(400).json({ mensagem: 'Nome e e-mail são obrigatórios.' });
    }

    const novoUsuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1, nome, email
    };

    usuarios.push(novoUsuario);

    res.status(201).json(novoUsuario);
});

// 4. GET /api/monitorias - Retorna a lista de monitorias (Status Code: 200)
app.get('/api/monitorias', (req, res) => {
    res.status(200).json(monitorias);
});

// 5. GET /api/monitorias/:id - Retorna uma monitoria específica pelo ID (Status Code: 200 ou 404)
app.get('/api/monitorias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const monitoria = monitorias.find(m => m.id === id);

    if(!monitoria) {
        return res.status(404).json({ mensagem: 'Monitoria não encontrada.' });
    }

    res.status(200).json(monitoria);
});

// 6. POST /api/monitorias - Cria uma nova monitoria (Status Code: 201 ou 400)
app.post('/api/monitorias', (req, res) => {
    const { disciplina, monitor, data } = req.body;

    if(!disciplina || !monitor || !data) {
        return res.status(400).json({ mensagem: 'Disciplina, monitor e data são obrigatórios.' });
    }

    const novaMonitoria = {
        id: monitorias.length > 0 ? monitorias[monitorias.length - 1].id + 1 : 1,
        disciplina,
        monitor,
        data
    };

    monitorias.push(novaMonitoria);

    res.status(201).json(novaMonitoria);
});

app.listen(porta, () => {
    console.log(`O SERVIDOR está rodando na porta ${porta}.`);
});