"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
exports.config = {
    PORT: process.env.PORT || 5000,
    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,
    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH,
    USER_SALT_ROUNDS: process.env.USER_SALT_ROUNDS,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
};
//# sourceMappingURL=config.js.map