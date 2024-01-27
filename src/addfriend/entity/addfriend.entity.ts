import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AddFriend {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    sender_user_id: number;

    @Column({ type: 'int' })
    receiver_user_id: number;

    @Column({ type: 'varchar' })
    status: string;

    @Column({ type: 'varchar' })
    created_date: string
}