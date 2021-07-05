const { ObjectId } = require('mongoose').Types;
const { Category, Product, User } = require('../models');

const collectionsAllowed = [
    'categories',
    'products',
    'roles',
    'users'
];

// Buscar categorías
const searchCategories = async(searchTerm = '', res) => {
    // Verificar que sea un ID de Mongo válido (true o false)
    const isMongoID = ObjectId.isValid(searchTerm);

    if(isMongoID) {
        const category = await Category.findById(searchTerm);

        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regexp = new RegExp(searchTerm, 'i');
    const categories = await Category.find({ name: regexp, state: true });

    return res.json({
        results: categories
    });    
}

// Buscar productos
const searchProducts = async(searchTerm = '', res) => {
    // Verificar que sea un ID de Mongo válido (true o false)
    const isMongoID = ObjectId.isValid(searchTerm);

    if(isMongoID) {
        const product = await Product.findById(searchTerm)
                            .populate('category', 'name');

        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regexp = new RegExp(searchTerm, 'i');
    const products = await Product.find({ name: regexp, state: true })
                            .populate('category', 'name');

    return res.json({
        results: products
    });    
}

// Buscar usuarios
const searchUsers = async(searchTerm = '', res) => {
    // Verificar que sea un ID de Mongo válido (true o false)
    const isMongoID = ObjectId.isValid(searchTerm);

    if(isMongoID) {
        const user = await User.findById(searchTerm);

        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regexp = new RegExp(searchTerm, 'i');
    const users = await User.find({ 
        $or: [{ name: regexp }, { email: regexp }],
        $and: [{ state: true }]
     });

    return res.json({
        results: users
    });    
}

const search = (req, res) => {
    const { collection, searchTerm } = req.params;
    
    if(!collectionsAllowed.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${ collectionsAllowed }`
        });
    }
    
    switch (collection) {
        case 'categories':
            searchCategories(searchTerm, res);
            break;
            
        case 'products':
            searchProducts(searchTerm, res);    
            break;

        case 'users':
            searchUsers(searchTerm, res);
            break;
    
        default:
            return res.status(500).json({
                msg: 'Esta búsqueda no está permitida, hable con el administrador'
            });                    
    }
}

module.exports = {
    search
}