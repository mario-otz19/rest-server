const { request, response } = require('express');

const getUsers = (req = request, res = response) => {
    const { q, name = 'No name', apiKey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - Controller',
        q, 
        name, 
        apiKey, 
        page, 
        limit
    });
}

const postUsers = (req, res = response) => {
    const body = req.body;
    const { name, age } = body;

    res.json({
        msg: 'post API - Controller',
        name, 
        age
    });
}

const putUsers = (req, res = response) => {
    const id = req.params.id;

    res.status(201).json({
        msg: 'put API - Controller',
        id
    });
}

const patchUsers = (req, res) => {
    res.json({
        msg: 'patch API - Controller'
    });
}

const deleteUsers = (req, res) => {
    res.json({
        msg: 'delete API - Controller'
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}