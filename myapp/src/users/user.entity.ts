// src/users/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;

  @ApiProperty({ example: 'Karan singh', description: 'Create a user with this name' })
  name: string;

  @ApiProperty({ example: 'karansingh059@gmail.com', description: 'Email for this user' })
  email: string;

  @Exclude()
  @ApiProperty({ example: 'karansingh059', description: 'Email Password for this user' })
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
