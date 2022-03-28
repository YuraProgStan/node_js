"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableTokens1647970549056 = void 0;
class CreateTableTokens1647970549056 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Tokens(
            id INT PRIMARY KEY AUTO_INCREMENT,
            refreshToken VARCHAR(255) NOT NULL,
             userId INT  NOT NULL,
              createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
              deletedAt TIMESTAMP,
             FOREIGN KEY (userId) REFERENCES Users(id) 
        )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
        DROP TABLE IF EXISTS Tokens
        `);
    }
}
exports.CreateTableTokens1647970549056 = CreateTableTokens1647970549056;
//# sourceMappingURL=1647970549056-CreateTableTokens.js.map