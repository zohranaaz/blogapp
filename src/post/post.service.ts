import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/post.entity'
import { AddFriendService } from '../addfriend/addfriend.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

    constructor(@InjectRepository(Post) private readonly postRepo: Repository<Post>,
        private readonly addFriendService: AddFriendService) { }

    async createPost(postDto: PostDto) {
        const post = new Post();

        post.title = postDto.title;
        post.content = postDto.content;
        post.is_deleted = false;
        post.user_id = postDto.user_id;
        post.created_date = new Date().toString();
        const post_id = postDto.post_id;

        if (post_id) {

            try {
                const find_post = await this.postRepo.findOneBy({
                    id: post_id,
                });

                if (!find_post) {

                    return { error: "Post not Found!" };
                }
                return this.postRepo.update(postDto.post_id, post);

            } catch {
                return { error: "Internal Server Error!" };
            }
        }

        return this.postRepo.save(post);
    }

    //get own and only friend post 
    async getPost(param) {

        console.log('params: ', param.user_id);
        const userId = param.user_id;
        const list = await this.addFriendService.getFriendList(userId);

        const users = list.map(obj => obj.sender_user_id || obj.receiver_user_id);
        const uniqueUser = Array.from(new Set(users));

        const postList = await this.postRepo.createQueryBuilder('post')
            .where("user_id IN (:...ids )", { ids: uniqueUser })
            .getMany();

        return postList;

    }

    async deletePost(params) {
        const post_id = params.id;
        if (post_id) {
            try {
                const find_post = await this.postRepo.findOneBy({
                    id: post_id,
                });
                if (!find_post) {
                    return { error: "Post not Found!" };
                }
                return this.postRepo.delete(find_post);
            } catch {
                return { error: "Internal Server Error!" };
            }
        }
    }

}
