"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoContent = exports.Created = exports.Success = void 0;
const ApiResponse_1 = require("./ApiResponse");
var SuccessType;
(function (SuccessType) {
    SuccessType["OK"] = "Ok";
    SuccessType["CREATED"] = "Created";
    SuccessType["NO_CONTENT"] = "NoContent";
})(SuccessType || (SuccessType = {}));
const ApiSuccess = (type, message = 'Success', data) => ({
    send: (res) => {
        switch (type) {
            case SuccessType.CREATED:
                return new ApiResponse_1.SuccessCreatedResponse(message).send(res);
            case SuccessType.NO_CONTENT:
                return new ApiResponse_1.SuccessNoContentResponse(message).send(res);
            default: {
                return new ApiResponse_1.SuccessResponse(message, data).send(res);
            }
        }
    },
});
const Success = (data, message = 'Response OK') => {
    return ApiSuccess(SuccessType.OK, message, data);
};
exports.Success = Success;
const Created = (data, message = 'Response OK - Created') => {
    return ApiSuccess(SuccessType.CREATED, message, data);
};
exports.Created = Created;
const NoContent = (message = 'Response OK - No Content') => {
    return ApiSuccess(SuccessType.NO_CONTENT, message);
};
exports.NoContent = NoContent;
//# sourceMappingURL=apiSuccess.js.map