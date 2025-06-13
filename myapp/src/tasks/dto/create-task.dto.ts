// src/tasks/dto/create-task.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsInt } from 'class-validator';
// import {Status} from 'generated/prisma';

export class CreateTaskDto {
  @ApiProperty({example: 'Learn Authentication in Nestjs', description: 'Give a descriptive title for the task'})
  @IsString() title: string;
  // @IsString() description: string;
  // @IsEnum(Status) status: Status;
  @ApiProperty({example: '4 (in number without quotes)', description: 'UserId of the user doing this task'})
  @IsInt() userId: number;
  // @IsInt() projectId: number;
}

