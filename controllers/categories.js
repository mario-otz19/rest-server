const { Category } = require('../models');

// Obtener todas la categorías - Público - Paginado - Total - Populate
const getCategories = async(req, res) => {
    try {
        const { from = 0, limit = 5 } = req.query;
        const query = { state: true };

        const [ totalRecords, categories ] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip( Number(from) )
                .limit( Number(limit) )
                .populate('user', 'name')
        ]);

        return res.status(200).json({
            totalRecords,
            categories
        });        
    }

    catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Por favor, hable con el administrador'
        });
    }
}

// Obtener categoría por ID - Populate
const getCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id)
                            .populate('user', 'name');

        return res.status(200).json({
            category
        });
    } 
    
    catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Por favor, hable con el administrador'
        });        
    }
}

// Crear categoría
const createCategory = async(req, res) => {
    try {
        const name = req.body.name.toUpperCase();
        
        const dbCategory = await Category.findOne({ name });
    
        if(dbCategory) {
            return res.status(400).json({
                msg: `La categoría ${ dbCategory.name } ya existe.`
            });        
        }
    
        // Generar la data a guardar
        const data = {
            name,
            user: req.user._id
        }
    
        const category = new Category(data);
        await category.save();
    
        return res.status(201).json({
            category
        });
    }
    
    catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Por favor, hable con el administrador'
        });
    }
}

// Actualizar categoría
const updateCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const { state, user, ...data } = req.body;
        data.name = data.name.toUpperCase();
        data.user = req.user._id;

        const category = await Category.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).json({
            category
        });
    }
    
    catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Por favor, hable con el administrador'
        });
    }
}

// Eliminar categoría (Actualizar estado a false)
const deleteCategory = async(req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(id, { state: false }, { new: true });

        return res.status(200).json({
            category
        });
    }
    
    catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Por favor, hable con el administrador'
        });
    }
}

module.exports = {
    createCategory,
    deleteCategory,
    getCategory,
    getCategories,
    updateCategory
}