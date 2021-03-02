"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.BadRequestError = exports.InternalError = exports.ApiError = void 0;
const config_1 = require("../config");
const ApiResponse_1 = require("./ApiResponse");
var ErrorType;
(function (ErrorType) {
    ErrorType["INTERNAL"] = "InternalError";
    ErrorType["NOT_FOUND"] = "NotFoundError";
    ErrorType["BAD_REQUEST"] = "BadRequestError";
})(ErrorType || (ErrorType = {}));
class ApiError extends Error {
    constructor(type, message = 'error') {
        super(message);
        this.type = type;
        this.message = message;
    }
    static handle(err, res) {
        switch (err.type) {
            case ErrorType.INTERNAL:
                return new ApiResponse_1.InternalErrorResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
                return new ApiResponse_1.NotFoundResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new ApiResponse_1.BadRequestResponse(err.message).send(res);
            default: {
                let { message } = err;
                // Do not send failure message in production as it may send sensitive data
                if (config_1.environment === 'production')
                    message = 'Something wrong happened.';
                return new ApiResponse_1.InternalErrorResponse(message).send(res);
            }
        }
    }
}
exports.ApiError = ApiError;
class InternalError extends ApiError {
    constructor(message = 'Internal error') {
        super(ErrorType.INTERNAL, message);
    }
}
exports.InternalError = InternalError;
class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(ErrorType.BAD_REQUEST, message);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
        super(ErrorType.NOT_FOUND, message);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=ApiError.js.map