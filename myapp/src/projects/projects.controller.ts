// src/projects/projects.controller.ts
import {
  Controller, Get, Post, Patch, Delete, Body, Param, UseGuards,
  Query
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsQueryDto } from './dto/project-query.dto';

@ApiTags('projects')
@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: 'Project created' })
  create(@Body() dto: CreateProjectDto) {
    // let userId = dto.userId;
    // userId = Number(userId);
    // dto.userId = userId; 
    return this.projectsService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: [CreateProjectDto] })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: [CreateProjectDto] })
  findAllQuery(@Query() query: ProjectsQueryDto) {
    return this.projectsService.findAllQuery(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateProjectDto })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
