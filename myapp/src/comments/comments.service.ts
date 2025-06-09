// src/comments/comments.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Prisma } from 'generated/prisma';


@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCommentDto) {
    return this.prisma.comment.create({ data: dto });
  }

  async update(id: number, dto: UpdateCommentDto, userId: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id }});
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId) {
      throw new ForbiddenException('Not comment owner');
    }
    return this.prisma.comment.update({ where: { id }, data: dto });
  }

  async remove(id: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id }});
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId) {
      throw new ForbiddenException('Not comment owner');
    }
    return this.prisma.comment.delete({ where: { id }});
  }
}
