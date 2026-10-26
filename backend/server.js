const express = require('express');
const db = require('./db');

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

// 1. GET /api/usuarios - busca e retorna todos os usuários no banco de dados
app.get('/api/usuarios', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM usuarios');
        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error(`Erro ao buscar usuários: `, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar usuários.' });
    } 
});

// 2. GET /api/usuarios/:id - Retorna um usuário específico por ID no banco
app.get('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    
        if(resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        return res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error(`Erro ao buscar usuário ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar o usuário.' });
    }
});

// 3. POST /api/usuarios - Cria um novo usuário
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

// 4. PUT /api/usuarios/:id - Atualiza um usuário existente
app.put('/api/usuarios/:id', validarUsuario, (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if(!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }

    const { nome, email } = req.body;

    usuario.nome = nome;
    usuario.email = email;

    return res.status(200).json(usuario);
});

// 5. DELETE /api/usuarios/:id - Remove um usuário existente
app.delete('/api/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if(!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }

    usuarios = usuarios.filter(u => u.id !== id);

    return res.status(200).json({ mensagem: "Usuário removido com sucesso!" });
});

// 6. GET /api/monitorias - busca e retorna todos as monitorias no banco de dados
app.get('/api/monitorias', async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM monitorias');
        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao buscar monitorias:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar monitorias.' });
    }
});

// 7. GET /api/monitorias/:id - Retorna uma monitoria específica pelo ID (Status Code: 200 ou 404)
app.get('/api/monitorias/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query('SELECT * FROM monitorias WHERE id = $1', [id]);
    
        if(resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Monitoria não encontrada.' });
        }
    
        return res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error(`Erro ao buscar monitorias ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar a monitoria.' });
    }
});

// 8. POST /api/monitorias - Cria uma nova monitoria (Status Code: 201 ou 400)
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

// 9. PUT /api/monitorias/:id - Atualiza uma monitoria existente
app.put('/api/monitorias/:id', validarMonitoria, (req, res) => {
    const id = Number(req.params.id);
    const monitoria = monitorias.find(m => m.id === id);

    if(!monitoria) {
        return res.status(404).json({ mensagem: "Monitoria não encontrada!" });
    }

    const { disciplina, monitor, data } = req.body;

    monitoria.disciplina = disciplina;
    monitoria.monitor = monitor;
    monitoria.data = data;

    return res.status(200).json(monitoria);
});

// 10. DELETE /api/monitorias/:id - Remove uma monitoria existente
app.delete('/api/monitorias/:id', (req, res) => {
    const id = Number(req.params.id);
    const monitoria = monitorias.find(m => m.id === id);

    if (!monitoria) {
        return res.status(404).json({ mensagem: "Monitoria não encontrada!" });
    }

    monitorias = monitorias.filter(m => m.id !== id);

    return res.status(200).json({ mensagem: "Monitoria removida com sucesso!" });
});

app.use((req, res) => {
    return res.status(404).json({ mensagem: "Rota não encontrada!" });
});


app.listen(PORT, () => {
    console.log(`O SERVIDOR está rodando na porta ${PORT}.`);
});