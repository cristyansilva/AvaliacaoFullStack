const Usuario = require('../models/usuarioModel');
const { VALOR_DUPLICADO } = require('../config/erros');

// GET /api/usuarios - retorna todos os usuários
async function listar(req, res) {
    try {
        return res.status(200).json(await Usuario.listar());
    } catch (error) {
        console.error(`Erro ao buscar usuários: `, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar usuários.' });
    }
}

// GET /api/usuarios/:id - retorna um usuário específico
async function buscarPorId(req, res) {
    const { id } = req.params;

    try {
        const usuario = await Usuario.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error(`Erro ao buscar usuário ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar o usuário.' });
    }
}

// POST /api/usuarios - cria um novo usuário
async function criar(req, res) {
    try {
        const usuario = await Usuario.criar(req.body);
        return res.status(201).json(usuario);
    } catch (error) {
        if (error.code === VALOR_DUPLICADO) {
            return res.status(409).json({ mensagem: 'Já existe um usuário com este e-mail.' });
        }
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao criar usuário.' });
    }
}

// PUT /api/usuarios/:id - atualiza um usuário existente
async function atualizar(req, res) {
    const { id } = req.params;

    try {
        const usuario = await Usuario.atualizar(id, req.body);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        if (error.code === VALOR_DUPLICADO) {
            return res.status(409).json({ mensagem: 'Já existe um usuário com este e-mail.' });
        }
        console.error(`Erro ao atualizar usuário ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao atualizar usuário.' });
    }
}

// DELETE /api/usuarios/:id - remove um usuário
async function remover(req, res) {
    const { id } = req.params;

    try {
        const usuario = await Usuario.remover(id);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        return res.status(200).json({ mensagem: 'Usuário removido com sucesso!' });
    } catch (error) {
        console.error(`Erro ao remover usuário ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao remover usuário.' });
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
