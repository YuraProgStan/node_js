"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsers1645566403837 = void 0;
class CreateTableUsers1645566403837 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            firstName VARCHAR(250) NOT NULL,
            lastName VARCHAR(250) NOT NULL,
            age INT CHECK (age > 0),
            phone VARCHAR(250) NOT NULL UNIQUE,
            email VARCHAR(250) NOT NULL UNIQUE,
            password VARCHAR(250) NOT NULL,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
    )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE IF EXISTS Users');
    }
}
exports.CreateTableUsers1645566403837 = CreateTableUsers1645566403837;
//# sourceMappingURL=1645566403837-CreateTableUsers.js.map