const dbValidators = require('./dbValidators');
const googleVerify = require('./googleVerify');
const jwtGenerator = require('./jwtGenerator');
const uploadFile = require('./uploadFile');

module.exports = {
    ...dbValidators,
    ...googleVerify,
    ...jwtGenerator,
    ...uploadFile    
}