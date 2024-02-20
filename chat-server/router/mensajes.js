

const { Router } = require('express');
const { validarToken } = require('../middlewares/validar-token');
const obtenerChat = require('../controllers/mensajes');

const router = Router();

router.get('/:de', validarToken, obtenerChat);

module.exports = router;