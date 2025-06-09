// src/comments/comments.controller.ts
import {
  Controller, Post, Patch, Delete, Body, Param, UseGuards, Request
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: 'Comment created' })
  create(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.commentsService.update(+id, dto, userId);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return this.commentsService.remove(+id, userId);
  }
}
