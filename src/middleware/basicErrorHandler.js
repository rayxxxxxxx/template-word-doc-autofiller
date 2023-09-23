const APIError = require('../modules/APIError.js');

function basicErrorHandler(err, req, res, next) {
    let context = {
        'layout': 'default'
    };

    if (err instanceof Error) {
        // console.log(err);
        context['message'] = err.message;
        res.status(500).render('error', context);
        return;
    }
    else if (err instanceof APIError) {
        // console.log(err.message);
        context['message'] = err.message;
        context['status'] = err.status;
        res.status(err.status).render('error', context);
        return;
    }
    next(err);
}

module.exports = basicErrorHandler;