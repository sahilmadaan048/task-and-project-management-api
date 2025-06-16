// src/tasks/tasks.controller.ts
import {
  Controller, Get, Post, Patch, Delete, Body, Param, UseGuards,
  Query
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQueryDto } from './dto/task-query.dto';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: 'Task created' })
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: [CreateTaskDto] })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('search')
  @ApiBearerAuth()
  @ApiOkResponse({ type: [CreateTaskDto] })
  findAllQuery(@Query() query: TaskQueryDto) {
    return this.tasksService.findAllQuery(query);
  }



  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateTaskDto })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  @Get(':id/comments')
  @ApiBearerAuth()
  getComments(@Param('id') id: string) {
    return this.tasksService.getCommentsByTask(+id);
  }
}
