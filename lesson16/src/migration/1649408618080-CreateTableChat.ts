import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableChat1649408618080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Chat',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
                {
                    name: 'userChat',
                    type: 'varchar',
                    width: 255,
                    isNullable: false,
                },
                {
                    name: 'message',
                    type: 'varchar',
                    width: 255,
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'boolean',
                },
                {
                    name: 'userId',
                    type: 'int',
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
            'DROP TABLE IF EXISTS Chat',
        );
    }

}
