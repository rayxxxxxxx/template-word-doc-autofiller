const express = require('express');

const welcome = express.Router();

welcome.get('/', (req, res) => {
    res.render('welcome');
});

module.exports = welcome;