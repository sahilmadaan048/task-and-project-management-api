// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({example: 'Karan singh', description: 'Create a user with this name'})
  @IsString() name: string;
  
  @ApiProperty({example: 'karansingh059@gmail.com', description: 'Email for this user'})
  @IsEmail() email: string; 
  
  @ApiProperty({example: 'karansingh059', description: 'Email Password for this user'})
  @IsString() @MinLength(6) password: string;
}