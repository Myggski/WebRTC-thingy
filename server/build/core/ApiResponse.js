"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessNoContentResponse = exports.SuccessCreatedResponse = exports.SuccessResponse = exports.FailureMsgResponse = exports.InternalErrorResponse = exports.BadRequestResponse = exports.NotFoundResponse = exports.ApiResponse = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode["SUCCESS"] = "10000";
    StatusCode["FAILURE"] = "10001";
})(StatusCode || (StatusCode = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(ResponseStatus || (ResponseStatus = {}));
class ApiResponse {
    constructor(statusCode, status, message) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
    prepare(res, response) {
        return res.status(this.status).json(response);
    }
    send(res) {
        return this.prepare(res, this);
    }
}
exports.ApiResponse = ApiResponse;
class NotFoundResponse extends ApiResponse {
    constructor(message = 'Not Found') {
        super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
    }
    send(res) {
        var _a;
        this.url = (_a = res.req) === null || _a === void 0 ? void 0 : _a.originalUrl;
        return super.prepare(res, this);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Parameters') {
        super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
    }
}
exports.BadRequestResponse = BadRequestResponse;
class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
    }
}
exports.InternalErrorResponse = InternalErrorResponse;
class FailureMsgResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
    }
}
exports.FailureMsgResponse = FailureMsgResponse;
class SuccessResponse extends ApiResponse {
    constructor(message, data) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
        this.data = data;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.SuccessResponse = SuccessResponse;
class SuccessCreatedResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.SUCCESS, ResponseStatus.CREATED, message);
    }
}
exports.SuccessCreatedResponse = SuccessCreatedResponse;
class SuccessNoContentResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.SUCCESS, ResponseStatus.NO_CONTENT, message);
    }
}
exports.SuccessNoContentResponse = SuccessNoContentResponse;
//# sourceMappingURL=ApiResponse.js.map