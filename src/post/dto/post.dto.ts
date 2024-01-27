import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    MinLength,
  } from 'class-validator';
  
  export class PostDto {
    
    @IsOptional()
    post_id: number;

    @IsNotEmpty()
    @MinLength(5, { message: 'Title should not less than 5 characters.' })
    title: string;
  
    @IsNotEmpty()
    @MinLength(40, { message: 'Content should not less than 40 characters.' })
    content: string;
  
    @IsNotEmpty()
    @IsInt()
    user_id: number;
  }