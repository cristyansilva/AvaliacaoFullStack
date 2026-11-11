const db = require('../config/db');

async function listar() {
    const resultado = await db.query('SELECT * FROM disciplinas ORDER BY id ASC');
    return resultado.rows;
}

async function buscarPorId(id) {
    const resultado = await db.query('SELECT * FROM disciplinas WHERE id = $1', [id]);
    return resultado.rows[0];
}

async function criar({ codigo, nome, semestre }) {
    const resultado = await db.query(
        'INSERT INTO disciplinas (codigo, nome, semestre) VALUES ($1, $2, $3) RETURNING *',
        [codigo, nome, semestre]
    );
    return resultado.rows[0];
}

async function atualizar(id, { codigo, nome, semestre }) {
    const resultado = await db.query(
        'UPDATE disciplinas SET codigo = $1, nome = $2, semestre = $3 WHERE id = $4 RETURNING *',
        [codigo, nome, semestre, id]
    );
    return resultado.rows[0];
}

module.exports = { listar, buscarPorId, criar, atualizar };
