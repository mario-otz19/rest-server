const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { login, googleSignIn } = require('../controllers/auth');

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldsValidator
], login);  

router.post('/google', [
    check('id_token', 'El ID token es necesario').not().isEmpty(),
    fieldsValidator
], googleSignIn);  

module.exports = router;