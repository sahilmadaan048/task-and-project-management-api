// src/users/dto/create-user.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/auth/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Karan singh', description: 'Create a user with this name' })
  @IsString() name: string;

  @ApiProperty({ example: 'karansingh059@gmail.com', description: 'Email for this user' })
  @IsEmail() email: string;

  @ApiProperty({ example: 'karansingh059', description: 'Email Password for this user' })
  @IsString() @MinLength(6) password: string;


  @ApiPropertyOptional({ enum: Role, description: 'User role (default is user)', default: Role.User })
  @IsOptional()
  @IsEnum(Role)
  role?: Role; 
}