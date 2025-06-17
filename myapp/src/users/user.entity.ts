import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/role.enum'; // <-- adjust path as needed

export class UserEntity {
  id: number;

  @ApiProperty({ example: 'Karan singh', description: 'Create a user with this name' })
  name: string;

  @ApiProperty({ example: 'karansingh059@gmail.com', description: 'Email for this user' })
  email: string;

  @Exclude()
  @ApiProperty({ example: 'karansingh059', description: 'Email Password for this user' })
  password: string;

  @ApiProperty({ example: Role.Admin, enum: Role, description: 'Role of the user (admin/user)' })
  role: Role;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
