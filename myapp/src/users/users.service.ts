import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { Prisma } from 'generated/prisma';
import { getPagination, getSorting } from '../utils/pagination';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    // Hash password before creating (similar to AuthService)
    // ... (omitted for brevity, see AuthService)
    return this.prisma.user.create({ data });
  }

  // async findAll() {
  //   return this.prisma.user.findMany();
  // }

  async findAll() {
    const users = await this.prisma.user.findMany();
    console.log('Users:', users);
    return users;
  }

  async findAllQuery(query: UserQueryDto) {
    const page = parseInt(query.page ?? '1', 10);
    const limit = parseInt(query.limit ?? '2', 10);
    // const page = query.page ?? 1;
    // const limit = query.limit ?? 2;

    const skip = (page - 1) * limit;

    // Search filter for name or email (case-insensitive)
    const where = query.search
      ? {
        OR: [
          {
            name: {
              contains: query.search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            email: {
              contains: query.search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }
      : {};

    // Safe sorting with allowed fields only
    const allowedSortFields = ['id', 'email', 'name'] as const;
    type SortField = typeof allowedSortFields[number];

    const [rawField, rawOrder] = (query.sortBy ?? 'id:desc').split(':');
    const field: SortField = allowedSortFields.includes(rawField as SortField)
      ? (rawField as SortField)
      : 'id';
    const order = rawOrder === 'asc' ? 'asc' : 'desc';

    // Fetch users with filters, pagination, and sorting
    const users = await this.prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [field]: order,
      },
    });

    // Get total count for pagination
    const total = await this.prisma.user.count({ where });

    // Return paginated response
    return {
      data: users,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getTasksByUser(id: number) {
    return this.prisma.task.findMany({ where: { userId: id } });
  }

  async getProjectsByUser(id: number) {
    return this.prisma.project.findMany({ where: { userId: id } });
  }

  async getCommentsByUser(id: number) {
    return this.prisma.comment.findMany({ where: { userId: id } });
  }
}
