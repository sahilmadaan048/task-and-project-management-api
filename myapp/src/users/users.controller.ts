    // src/users/users.controller.ts
    import {
    Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, UseInterceptors
    } from '@nestjs/common';
    import { UsersService } from './users.service';
    import { UserEntity } from './user.entity';
    import { UpdateUserDto } from './dto/update-user.dto';
    import { AuthGuard } from '@nestjs/passport';
    import { Roles } from '../auth/roles.decorator';
    import { Role } from '../auth/role.enum';
    import { RolesGuard } from '../auth/roles.guard';
    import { ClassSerializerInterceptor } from '@nestjs/common';
    import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
    import { CreateUserDto } from './dto/create-user.dto';

    @ApiTags('users')
    @Controller('users')
    @UseInterceptors(ClassSerializerInterceptor)  // apply @Exclude in UserEntity
    export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiCreatedResponse({ type: UserEntity })
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(Role.Admin)
    @ApiOkResponse({ type: [UserEntity] })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserEntity })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(+id, dto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    // Nested routes:
    @Get(':id/tasks')
    getTasks(@Param('id') id: string) {
        return this.usersService.getTasksByUser(+id);
    }

    @Get(':id/projects')
    getProjects(@Param('id') id: string) {
        return this.usersService.getProjectsByUser(+id);
    }

    @Get(':id/comments')
    getComments(@Param('id') id: string) {
        return this.usersService.getCommentsByUser(+id);
    }
    }
