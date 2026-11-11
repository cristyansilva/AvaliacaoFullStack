require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const registrarLog = require('./middlewares/logger');
const { rotaNaoEncontrada, tratarErros } = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// MIDDLEWARES GLOBAIS: lê JSON do body (sem isso, req.body = undefined)
app.use(cors());
app.use(express.json());
app.use(registrarLog);

app.use('/api', routes);

// Página usada na gravação do vídeo (http://localhost:3001/demo). Lê o código real do projeto.
if (process.env.NODE_ENV !== 'production') {
    app.get('/demo', (req, res) => res.sendFile(path.join(__dirname, 'demo.html')));
    app.get('/demo/validacao.js', (req, res) =>
        res.type('text/plain').sendFile(path.join(__dirname, 'middlewares', 'validacao.js')));
    app.get('/demo/package.json', (req, res) =>
        res.type('text/plain').sendFile(path.join(__dirname, 'package.json')));
    // As rotas agora ficam em routes/*.js: a demo recebe todas juntas
    app.get('/demo/server.js', (req, res) => {
        const pasta = path.join(__dirname, 'routes');
        const fontes = fs.readdirSync(pasta).map((arq) => fs.readFileSync(path.join(pasta, arq), 'utf8'));
        res.type('text/plain').send(fontes.join('\n'));
    });
}

app.use(rotaNaoEncontrada);
app.use(tratarErros);

module.exports = app;
