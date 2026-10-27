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
    const { disciplina_id, monitor_id, data_horario, local_link, tipo_atendimento, vagas_max } = req.body;
    if (!disciplina_id) {
        return res.status(400).json({ mensagem: 'O campo disciplina_id é obrigatório' });
    }
    if (!monitor_id) {
        return res.status(400).json({ mensagem: 'O campo monitor_id é obrigatório' });
    }
    if (!data_horario) {
        return res.status(400).json({ mensagem: 'O campo data_horario é obrigatório' });
    }
    if (!local_link) {
        return res.status(400).json({ mensagem: 'O campo local_link é obrigatório' });
    }
    if (!tipo_atendimento || !['individual', 'coletiva'].includes(tipo_atendimento)) {
        return res.status(400).json({ mensagem: "O campo tipo_atendimento é obrigatório ('individual' ou 'coletiva')" });
    }
    if (vagas_max === undefined || vagas_max === null || vagas_max === '') {
        return res.status(400).json({ mensagem: 'O campo vagas_max é obrigatório' });
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

// 4. PUT /api/usuarios/:id - Atualiza um usuário existente no banco de dados
app.put('/api/usuarios/:id', validarUsuario, async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    try {
        const resultado = await db.query(
            'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
            [nome, email, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        return res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error(`Erro ao atualizar usuário ${id}:, error`);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao atualizar usuário.' });
    }
});


// 5. DELETE /api/usuarios/:id - Remove um usuário do banco de dados
app.delete('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        return res.status(200).json({ mensagem: 'Usuário removido com sucesso!' });
    } catch (error) {
        console.error(`Erro ao atualizar usuário ${id}:, error`);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao remover usuário.' });
    }
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

// 9. PUT /api/monitorias/:id - Atualiza uma monitoria existente no banco de dados
app.put('/api/monitorias/:id', validarMonitoria, async (req, res) => {
    const { id } = req.params;
    const {
        disciplina_id,
        monitor_id,
        data_horario,
        local_link,
        tipo_atendimento,
        vagas_max
    } = req.body;

    try {
        const resultado = await db.query(
            `UPDATE monitorias
             SET disciplina_id = $1,
                 monitor_id = $2,
                 data_horario = $3,
                 local_link = $4,
                 tipo_atendimento = $5,
                 vagas_max = $6
             WHERE id = $7
             RETURNING *`,
            [disciplina_id, monitor_id, data_horario, local_link, tipo_atendimento, vagas_max, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Monitoria não encontrada!' });
        }

        return res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error(`Erro ao atualizar monitoria ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao atualizar monitoria.' });
    }
});


// 10. DELETE /api/monitorias/:id - Remove uma monitoria do banco de dados
app.delete('/api/monitorias/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query('DELETE FROM monitorias WHERE id = $1 RETURNING *', [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Monitoria não encontrada!' });
        }

        return res.status(200).json({ mensagem: 'Monitoria removida com sucesso!' });
    } catch (error) {
        console.error(`Erro ao atualizar usuário ${id}:, error`);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao remover monitoria.' });
    }
});

app.use((req, res) => {
    return res.status(404).json({ mensagem: "Rota não encontrada!" });
});


app.listen(PORT, () => {
    console.log(`O SERVIDOR está rodando na porta ${PORT}.`);
});