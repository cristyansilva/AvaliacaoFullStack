const Joi = require('joi');

// Maior valor aceito por uma coluna INTEGER do PostgreSQL
const MAIOR_INTEIRO = 2147483647;

// Mensagens de erro em português (o padrão do Joi é em inglês)
const mensagens = {
    'any.required': 'O campo {{#label}} é obrigatório',
    'any.only': 'O campo {{#label}} deve ser um destes valores: {{#valids}}',
    'string.base': 'O campo {{#label}} deve ser um texto',
    'string.empty': 'O campo {{#label}} não pode ficar vazio',
    'string.min': 'O campo {{#label}} deve ter pelo menos {{#limit}} caracteres',
    'string.max': 'O campo {{#label}} deve ter no máximo {{#limit}} caracteres',
    'string.email': 'O campo {{#label}} deve ser um e-mail válido',
    'number.base': 'O campo {{#label}} deve ser um número',
    'number.integer': 'O campo {{#label}} deve ser um número inteiro',
    'number.min': 'O campo {{#label}} deve ser no mínimo {{#limit}}',
    'number.max': 'O campo {{#label}} deve ser no máximo {{#limit}}',
    'number.unsafe': 'O campo {{#label}} deve ser no máximo ' + MAIOR_INTEIRO,
    'date.base': 'O campo {{#label}} deve ser uma data válida',
    'date.format': 'O campo {{#label}} deve ser uma data válida (ex: 2026-11-20 19:00:00)',
    'object.base': 'O corpo da requisição deve ser um objeto JSON',
};

const opcoesDeValidacao = {
    abortEarly: false, // retorna todos os erros de uma vez, não só o primeiro
    stripUnknown: true, // descarta campos que não estão no schema
    messages: mensagens,
    errors: { wrap: { label: false } },
};

// SCHEMA de usuário: a "receita" de como os dados devem chegar (espelha db/script.sql)
const schemaUsuario = Joi.object({
    nome: Joi.string().trim().min(3).max(100).required(),
    email: Joi.string().trim().email().max(100).required(),
    tipo: Joi.string().valid('aluno', 'monitor', 'professor').default('aluno'),
});

// O Joi.date() aceita 31/02 e "pula" para 03/03; aqui a data precisa existir no calendário
function dataExiste(valor, helpers) {
    const [, ano, mes, dia] = /^(\d{4})-(\d{2})-(\d{2})/.exec(helpers.original) ?? [];
    const data = new Date(Date.UTC(ano, mes - 1, dia));
    return data.getUTCDate() === Number(dia) ? valor : helpers.error('date.format');
}

// SCHEMA de monitoria: a "receita" de como os dados devem chegar (espelha db/script.sql)
const idObrigatorio = Joi.number().integer().min(1).max(MAIOR_INTEIRO).required();

const schemaMonitoria = Joi.object({
    disciplina_id: idObrigatorio,
    monitor_id: idObrigatorio,
    data_horario: Joi.date().iso().custom(dataExiste).required(),
    local_link: Joi.string().trim().max(150).required(),
    tipo_atendimento: Joi.string().valid('individual', 'coletiva').required(),
    vagas_max: Joi.number().integer().min(1).max(MAIOR_INTEIRO).required(),
});

// SCHEMA do :id da URL: evita mandar "abc" para uma coluna INTEGER do banco
const schemaId = Joi.object({ id: idObrigatorio });

// MIDDLEWARE de validação: recebe um schema e confere o body (ou outra parte) da requisição
function validar(schema, origem = 'body') {
    return (req, res, next) => {
        // Sem Content-Type JSON o req.body chega undefined; {} faz o Joi apontar os campos que faltam
        const { error, value } = schema.validate(req[origem] ?? {}, opcoesDeValidacao);

        if (error) {
            const mensagem = error.details.map((detalhe) => detalhe.message).join('; ');
            return res.status(400).json({ mensagem });
        }

        req[origem] = value; // dados já tratados: sem espaços extras, convertidos e com os valores .default()
        next(); // tudo certo, segue para a rota
    };
}

module.exports = {
    validarUsuario: validar(schemaUsuario),
    validarMonitoria: validar(schemaMonitoria),
    validarId: validar(schemaId, 'params'),
};
