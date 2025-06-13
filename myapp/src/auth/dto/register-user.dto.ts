// src/auth/dto/register-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({example: 'Sahil Madaan', description: 'Register with this user name'})
  @IsString() name: string;
  
  @ApiProperty({example: 'madaan.sahil27@gmail.com', description: 'Register with this user email'})
  @IsEmail() email: string;
  
  @ApiProperty({example: 'kachapapadpakkapapad', description: 'Register with this email password'})
  @IsString()
  @MinLength(6)
  password: string;
}
