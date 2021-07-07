const path = require('path');
const { v4: uuid } = require('uuid');

const extensions = ['png', 'jpg', 'jpeg', 'gif'];

// Función para subir archivos de manera dinámica
const uploadFile = (files, validExtensions = extensions, folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const cutFileName = file.name.split('.');
        const extension = cutFileName[ cutFileName.length - 1 ];
    
        if(!validExtensions.includes(extension)) {
            return reject (`The .${ extension } extension is not supported, valid extensions ${ validExtensions }`);
        }
    
        // Nombre temporal
        const newName = uuid() + '.' + extension;

        // Ruta a mover
        const uploadPath = path.join (__dirname, '../uploads/', folder, newName);
        
        // Mover archivo a otra ruta
        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
        
            return resolve(newName);
        });    
    });
}

module.exports = {
    uploadFile
}