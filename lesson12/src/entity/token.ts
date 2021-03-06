import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { User } from './user';
import { CommonFields } from './commonFields';
import {config} from '../config/config';

export interface IToken {
    refreshToken: string;
    accessToken: string;
    userId: number;
}

@Entity('Tokens', { database: config.MYSQL_DATABASE_NAME })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    accessToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
