const express = require('express');
const app = express();
const porta = 3000;

// rota de teste básica
app.get('/', (req, res) => {
    res.send('API está funcionado!');
});

// iniciando o servidor na porta definida
app.listen(porta, () => {
    console.log(`O SERVIDOR está rodando na porta ${porta}.`);
});

