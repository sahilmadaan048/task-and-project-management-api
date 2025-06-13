// src/auth/dto/login-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'madaan.sahil27@gmail.com', description: 'Register with this user email' })
  @IsEmail() email: string;
  @ApiProperty({ example: 'kachapapadpakkapapad', description: 'Register with this email password' })
  @IsString() password: string;
}
