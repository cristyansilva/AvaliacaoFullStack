const db = require('../config/db');

async function listar() {
    const resultado = await db.query('SELECT id, nome, email, tipo FROM usuarios');
    return resultado.rows;
}

async function buscarPorId(id) {
    const resultado = await db.query('SELECT id, nome, email, tipo FROM usuarios WHERE id = $1', [id]);
    return resultado.rows[0];
}

// Usado no login: inclui o senha_hash
async function buscarPorEmail(email) {
    const resultado = await db.query(
        'SELECT id, nome, email, tipo, senha_hash FROM usuarios WHERE email = $1',
        [email]
    );
    return resultado.rows[0];
}

async function criar({ nome, email, tipo }) {
    const resultado = await db.query(
        'INSERT INTO usuarios (nome, email, tipo) VALUES ($1, $2, $3) RETURNING *',
        [nome, email, tipo]
    );
    return resultado.rows[0];
}

// Registro com senha: salva APENAS o hash e não devolve a senha
async function criarComSenha({ nome, email, tipo, senha_hash }) {
    const resultado = await db.query(
        'INSERT INTO usuarios (nome, email, tipo, senha_hash) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, tipo',
        [nome, email, tipo || 'aluno', senha_hash]
    );
    return resultado.rows[0];
}

async function atualizar(id, { nome, email }) {
    const resultado = await db.query(
        'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
        [nome, email, id]
    );
    return resultado.rows[0];
}

async function remover(id) {
    const resultado = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return resultado.rows[0];
}

module.exports = { listar, buscarPorId, buscarPorEmail, criar, criarComSenha, atualizar, remover };
