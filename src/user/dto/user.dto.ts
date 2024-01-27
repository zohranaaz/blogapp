import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    MinLength,
  } from 'class-validator';
  
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
  
  export class UserDto {
  
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    username: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsInt()
    mobile: number;
  
    @IsNotEmpty()
    password: string;
  }