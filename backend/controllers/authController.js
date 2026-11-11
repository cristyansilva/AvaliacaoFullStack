const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');
const { VALOR_DUPLICADO } = require('../config/erros');

// Rota de Registro de Usuário com Senha Criptografada
async function registro(req, res) {
    const { nome, email, tipo, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios!' });
    }

    try {
        // Gera o hash da senha (salt rounds = 10); só o hash vai para o banco
        const senha_hash = await bcrypt.hash(senha, 10);
        const usuario = await Usuario.criarComSenha({ nome, email, tipo, senha_hash });

        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            usuario
        });
    } catch (error) {
        if (error.code === VALOR_DUPLICADO) {
            return res.status(409).json({ mensagem: 'Já existe um usuário com este e-mail.' });
        }
        console.error('Erro ao registrar usuário:', error);
        return res.status(500).json({ mensagem: 'erro interno ao cadastrar usuário' });
    }
}

// Rota de Login de Usuário (Autenticação com JWT)
async function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios!' });
    }

    try {
        const usuario = await Usuario.buscarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        return res.status(500).json({ mensagem: 'Erro interno ao realizar login.' });
    }
}

module.exports = { registro, login };
