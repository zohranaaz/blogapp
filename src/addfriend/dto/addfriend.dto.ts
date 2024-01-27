import {
    IsInt,
    IsNotEmpty,
    IsOptional,
  } from 'class-validator';
  
  export class AddFriendDto {

    @IsNotEmpty() 
    @IsInt()
    sender_user_id: number;
  
    @IsNotEmpty()
    @IsInt()
    receiver_user_id: number;

    @IsOptional()
    status: string;

  }