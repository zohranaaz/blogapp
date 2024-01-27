import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { Post } from './post/entity/post.entity'
import { AddFriend } from './addfriend/entity/addfriend.entity';
import { PostModule } from './post/post.module';
import { AddFriendModule } from './addfriend/addfriend.module';
import 'dotenv/config'

@Module({
imports: [ TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  password: process.env.DATABASEPASSWORD,
  username: 'postgres',
  entities: [User, Post, AddFriend],
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
}), UserModule, PostModule, AddFriendModule ],
})
export class AppModule {}
