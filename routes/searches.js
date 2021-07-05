const { Router } = require('express');
const router = Router();

const { search } = require('../controllers/searches');

router.get('/:collection/:searchTerm', search);

module.exports = router;