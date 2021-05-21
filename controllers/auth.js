const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { jwtGenerator } = require('../helpers/jwtGenerator');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    
    try {
        // Verificar si el correo existe
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                msg: `El usuario o contraseña no son correctos. -> correo`
            });
        }
        
        // Ver si el usuario está activo
        if(!user.state) {
            return res.status(400).json({
                msg: `El usuario o contraseña no son correctos. -> estado: false`
            });
        }
        
        // Verificar la contraseña
        validatePassword =  bcryptjs.compareSync(password, user.password);

        if(!validatePassword) {
            return res.status(400).json({
                msg: `El usuario o contraseña no son correctos. -> contraseña`
            });
        }

        // Generar JWT
        const token = await jwtGenerator(user.id);

        res.json({
            user,
            token
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
    login
}