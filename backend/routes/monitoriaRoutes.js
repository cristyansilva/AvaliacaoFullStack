const router = require('express').Router();
const monitorias = require('../controllers/monitoriaController');
const { validarMonitoria, validarId } = require('../middlewares/validacao');

router.get('/', monitorias.listar);
router.get('/:id', validarId, monitorias.buscarPorId);
router.post('/', validarMonitoria, monitorias.criar);
router.put('/:id', validarId, validarMonitoria, monitorias.atualizar);
router.delete('/:id', validarId, monitorias.remover);

module.exports = router;
