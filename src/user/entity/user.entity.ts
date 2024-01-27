import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Post } from '../../post/entity/post.entity';
import { AddFriend } from '../../addfriend/entity/addfriend.entity';

@Entity()
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40, unique : true })
  email: string;

  @Column({ type: 'bigint' })
  mobile: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar'})
  date: string;

  @OneToMany(type => Post, post => post.user_id) posts: Post[];  
  
}


