const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { jwtGenerator } = require('../helpers/jwtGenerator');
const { googleVerify } = require('../helpers/googleVerify');

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

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;
    // console.log('Token: ', id_token);    

    try {
        const { email, name, img } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if(!user) {
            // Crear usuario
            const data = {
                email,
                name,
                password: ':P',
                img,
                google: true
            }

            user = new User(data);
            await user.save();
        }

        if(!user.state) {
            return res.status(401).json({
                msg: `Hable con el admin, usuario bloqueado`
            });            
        }
        
        // Generar JWT
        const token = await jwtGenerator(user.id);        

        return res.status(200).json({
            user,
            token
        });    
    } 
    
    catch (error) {
        console.log(error);
        
        return res.status(400).json({
            msg: 'El token de Google no es válido... :v'
        });    
    }
}

module.exports = {
    login,
    googleSignIn
}