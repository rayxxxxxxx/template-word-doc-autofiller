const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    'destination': (req, file, cb) => {
        let ext = path.extname(file.originalname);
        let baseDirPath = path.resolve('data');
        let dirPath = null;
        if (ext == '.json') { dirPath = path.resolve(baseDirPath, 'descriptors') }
        else if (ext == '.doc' || ext == '.docx') { dirPath = path.resolve(baseDirPath, 'templates') }
        else { dirPath = path.resolve(baseDirPath, 'uploads') }
        cb(null, dirPath);
    },
    'filename': (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ 'storage': storage });

module.exports = upload;