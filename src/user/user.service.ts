import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { SignInDto } from './dto/signIn.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity'
import { Repository } from 'typeorm';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,) { }

    async register(userDto: UserDto) {

        const user = new User();
        const hashPassword = await CryptoJS.AES.encrypt(userDto.password, 'Hello@123').toString();
        user.email = userDto.email;
        user.username = userDto.username;

        user.password = hashPassword;
        user.mobile = userDto.mobile;
        user.date = new Date().toString();

        return this.userRepo.save(user);

    }

    async login(signInDto: SignInDto) {
        try {
            const userEmail = signInDto.email;
            const user = await this.userRepo.findOneBy({
                email: userEmail,
            });

            if (!user) {

                return { error: "User not Found!" };
            }

            const bytes = CryptoJS.AES.decrypt(user.password, 'Hello@123');
            const decrptPassword = bytes.toString(CryptoJS.enc.Utf8);

            if (signInDto.password != decrptPassword) {
                return { error: "Ivalid Credentials" };
            }

            return { ...user, message: "login successfully" };

        } catch {
            return { error: "Internal Server Error!" };
        }
    }

    async getUser(params) {

        const data = params.param;
        const getUser = await this.userRepo.createQueryBuilder('user').select(['user.username', 'user.email', 'user.mobile']).where({
            email: data
        }).orWhere({
            mobile: data
        }).getMany();

        return getUser;

    }

}
