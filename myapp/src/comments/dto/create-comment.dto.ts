// src/comments/dto/create-comment.dto.ts
import { IsString, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsString() message: string;
  @IsInt() taskId: number;
  @IsInt() userId: number;
}

