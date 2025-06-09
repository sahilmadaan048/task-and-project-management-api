import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    // Hash password before creating (similar to AuthService)
    // ... (omitted for brevity, see AuthService)
    return this.prisma.user.create({ data });
  }

//   async findAll() {

//     return this.prisma.user.findMany();
//   }

async findAll() {
  const users = await this.prisma.user.findMany();
  console.log('Users:', users);
  return users;
}

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id }});
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id }});
  }

  async getTasksByUser(id: number) {
    return this.prisma.task.findMany({ where: { userId: id }});
  }
  
  async getProjectsByUser(id: number) {
    return this.prisma.project.findMany({ where: { userId: id }});
  }

  async getCommentsByUser(id: number) {
    return this.prisma.comment.findMany({ where: { userId: id }});
  }
}
