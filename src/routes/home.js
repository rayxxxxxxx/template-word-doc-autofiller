const path = require('path');
const fs = require('fs');

const express = require('express');

const APIError = require('../modules/APIError.js');

const upload = require('./upload.js');

const home = express.Router();

home.get('/', (req, res) => {
    res.render('home');
});

home.post('/', upload.single('formDescriptorFile'), (req, res, next) => {
    if (path.extname(req.file.path) != '.json') {
        let errorMessage = `incorrect file extension (must be .json, got ${path.extname(req.file.path)})`;
        next(APIError.internalServerError(errorMessage));
        return;
    }

    let formDescriptor = {
        'formDescriptor': JSON.parse(fs.readFileSync(req.file.path, { 'encoding': 'utf-8' }))
    };
    req.session['formDescriptor'] = formDescriptor;
    fs.unlink(req.file.path, (err) => {
        if (err) {
            next(APIError.internalServerError());
            return;
        }
    });

    res.redirect('/generator');
});


module.exports = home;