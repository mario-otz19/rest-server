const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldsValidator, isAdminRole, jwtValidator } = require('../middlewares');
const { categoryExistsById } = require('../helpers/dbValidators');
const { createCategory, deleteCategory, getCategories, getCategory, updateCategory } = require('../controllers/categories');

// Obtener todas la cvategorías por ID
router.get('/', getCategories);

// Obtener categoría por ID - Público
router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( categoryExistsById ),
    fieldsValidator
], getCategory);

// Crear categoría - Privado - Cualquier persona con un token válido
router.post('/', [
    jwtValidator,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    fieldsValidator
], createCategory);

// Actualizar categoría por ID - Privado - Cualquier persona con un token válido
router.put('/:id', [
    jwtValidator,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( categoryExistsById ),
    fieldsValidator
], updateCategory);

// Eliminar categoría por ID - Admin - Cualquier persona con un token válido
router.delete('/:id', [
    jwtValidator,
    isAdminRole,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( categoryExistsById ),
    fieldsValidator
], deleteCategory);

module.exports = router;