const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const jwtValidator = async(req = request, res = response	, next) => {
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: `No se ha encontrado token en la petición`
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        // Obtener el usuario que corresponde al "uid"
        const user = await User.findById(uid);

        // Verificar si el usuario exista en BD
        if(!user) {
            return res.status(401).json({
                msg: `Token no válido - Usuario no encontrado en BD`
            }); 
        }

        // Verificar si el usuario está activo, no se ha borrado (valor "true" en el campo "state")
        if(!user.state) {
            return res.status(401).json({
                msg: `Token no válido - Usuario con estado: false`
            }); 
        }

        // Crea nueva propiedad dentro del request
        req.user = user;
    
        next();
    } 
    
    catch (error) {
        console.log(error);

        return res.status(401).json({
            msg: `Token no válido`
        });
    }
}

module.exports = {
    jwtValidator
}