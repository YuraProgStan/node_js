import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { CommonFields } from './commonFields';
import {User} from './user';
import {Chat, IChat} from './chat';

export interface IUserImage {
    url: string;
    userId: number;
    chat?:IChat[];
}

@Entity('UserImage', { database: 'okten' })
export class UserImage extends CommonFields implements IUserImage {
    @Column({
        type: 'varchar',
        width: 255,
    })
        url: string;

    @Column({
        type: 'int',
    })
    userId: number;
    @ManyToOne(() => User, (user) => user.userImage)
    @JoinColumn({ name: 'userId' })
    user: User;
    @OneToMany(() => Chat, (chat) => chat.userImage)
    @JoinColumn({ name: 'userId' })
    chat: IChat[];
}
