const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { jwtValidator, fieldsValidator, isAdminRole } = require('../middlewares');
const { categoryExistsById, productExistsById } = require('../helpers/validatorsDB');
const { createProduct, deleteProduct, getProduct, getProducts, updateProduct } = require('../controllers/products');

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( productExistsById ),
    fieldsValidator
], getProduct);

router.post('/', [
    jwtValidator,
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('category', 'No es un ID de Mongo válido').isMongoId(),
    check('category', 'La categoría del producto es obligatoria').not().isEmpty(),
    check('category').custom( categoryExistsById ),
    fieldsValidator    
], createProduct);

router.put('/:id', [
    jwtValidator,
    check('id').custom( productExistsById ),
    fieldsValidator
], updateProduct);

router.delete('/:id', [
    jwtValidator,
    isAdminRole,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( productExistsById ),
    fieldsValidator
], deleteProduct);

module.exports = router;