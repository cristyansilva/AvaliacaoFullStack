const Disciplina = require('../models/disciplinaModel');
const { VALOR_DUPLICADO } = require('../config/erros');

// GET /api/disciplinas - retorna todas as disciplinas
async function listar(req, res) {
    try {
        return res.status(200).json(await Disciplina.listar());
    } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar disciplinas.' });
    }
}

// GET /api/disciplinas/:id - retorna uma disciplina específica
async function buscarPorId(req, res) {
    const { id } = req.params;

    try {
        const disciplina = await Disciplina.buscarPorId(id);

        if (!disciplina) {
            return res.status(404).json({ mensagem: 'Disciplina não encontrada.' });
        }

        return res.status(200).json(disciplina);
    } catch (error) {
        console.error(`Erro ao buscar disciplina ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao buscar a disciplina.' });
    }
}

// POST /api/disciplinas - cria uma nova disciplina
async function criar(req, res) {
    const { codigo, nome, semestre } = req.body;

    if (!codigo || !nome || !semestre) {
        return res.status(400).json({ mensagem: 'Código, nome e semestre são obrigatórios!' });
    }

    try {
        const disciplina = await Disciplina.criar({ codigo, nome, semestre });
        return res.status(201).json(disciplina);
    } catch (error) {
        if (error.code === VALOR_DUPLICADO) {
            return res.status(409).json({ mensagem: 'Já existe uma disciplina cadastrada com este código.' });
        }
        console.error('Erro ao criar disciplina:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao criar disciplina.' });
    }
}

// PUT /api/disciplinas/:id - atualiza uma disciplina existente
async function atualizar(req, res) {
    const { id } = req.params;
    const { codigo, nome, semestre } = req.body;

    if (!codigo || !nome || !semestre) {
        return res.status(400).json({ mensagem: 'Código, nome e semestre são obrigatórios!' });
    }

    try {
        const disciplina = await Disciplina.atualizar(id, { codigo, nome, semestre });

        if (!disciplina) {
            return res.status(404).json({ mensagem: 'Disciplina não encontrada!' });
        }

        return res.status(200).json(disciplina);
    } catch (error) {
        if (error.code === VALOR_DUPLICADO) {
            return res.status(409).json({ mensagem: 'Já existe uma disciplina cadastrada com este código.' });
        }
        console.error(`Erro ao atualizar disciplina ${id}:`, error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao atualizar disciplina.' });
    }
}

module.exports = { listar, buscarPorId, criar, atualizar };
