const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async(req = request, res = response) => {
    const { from = 0, limit = 5 } = req.query;
    const query = { state: true };
    
    // const users = await User.find(query)
    //     .skip( Number(from) )
    //     .limit( Number(limit) );

    // const totalRecords = await User.countDocuments(query);

    const [ totalRecords, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip( Number(from) ).limit( Number(limit) )
    ]);

    res.json({
        // resp
        totalRecords,
        users
    });
}

// Agregar un nuevo usuario
const addUser = async(req, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await user.save();

    res.json({
        user
    });
}

const updateUser = async(req, res = response) => {
    const { id } = req.params;
    const { _id, email, password, google, ...rest } = req.body;

    if(password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.status(201).json({
        user
    });
}

const deleteUser = async(req, res) => {
    const { id } = req.params;

    // Borrar de BD definitivamente
    // const user = await User.findByIdAndDelete(id);
    
    // Actualizar el estado del usuario (para que no se muestre)
    const user = await User.findByIdAndUpdate(id, { state: false }, {new: true});

    res.json({
        user
    });
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}