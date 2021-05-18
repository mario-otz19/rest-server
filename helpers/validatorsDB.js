const User = require('../models/user');
const Role = require('../models/role');

// Validar que el rol existe
const isValidRole = async(role = '') => {
    const roleExists = await Role.findOne({ role });

    if(!roleExists) {
        throw new Error(`El rol: '${ role }' no se encuentra registrado en la BD`);
    }
}

// Validar que el correo electrónico existe
const emailExists = async(email = '') => {
    const exists = await User.findOne({ email });

    if(exists) {
        throw new Error(`El correo: '${ email }' ya se encuentra registrado`);     
    }
}

// Validar que el usuario existe
const userExistsById  = async(id) => {
    userExists = await User.findById(id);
    
    if(!userExists) {
        throw new Error(`El id: '${ id }' no existe`);     
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById
}