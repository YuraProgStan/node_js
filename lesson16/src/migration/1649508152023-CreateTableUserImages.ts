import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableUserImages1649508152023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'UserImage',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
                {
                    name: 'url',
                    type: 'varchar',
                    width: 255,
                },
                {
                    name: 'userId',
                    type: 'int',
                    isNullable: false,
                },

                {
                    name: 'createdAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()',
                },

                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],


        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'DROP TABLE IF EXISTS UserImage',
        );
    }

}
