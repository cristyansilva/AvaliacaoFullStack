const router = require('express').Router();
const disciplinas = require('../controllers/disciplinaController');
const { validarId } = require('../middlewares/validacao');

router.get('/', disciplinas.listar);
router.get('/:id', validarId, disciplinas.buscarPorId);
router.post('/', disciplinas.criar);
router.put('/:id', validarId, disciplinas.atualizar);

module.exports = router;
