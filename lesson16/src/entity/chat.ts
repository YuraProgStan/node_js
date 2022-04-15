import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
 import { CommonFields } from './commonFields';
import {UserImage} from './userImage';

export interface IChat {
    userChat: string;
    message: string;
    status: boolean;
    userId: number;
    urlImage?: string;
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
    @Column({
        type: 'int',
    })
    userId: number;
    @ManyToOne(() => UserImage, (userImage) => userImage.user)
    @JoinColumn({ name: 'userId' })
    userImage: UserImage;
}
