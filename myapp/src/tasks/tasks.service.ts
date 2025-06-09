// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTaskDto) {
    return this.prisma.task.create({ data: dto });
  }

  findAll() {
    return this.prisma.task.findMany();
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
