// src/projects/projects.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsQueryDto } from './dto/project-query.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateProjectDto) {
    return this.prisma.project.create({ data: dto });
  }

  findAll() {
    return this.prisma.project.findMany();
  }

  async findAllQuery(query: ProjectsQueryDto) {
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
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  update(id: number, dto: UpdateProjectDto) {
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.project.delete({ where: { id } });
  }
}
