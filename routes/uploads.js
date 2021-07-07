const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { loadFile } = require('../controllers/uploads');

// Subir archivo
router.post('/', loadFile);

module.exports = router;