const fieldsValidator = require('../middlewares/fieldsValidator');
const jwtValidator = require('../middlewares/jwtValidator');
const roleValidator = require('../middlewares/roleValidator');

module.exports = {
    ...fieldsValidator,
    ...jwtValidator,
    ...roleValidator
}