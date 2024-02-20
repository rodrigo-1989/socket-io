
const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-token');

const router = Router();

//Crear usuarios
router.post('/new', [
    check('nombre', 'El nombre es obligatori0').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contrasenia es obligatoria').not().isEmpty(),
    validarCampos 
], crearUsuario);

//Login

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contrasenia es obligatoria').not().isEmpty(),
    validarCampos
], login);
//revalidar token

router.get('/renew',[ validarToken ], renewToken);

module.exports = router;