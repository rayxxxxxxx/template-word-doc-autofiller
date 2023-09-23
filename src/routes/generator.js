const path = require('path');
const fs = require('fs');

const epxress = require('express');
const docxTemplates = require('docx-templates');

const APIError = require('../modules/APIError.js');

const upload = require('./upload.js');

const generator = epxress.Router();

generator.get('/', (req, res) => {
    let context = req.session['formDescriptor'];
    if (context == undefined) {
        res.redirect('/home');
        return;
    }
    res.render('generator', context);
});

generator.post('/loadTemplate', upload.single('templateWordDoc'), async (req, res, next) => {
    if (req.session['templateFilePath'] != undefined && req.session['templateFilePath'] != req.file.path) {
        fs.unlink(req.session['templateFilePath'], (err) => {
            if (err) {
                next(APIError.internalServerError(err.message));
                return;
            }
        });
    }
    req.session['templateFilePath'] = req.file.path;
    res.sendStatus(200);
});

generator.post('/render', async (req, res, next) => {
    let templateFilePath = req.session['templateFilePath'];
    if (templateFilePath == undefined) {
        res.redirect('/generator');
        return;
    }

    let templateFile = fs.readFileSync(templateFilePath);

    let failToRender = false;
    let fileBuffer = await docxTemplates.createReport({
        'template': templateFile,
        'data': req.body,
        'cmdDelimiter': '+++',
        'errorHandler': () => { failToRender = true; }
    });
    if (failToRender) {
        next(APIError.internalServerError('can not render file'));
        return;
    }

    let date = new Date(Date.now());
    let fileNamePrefix = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    let fileSaveName = req.body.fileSaveName ? req.body.fileSaveName.replace(' ', '_') + '.docx' : fileNamePrefix + "_" + req.session['templateFilePath'].split('/').at(-1).replace(' ', '_');

    let fileSavePath = path.resolve('data', 'downloads', Buffer.from(fileSaveName, 'utf-8').toString()).replace(' ', '_');

    fs.writeFile(fileSavePath, fileBuffer, (err) => {
        if (err) {
            next(APIError.internalServerError(err.message));
            return;
        };
        res.download(fileSavePath, (err) => {
            if (err) {
                next(APIError.internalServerError(err.message));
                return;
            };
            fs.unlinkSync(fileSavePath);
        });
    });
});

module.exports = generator;