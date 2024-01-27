import { Injectable } from '@nestjs/common';
import { AddFriendDto } from './dto/addfriend.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { AddFriend } from './entity/addfriend.entity'
import { Brackets, Repository } from 'typeorm';
import { status } from './dto/status.dto';

@Injectable()
export class AddFriendService {

    constructor(@InjectRepository(AddFriend) private readonly addfriendRepo: Repository<AddFriend>,) { }

    async addFriend(addfriendDto: AddFriendDto) {
        const friend = new AddFriend();
        const sender_user_id = addfriendDto.sender_user_id;
        const receiver_user_id = addfriendDto.receiver_user_id;

        friend.sender_user_id = sender_user_id;
        friend.receiver_user_id = receiver_user_id;
        friend.status = status.PENDING;
        friend.created_date = new Date().toString();
        const friend_status = addfriendDto.status;

        if (friend_status) {

            try {
                const find_post = await this.addfriendRepo.findOneBy({
                    sender_user_id: sender_user_id,
                    receiver_user_id: receiver_user_id,
                });

                if (!find_post) {

                    return { error: "No friend request Found!" };
                }
                friend.status = friend_status;
                return this.addfriendRepo.update(find_post.id, friend);

            } catch {
                return { error: "Internal Server Error!" };
            }
        }
        return this.addfriendRepo.save(friend);

    }

    async getFriendList(id) {

        const getFriend = await this.addfriendRepo.createQueryBuilder('add_friend').where("add_friend.status = :status", { status: 'Accepted' }).
            andWhere(
                new Brackets((qb) => {
                    qb.where("add_friend.sender_user_id = :sender_user_id", { sender_user_id: id }).
                        orWhere("add_friend.receiver_user_id = :receiver_user_id", { receiver_user_id: id })
                }),
            )
            .getMany();

        return getFriend;

    }

}
