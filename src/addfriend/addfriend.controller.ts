import { Body, Controller, Put, Post, ValidationPipe } from '@nestjs/common';
import { AddFriendDto } from './dto/addfriend.dto';
import { AddFriendService } from './addfriend.service';

@Controller('addfriend')
export class AddFriendController {
    constructor(private addfriendService: AddFriendService) {
    }

    //send friend request functionality
    @Post('/send_request')
    addFriend(@Body(ValidationPipe) addfriendDto: AddFriendDto): any {
        return this.addfriendService.addFriend(addfriendDto);
    }

    //accept or reject friend request functionality
    @Put('/update_friend_request')
    updateFriendRequest(@Body(ValidationPipe) addFriendDto: AddFriendDto) {
        return this.addfriendService.addFriend(addFriendDto);
    }

}
