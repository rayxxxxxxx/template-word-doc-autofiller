const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const https = require('https');

const express = require('express');
const expressHbs = require('express-handlebars');
const expressSession = require('express-session');
// const cookieParser = require('cookie-parser');

const stringUtils = require('./utils/stringUtils.js');

const welcome = require('./routes/welcome.js');
const home = require('./routes/home.js');
const creator = require('./routes/creator.js');
const generator = require('./routes/generator.js');

const COOKIE_SECRET = crypto.randomUUID();
const SESSION_SECRET = crypto.randomUUID();

const app = express();

app.engine('hbs', expressHbs.engine({
    'layoutsDir': path.resolve('src', 'views', 'layouts'),
    'partialsDir': path.resolve('src', 'views', 'partials'),
    'defaultLayout': 'layout',
    'extname': 'hbs',
    'encoding': 'utf-8',
    'helpers': {
        'toSnakeCase': stringUtils.toSnakeCase,
        'toCamelCase': stringUtils.toCamelCase,
        'toIdAttrCase': stringUtils.toIdAttrCase,
        'toNameAttrCase': stringUtils.toNameAttrCase,
    }
}));

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
// app.use(cookieParser(COOKIE_SECRET));
app.use(expressSession({
    'secret': SESSION_SECRET,
    'saveUninitialized': false,
    'resave': false,
    'cookie': {
        'secure': true,
        'sameSite': true,
        'maxAge': 10 * 60 * 1000
    }
}));
app.use('/static', express.static(path.resolve('src', 'static')));

app.use('/', welcome);
app.use('/home', home);
app.use('/creator', creator);
app.use('/generator', generator);

const dotenv = require('dotenv');
dotenv.config();

const HOST = process.env['HOST'];
const PORT = process.env['PORT'];

const OPTIONS = {
    'key': fs.readFileSync(path.resolve('certs', 'selfsigned.key')),
    'cert': fs.readFileSync(path.resolve('certs', 'selfsigned.crt'))
};

const server = https.createServer(OPTIONS, app);
server.listen(PORT, HOST, () => {
    console.log(`https://${HOST}:${PORT}/`);
});

// app.listen(PORT, HOST, (err) => {
//     if (err) {
//         return new Error(err);
//     }
//     console.log(`http://${HOST}:${PORT}/`);
// });
