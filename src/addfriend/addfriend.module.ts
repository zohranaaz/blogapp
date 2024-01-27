import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddFriendController } from './addfriend.controller';
import { AddFriendService } from './addfriend.service';
import { AddFriend } from './entity/addfriend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddFriend])],
  controllers: [AddFriendController],
  providers: [AddFriendService]
})
export class AddFriendModule { }