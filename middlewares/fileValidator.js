const validateFileUpload = (req, res, next) => {
    // Validar que se hayan subido archivos
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            msg: 'There are no files to upload'
        });
    }

    return next();
}

module.exports = {
    validateFileUpload
}