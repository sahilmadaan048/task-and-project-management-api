// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQueryDto } from './dto/task-query.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTaskDto) {
    return this.prisma.task.create({ data: dto });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  async findAllQuery(query: TaskQueryDto) {
    const page = parseInt(query.page ?? '1', 10);
    const limit = parseInt(query.limit ?? '2', 10);

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
    const task = await this.prisma.task.findUnique({ where: { id }});
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  update(id: number, dto: UpdateTaskDto) {
    return this.prisma.task.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.task.delete({ where: { id }});
  }

  async getCommentsByTask(id: number) {
    return this.prisma.comment.findMany({ where: { taskId: id }});
  }
}
