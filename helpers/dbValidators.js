const { Category, Product, User, Role } = require('../models');

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
const userExistsById = async(id) => {
    userExists = await User.findById(id);
    
    if(!userExists) {
        throw new Error(`El id: '${ id }' no existe`);     
    }
}

// Validar que la categoría exista
const categoryExistsById = async(id) => {
    categoryExists = await Category.findById(id);
    
    if(!categoryExists || categoryExists.state === false) {
        throw new Error(`El id: '${ id }' de categoría no existe`);     
    }
}

// Validar que el producto exista
const productExistsById = async(id) => {
    productExists = await Product.findById(id);
    
    if(!productExists || productExists.state === false) {
        throw new Error(`El id: '${ id }' de producto no existe`);     
    }
}

module.exports = {
    categoryExistsById,
    emailExists,
    isValidRole,
    productExistsById,
    userExistsById
}