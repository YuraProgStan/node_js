import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { User } from './user';
import {CommonFields, ICommonFields} from './commonFields';
import {ActionTokenTypes} from '../enums/actionTokenTypes.enum';
import {config} from '../config/config';

export interface IActionToken extends ICommonFields{
    actionToken: string;
    type: ActionTokenTypes;
    userId: number;
}

export interface IActionTokenForSave{
    actionToken: string;
    type: ActionTokenTypes;
    userId: number;
}

@Entity('ActionToken', { database: config.MYSQL_DATABASE_NAME })
export class ActionToken extends CommonFields implements IActionToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    actionToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    type: ActionTokenTypes;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
