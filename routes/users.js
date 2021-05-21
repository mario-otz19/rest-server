const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { emailExists, isValidRole, userExistsById } = require('../helpers/validatorsDB');
const { fieldsValidator, jwtValidator, isAdminRole, hasRole } = require('../middlewares');
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/users');

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
    fieldsValidator
], addUser);    

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    check('role').custom( isValidRole ),
    fieldsValidator
], updateUser);   

router.delete('/:id', [
    jwtValidator,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE', 'OTHER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    fieldsValidator
], deleteUser);        

module.exports = router;