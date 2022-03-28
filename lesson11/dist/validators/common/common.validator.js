"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonValidator = void 0;
const constants_1 = require("../../constants");
const joi_1 = __importDefault(require("joi"));
exports.commonValidator = {
    emailValidator: joi_1.default.string().required().regex(constants_1.constants.EMAIL_REGEXP),
    phoneValidator: joi_1.default.string().required().regex(constants_1.constants.PHONE_REGEXP)
};
//# sourceMappingURL=common.validator.js.map