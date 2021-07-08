const fs = require('fs');
const path = require('path');
const { Product, User } = require('../models');
const { uploadFile } = require('../helpers/uploadFile');

// Cargar archivo
const loadFile = async(req, res) => {
    try {
        // const fileName = await uploadFile(req.files, ['txt', 'md'], 'documents');
        // const fileName = await uploadFile(req.files);
        const fileName = await uploadFile(req.files, undefined, 'imgs');
        res.status(200).json({ fileName });
    } 
    
    catch (error) {
        console.log(error);

        return res.status(400).json({
            msg: error
        });     
    }
}

const updateFile = async(req, res) => {
    try {
        const { collection, id } = req.params;
        let model;

        switch (collection) {
            case 'users':
                model = await User.findById(id);

                if(!model) {
                    return res.status(400).json({
                        msg: `El usuario con el ID: ${ id } no existe`
                    });
                }

                break;

            case 'products':
                model = await Product.findById(id);

                if(!model) {
                    return res.status(400).json({
                        msg: `El producto con el ID: ${ id } no existe`
                    });
                }

                break;
        
            default:
                return res.status(500).json({
                    msg: 'Esta colección no está permitida, hable con el administrador'
                });
        }

        // Borrar imágenes previas
        // Verificar que exista registro de la imagen en BD
        if(model.img) {
            // Verificar que exista archivo de la imagen en la ruta (servidor)
            const imagePath = path.join(__dirname, '../uploads/', collection, model.img);

            if(fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        const fileName = await uploadFile(req.files, undefined, collection);
        model.img = fileName;

        await model.save();
        
        res.status(200).json({
            model
        });       
    } 
    
    catch (error) {
        console.log(error);

        return res.status(400).json({
            msg: error
        });    
    }
}

const showImage = async(req, res) => {
    const { collection, id } = req.params;

    try {
        const { collection, id } = req.params;
        let model;

        switch (collection) {
            case 'users':
                model = await User.findById(id);

                if(!model) {
                    return res.status(400).json({
                        msg: `El usuario con el ID: ${ id } no existe`
                    });
                }

                break;

            case 'products':
                model = await Product.findById(id);

                if(!model) {
                    return res.status(400).json({
                        msg: `El producto con el ID: ${ id } no existe`
                    });
                }

                break;
        
            default:
                return res.status(500).json({
                    msg: 'Esta colección no está permitida, hable con el administrador'
                });
        }

        // Borrar imágenes previas
        // Verificar que exista registro de la imagen en BD
        if(model.img) {
            // Verificar que exista archivo de la imagen en la ruta (servidor)
            const imagePath = path.join(__dirname, '../uploads/', collection, model.img);

            if(fs.existsSync(imagePath)) {
                return res.status(200).sendFile(imagePath);
            }
        }
        
        res.status(200).json({
            msg: 'Missing placeholder'
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
    loadFile,
    showImage,
    updateFile
}