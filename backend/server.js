const express = require('express');
const app = express();
const porta = 3001;

app.use(express.json());

let usuarios = [
    { id: 1, nome: "Marlon da Silva", email: "marlon@email.com" },
    { id: 2, nome: "Taíse da Rosa", email: "taise@email.com" },
    { id: 3, nome: "Cristyan da Silva", email: "cristyan@email.com" },
    { id: 4, nome: "Lauren Leão", email: "lauren@email.com" },
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

app.listen(porta, () => {
    console.log(`O SERVIDOR está rodando na porta ${porta}.`);
});

