const Monitoria = require('../models/monitoriaModel');
const { REFERENCIA_INEXISTENTE, mensagemReferenciaInexistente } = require('../config/erros');

// GET /api/monitorias - retorna todas as monitorias
async function listar(req, res) {
    try {
        return res.status(200).json(await Monitoria.listar());
    } catch (error) {
        console.error('Erro ao buscar monitorias:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar monitorias.' });
    }
}

// GET /api/monitorias/:id - retorna uma monitoria específica (200 ou 404)
async function buscarPorId(req, res) {
    const { id } = req.params;

    try {
        const monitoria = await Monitoria.buscarPorId(id);

        if (!monitoria) {
            return res.status(404).json({ mensagem: 'Monitoria não encontrada.' });
        }

        return res.status(200).json(monitoria);
    } catch (error) {
        console.error(`Erro ao buscar monitorias ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar a monitoria.' });
    }
}

// POST /api/monitorias - cria uma nova monitoria (201 ou 400)
async function criar(req, res) {
    try {
        const monitoria = await Monitoria.criar(req.body);
        return res.status(201).json(monitoria);
    } catch (error) {
        if (error.code === REFERENCIA_INEXISTENTE) {
            return res.status(400).json({ mensagem: mensagemReferenciaInexistente(error) });
        }
        console.error('Erro ao criar monitoria:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao criar monitoria.' });
    }
}

// PUT /api/monitorias/:id - atualiza uma monitoria existente
async function atualizar(req, res) {
    const { id } = req.params;

    try {
        const monitoria = await Monitoria.atualizar(id, req.body);

        if (!monitoria) {
            return res.status(404).json({ mensagem: 'Monitoria não encontrada!' });
        }

        return res.status(200).json(monitoria);
    } catch (error) {
        if (error.code === REFERENCIA_INEXISTENTE) {
            return res.status(400).json({ mensagem: mensagemReferenciaInexistente(error) });
        }
        console.error(`Erro ao atualizar monitoria ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao atualizar monitoria.' });
    }
}

// DELETE /api/monitorias/:id - remove uma monitoria
async function remover(req, res) {
    const { id } = req.params;

    try {
        const monitoria = await Monitoria.remover(id);

        if (!monitoria) {
            return res.status(404).json({ mensagem: 'Monitoria não encontrada!' });
        }

        return res.status(200).json({ mensagem: 'Monitoria removida com sucesso!' });
    } catch (error) {
        console.error(`Erro ao remover monitoria ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao remover monitoria.' });
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
