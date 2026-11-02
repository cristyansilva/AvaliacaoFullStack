const express = require('express');
const path = require('path');
const db = require('./db');
const bcrypt = require('bcrypt');
const { validarUsuario, validarMonitoria, validarId } = require('./validacao');

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

// Os middlewares de validação com Joi (usados no POST e PUT) ficam em validacao.js

// Códigos de erro do PostgreSQL: o dado tem o formato certo, mas o banco recusa
const VALOR_DUPLICADO = '23505';
const REFERENCIA_INEXISTENTE = '23503';

// Monta a mensagem de uma monitoria que aponta para disciplina ou monitor que não existe
function mensagemReferenciaInexistente(error) {
    const campo = error.constraint.includes('disciplina') ? 'disciplina_id' : 'monitor_id';
    return `O campo ${campo} aponta para um registro que não existe`;
}

// Rota de Registro de Usuário com Senha Criptografada
app.post('/api/registro', async (req, res) => {
    const { nome, email, tipo, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios!' });
    }

    try {
        // 1. Gera o hash da senha (salt rounds = 10)
        const saltRounds = 10;
        const senha_hash = await bcrypt.hash(senha, saltRounds);

        // 2. Salva no banco de dados APENAS o hash
        const resultado = await db.query(
            'INSERT INTO usuarios (nome, email, tipo, senha_hash) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, tipo',
            [nome, email, tipo || 'aluno', senha_hash]
        );

        // 3. Retorna os dados do usuário sem expor a senha/hash
        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            usuario: resultado.rows[0]
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return res.status(500).json({ mensagem: 'erro interno ao cadastrar usuário' });
    }
});

// 1. GET /api/usuarios - busca e retorna todos os usuários no banco de dados
app.get('/api/usuarios', async (req, res) => {
    try {
        const resultado = await db.query('SELECT id, nome, email, tipo FROM usuarios');
        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error(`Erro ao buscar usuários: `, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar usuários.' });
    } 
});

// 2. GET /api/usuarios/:id - Retorna um usuário específico por ID no banco
app.get('/api/usuarios/:id', validarId, async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query('SELECT id, nome, email, tipo FROM usuarios WHERE id = $1', [id]);
    
        if(resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        return res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error(`Erro ao buscar usuário ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar o usuário.' });
    }
});

// 3. POST /api/usuarios - Cria um novo usuário no banco de dados
app.post('/api/usuarios', validarUsuario, async (req, res) => {
    const { nome, email, tipo } = req.body;

    try {
        const resultado = await db.query(
            'INSERT INTO usuarios (nome, email, tipo) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, tipo]
        );

        return res.status(201).json(resultado.rows[0]);
    } catch (error) {
        if (error.code === VALOR_DUPLICADO) {
            return res.status(409).json({ mensagem: 'Já existe um usuário com este e-mail.' });
        }
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao criar usuário.' });
    }
});

// 4. PUT /api/usuarios/:id - Atualiza um usuário existente no banco de dados
app.put('/api/usuarios/:id', validarId, validarUsuario, async (req, res) => {
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
        if (error.code === VALOR_DUPLICADO) {
            return res.status(409).json({ mensagem: 'Já existe um usuário com este e-mail.' });
        }
        console.error(`Erro ao atualizar usuário ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao atualizar usuário.' });
    }
});


// 5. DELETE /api/usuarios/:id - Remove um usuário do banco de dados
app.delete('/api/usuarios/:id', validarId, async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        return res.status(200).json({ mensagem: 'Usuário removido com sucesso!' });
    } catch (error) {
        console.error(`Erro ao remover usuário ${id}:`, error);
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
app.get('/api/monitorias/:id', validarId, async (req, res) => {
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

// 8. POST /api/monitorias - Cria uma nova monitoria no banco de dados (Status Code: 201 ou 400)
app.post('/api/monitorias', validarMonitoria, async (req, res) => {
    const { disciplina_id, monitor_id, data_horario, local_link, tipo_atendimento, vagas_max } = req.body;

    try {
        const resultado = await db.query(
            `INSERT INTO monitorias (disciplina_id, monitor_id, data_horario, local_link, tipo_atendimento, vagas_max)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [disciplina_id, monitor_id, data_horario, local_link, tipo_atendimento, vagas_max]
        );

        return res.status(201).json(resultado.rows[0]);
    } catch (error) {
        if (error.code === REFERENCIA_INEXISTENTE) {
            return res.status(400).json({ mensagem: mensagemReferenciaInexistente(error) });
        }
        console.error('Erro ao criar monitoria:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao criar monitoria.' });
    }
});

// 9. PUT /api/monitorias/:id - Atualiza uma monitoria existente no banco de dados
app.put('/api/monitorias/:id', validarId, validarMonitoria, async (req, res) => {
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
        if (error.code === REFERENCIA_INEXISTENTE) {
            return res.status(400).json({ mensagem: mensagemReferenciaInexistente(error) });
        }
        console.error(`Erro ao atualizar monitoria ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao atualizar monitoria.' });
    }
});


// 10. DELETE /api/monitorias/:id - Remove uma monitoria do banco de dados
app.delete('/api/monitorias/:id', validarId, async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query('DELETE FROM monitorias WHERE id = $1 RETURNING *', [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Monitoria não encontrada!' });
        }

        return res.status(200).json({ mensagem: 'Monitoria removida com sucesso!' });
    } catch (error) {
        console.error(`Erro ao remover monitoria ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao remover monitoria.' });
    }
});

// Página usada na gravação do vídeo (http://localhost:3001/demo). Lê o código real destes arquivos.
if (process.env.NODE_ENV !== 'production') {
    app.get('/demo', (req, res) => res.sendFile(path.join(__dirname, 'demo.html')));
    for (const arquivo of ['validacao.js', 'server.js', 'package.json']) {
        app.get(`/demo/${arquivo}`, (req, res) => res.type('text/plain').sendFile(path.join(__dirname, arquivo)));
    }
}

app.use((req, res) => {
    return res.status(404).json({ mensagem: "Rota não encontrada!" });
});

// JSON malformado no body: o express.json() falha antes de chegar na validação do Joi
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ mensagem: 'O corpo da requisição não é um JSON válido' });
    }
    next(err);
});


app.listen(PORT, () => {
    console.log(`O SERVIDOR está rodando na porta ${PORT}.`);
});