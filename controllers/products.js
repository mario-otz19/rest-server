const { Product } = require('../models');

const getProducts = async(req, res) => {
    try {
        const { from = 0, limit = 5 } = req.query;
        const query = { state: true };

        const [ totalRecords, products ] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip( Number(from) )
                .limit( Number(limit) )
                .populate('user', 'name')
                .populate('category', 'name')
        ]);

         res.status(200).json({
            totalRecords,
            products
        });     
    } 
    
    catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Por favor, hable con el administrador'
        });        
    }
}

const getProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
                            .populate('user', 'name')
                            .populate('category', 'name')

        return res.status(200).json({
            product
        });
    } 
    
    catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Por favor, hable con el administrador'
        });        
    }
}

const createProduct = async(req, res) => {
    try {
        const { state, user, name, ...body } = req.body;
        productName = name.toUpperCase();

        const dbProduct = await Product.findOne({ name: productName });

        if(dbProduct) {
            return res.status(400).json({
                msg: `El producto ${ dbProduct.name } ya existe.`
            });        
        }
    
        // Generar la data a guardar
        const data = {
            name: productName,
            ...body,
            user: req.user._id
        }
    
        const product = new Product(data);
        await product.save();
    
        return res.status(201).json({
            product
        });
    } 
    
    catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Por favor, hable con el administrador'
        });        
    }
}

const updateProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const { state, user, ...data } = req.body;

        if(data.name) {
            data.name = data.name.toUpperCase();
        }

        data.user = req.user._id;

        const product = await Product.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).json({
            product
        });
    } 
    
    catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Por favor, hable con el administrador'
        });        
    }
}

const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true });

        return res.status(200).json({
            product
        });
    } 
    
    catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Por favor, hable con el administrador'
        });        
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}