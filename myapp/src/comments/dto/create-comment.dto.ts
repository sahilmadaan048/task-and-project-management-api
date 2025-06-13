// src/comments/dto/create-comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({example: 'I loved your post', description: 'Post this comment on the post wih taskId and UserId credentials'})
  @IsString() message: string;
  
  @ApiProperty({example: '1 (in number without quotes)', description: 'TaskId of the task this comment is for'})
  @IsInt() taskId: number;
  
  @ApiProperty({example: '4 (in number without quotes)', description: 'UserId of the user this comment is for'})
  @IsInt() userId: number;
}

