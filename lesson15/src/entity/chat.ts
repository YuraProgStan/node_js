import {
    Column, Entity,
} from 'typeorm';
 import { CommonFields } from './commonFields';

export interface IChat {
    userChat: string;
    message: string;
    status: boolean;
}

@Entity('Chat', { database: 'okten' })
export class Chat extends CommonFields implements IChat {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    userChat: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    message: string;

    @Column({
        type: 'boolean',
    })
    status: boolean;
}
