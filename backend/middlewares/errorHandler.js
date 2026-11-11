function rotaNaoEncontrada(req, res) {
    return res.status(404).json({ mensagem: 'Rota não encontrada!' });
}

// JSON malformado no body: o express.json() falha antes de chegar na validação do Joi
function tratarErros(err, req, res, next) {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ mensagem: 'O corpo da requisição não é um JSON válido' });
    }
    next(err);
}

module.exports = { rotaNaoEncontrada, tratarErros };
