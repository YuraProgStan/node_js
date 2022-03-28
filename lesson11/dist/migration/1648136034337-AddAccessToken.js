"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAccessToken1648136034337 = void 0;
class AddAccessToken1648136034337 {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE '
            + 'Tokens ADD COLUMN accessToken VARCHAR(255) NOT NULL');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE '
            + 'Tokens DROP COLUMN accessToken');
    }
}
exports.AddAccessToken1648136034337 = AddAccessToken1648136034337;
//# sourceMappingURL=1648136034337-AddAccessToken.js.map