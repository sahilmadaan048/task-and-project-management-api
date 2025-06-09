// src/auth/dto/register-user.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString() name: string;

  @IsEmail() email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
