const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldsValidator, validateFileUpload } = require('../middlewares');
const { allowedCollections } = require('../helpers/dbValidators');
const { loadFile, showImage, updateFile, updateCloudinaryImage } = require('../controllers/uploads');

// Subir archivo (imagen)
router.post('/', validateFileUpload, loadFile);

// Actualizar archivo (imagen)
router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('collection').custom( c => allowedCollections(c, ['users', 'products'])),
    fieldsValidator
// ], updateFile);
], updateCloudinaryImage);

router.get('/:collection/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('collection').custom( c => allowedCollections(c, ['users', 'products'])),
], showImage);

module.exports = router;