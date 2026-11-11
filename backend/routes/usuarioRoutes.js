const router = require('express').Router();
const usuarios = require('../controllers/usuarioController');
const { validarUsuario, validarId } = require('../middlewares/validacao');

router.get('/', usuarios.listar);
router.get('/:id', validarId, usuarios.buscarPorId);
router.post('/', validarUsuario, usuarios.criar);
router.put('/:id', validarId, validarUsuario, usuarios.atualizar);
router.delete('/:id', validarId, usuarios.remover);

module.exports = router;
