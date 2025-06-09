// src/tasks/dto/create-task.dto.ts
import { IsString, IsEnum, IsInt } from 'class-validator';
// import {Status} from 'generated/prisma';

export class CreateTaskDto {
  @IsString() title: string;
  @IsString() description: string;
//   @IsEnum(Status) status: Status;
  @IsInt() userId: number;
  @IsInt() projectId: number;
}

