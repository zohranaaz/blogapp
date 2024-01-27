import { Body, Controller, Put, Post, ValidationPipe, Param, Delete, Get } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {
    }

    // create new post functionality
    @Post('/create_post')
    createPost(@Body(ValidationPipe) postDto: PostDto): any {
        return this.postService.createPost(postDto);
    }

    // update post functionality
    @Put('/update_post/')
    updatePost(@Body() postDto: PostDto): any {
        return this.postService.createPost(postDto);
    }

    // hard delete post functionality
    @Delete('/delete_post/:id')
    deletePost(@Param() param) {
        return this.postService.deletePost(param);
    }

    //check own and friends post functionality
    @Get('/get_post/:user_id')
    getPost(@Param() param) {
        return this.postService.getPost(param);
    }
}
