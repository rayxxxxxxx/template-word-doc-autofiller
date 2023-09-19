const path = require('path');
const fs = require('fs');

const express = require('express');

const upload = require('./upload.js');

const home = express.Router();

home.get('/', (req, res) => {
    res.render('home');
});

home.post('/', upload.single('formDescriptorFile'), (req, res) => {
    let formDescriptor = {
        'formDescriptor': JSON.parse(fs.readFileSync(req.file.path, { 'encoding': 'utf-8' }))
    };
    req.session['formDescriptor'] = formDescriptor;
    fs.unlink(req.file.path, (err) => {
        if (err) res.status(500).send(err.message);
    });
    res.redirect('/generator');
});


module.exports = home;