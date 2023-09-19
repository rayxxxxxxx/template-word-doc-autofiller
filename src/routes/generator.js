const path = require('path');
const fs = require('fs');

const epxress = require('express');
const docxTemplates = require('docx-templates');

const upload = require('./upload.js');

const generator = epxress.Router();

generator.get('/', (req, res) => {
    let context = req.session['formDescriptor'];
    res.render('generator', context);
});

generator.post('/loadTemplate', upload.single('templateWordDoc'), async (req, res) => {
    if (req.session['templateFilePath'] != undefined) {
        fs.unlink(req.session['templateFilePath'], (err) => {
            if (err) res.status(500).send(err.message);
        });
    }
    req.session['templateFilePath'] = req.file.path;
    res.sendStatus(200);
});

generator.post('/render', async (req, res) => {
    let templateFilePath = req.session['templateFilePath'];
    let templateFile = fs.readFileSync(templateFilePath);

    let fileBuffer = await docxTemplates.createReport({
        'template': templateFile,
        'data': req.body,
        'cmdDelimiter': '+++',
    });

    let date = new Date(Date.now());
    let fileNamePrefix = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    let fileSaveName = req.body.fileSaveName ? req.body.fileSaveName + '.docx' : fileNamePrefix + "_" + req.file.filename;

    let fileSavePath = path.resolve('data', 'downloads', fileSaveName);

    fs.writeFile(fileSavePath, fileBuffer, (err) => {
        if (err) res.status(500).send(err.message);
        res.download(fileSavePath, (err) => {
            if (err) throw new Error(err.message);
            fs.unlinkSync(fileSavePath);
        });
    });
});

module.exports = generator;