const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { emailExists, isValidRole, userExistsById } = require('../helpers/validatorsDB');
const { validateFields } = require('../middlewares/validateFields');
const { getUsers, addUser, updateUser, patchUsers, deleteUser } = require('../controllers/users');

// Operaciones con usuarios
router.get('/', getUsers);  

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo electrónico no es válido').isEmail(),
    check('email').custom( emailExists ),
    // check('role', 'No es un rol válido').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
    check('role').custom( isValidRole ),
    validateFields
], addUser);    

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    check('role').custom( isValidRole ),
    validateFields
], updateUser);   

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    validateFields
], deleteUser);        

module.exports = router;