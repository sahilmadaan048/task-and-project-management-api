// src/projects/dto/create-project.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {IsInt, isInt, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({example: 'Vs Code Extension', description: 'Give a name which descrbes your project'})
  @IsString() name: string;
  // @IsString() description: string;
  
  @ApiProperty({example: '4 (in number without quotes)', description: 'UserId of the user doing this project'})
  @Type(() => Number)
  @IsInt()
  userId: number;  // ID of owner (or omit and use JWT)
}

