const express = require('express');

const creator = express.Router();

creator.get('/', (req, res) => {
    let context = {
        'host': process.env['HOST'],
        'port': process.env['PORT']
    };
    res.render('creator', context);
});

module.exports = creator;