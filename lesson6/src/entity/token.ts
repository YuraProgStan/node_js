import {
    Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import {CommonFields} from "./commonFields";

export interface IToken {
    refreshToken: string;
    userId: number;
}

@Entity('Tokens', { database: 'okten' })
export class Token extends CommonFields implements IToken {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
