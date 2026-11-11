const router = require('express').Router();

router.use('/', require('./authRoutes'));
router.use('/usuarios', require('./usuarioRoutes'));
router.use('/monitorias', require('./monitoriaRoutes'));
router.use('/disciplinas', require('./disciplinaRoutes'));

module.exports = router;
