const db = require('../config/db');

async function listar() {
    const resultado = await db.query('SELECT * FROM monitorias');
    return resultado.rows;
}

async function buscarPorId(id) {
    const resultado = await db.query('SELECT * FROM monitorias WHERE id = $1', [id]);
    return resultado.rows[0];
}

async function criar({ disciplina_id, monitor_id, data_horario, local_link, tipo_atendimento, vagas_max }) {
    const resultado = await db.query(
        `INSERT INTO monitorias (disciplina_id, monitor_id, data_horario, local_link, tipo_atendimento, vagas_max)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [disciplina_id, monitor_id, data_horario, local_link, tipo_atendimento, vagas_max]
    );
    return resultado.rows[0];
}

async function atualizar(id, { disciplina_id, monitor_id, data_horario, local_link, tipo_atendimento, vagas_max }) {
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
    return resultado.rows[0];
}

async function remover(id) {
    const resultado = await db.query('DELETE FROM monitorias WHERE id = $1 RETURNING *', [id]);
    return resultado.rows[0];
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
