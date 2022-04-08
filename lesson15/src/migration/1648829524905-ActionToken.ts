import {MigrationInterface, QueryRunner} from "typeorm";


export class ActionToken1648829524905 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS ActionToken(
            id INT PRIMARY KEY AUTO_INCREMENT,
            actionToken VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            userId INT  NOT NULL,
            createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
            deletedAt TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES Users(id)
             )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS ActionToken
        `);
    }

}
