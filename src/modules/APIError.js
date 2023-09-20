class APIError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

    static badRequest(message = 'BAD REQUEST') {
        return new APIError(400, message);
    }

    static notFound(message = 'NOT FOUND') {
        return new APIError(404, message);
    }

    static internalServerError(message = 'INTERNAL SERVER ERROR') {
        return new APIError(500, message);
    }

    static notImplemented(message = 'NOT IMPLEMENTED') {
        return new APIError(501, message);
    }
}

module.exports = APIError;