const { uploadFile } = require('../helpers/uploadFile');

// Cargar archivo
const loadFile = async(req, res) => {
    // Validar que se hayan subido archivos
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            msg: 'There are no files to upload'
        });
    }

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

module.exports = {
    loadFile
}