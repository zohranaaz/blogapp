import { Body, Controller, Get, Post, ValidationPipe, Param } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { SignInDto } from './dto/signIn.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    //register user functionality
    @Post('/register')
    registerUser(@Body(ValidationPipe) userDto: UserDto): any {
        return this.userService.register(userDto);
    }

    //login registered user functionality
    @Post('/login')
    loginUser(@Body(ValidationPipe) signInDto: SignInDto): any {
        return this.userService.login(signInDto);
    }

    //search user by email or mobile number functionality
    @Get('/search-user/:param')
    getUser(@Param() params) {
        return this.userService.getUser(params);
    }
}

