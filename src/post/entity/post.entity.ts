import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity'

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    content: string;

    @Column({ type: 'int' })
    user_id: number;

    @Column({ type: 'boolean' })
    is_deleted: boolean;

    @Column({ type: 'varchar' })
    created_date: string

}