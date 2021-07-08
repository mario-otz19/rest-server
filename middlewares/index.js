const fieldsValidator = require('../middlewares/fieldsValidator');
const fileValidator = require('../middlewares/fileValidator');
const jwtValidator = require('../middlewares/jwtValidator');
const roleValidator = require('../middlewares/roleValidator');

module.exports = {
    ...fieldsValidator,
    ...fileValidator,
    ...jwtValidator,
    ...roleValidator
}