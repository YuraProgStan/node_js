"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const common_validator_1 = require("../common/common.validator");
const joi_1 = __importDefault(require("joi"));
exports.authValidator = {
    login: joi_1.default.object({
        email: common_validator_1.commonValidator.emailValidator.message('Email not valid').trim(),
        password: joi_1.default.string().required().min(8).message('Password not valid').trim()
    }),
    registration: joi_1.default.object({
        firstName: joi_1.default.string().required().min(2).trim(),
        lastName: joi_1.default.string().required().min(2).trim(),
        age: joi_1.default.number().min(18).max(70).message('Age not valid'),
        phone: common_validator_1.commonValidator.phoneValidator.message('Phone not valid').trim(),
        email: common_validator_1.commonValidator.emailValidator.message('Email not valid').trim(),
        password: joi_1.default.string().required().min(8).message('Password not valid').trim()
    }),
};
//# sourceMappingURL=auth.validator.js.map