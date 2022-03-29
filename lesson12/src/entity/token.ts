import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { User } from './user';
import { CommonFields } from './commonFields';

export interface IToken {
    refreshToken: string;
    accessToken: string;
    userId: number;
}

@Entity('Tokens', { database: 'okten' })
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
