import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { AddFriendService } from '../addfriend/addfriend.service';
import { PostService } from './post.service';
import { AddFriend } from '../addfriend/entity/addfriend.entity';
import { Post } from './entity/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, AddFriend])],
  controllers: [PostController],
  providers: [PostService, AddFriendService]
})
export class PostModule { }