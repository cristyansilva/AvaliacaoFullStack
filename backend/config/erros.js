// Códigos de erro do PostgreSQL: o dado tem o formato certo, mas o banco recusa
const VALOR_DUPLICADO = '23505';
const REFERENCIA_INEXISTENTE = '23503';

// Monta a mensagem de uma monitoria que aponta para disciplina ou monitor que não existe
function mensagemReferenciaInexistente(error) {
    const campo = error.constraint.includes('disciplina') ? 'disciplina_id' : 'monitor_id';
    return `O campo ${campo} aponta para um registro que não existe`;
}

module.exports = { VALOR_DUPLICADO, REFERENCIA_INEXISTENTE, mensagemReferenciaInexistente };
