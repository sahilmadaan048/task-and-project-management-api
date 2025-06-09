// src/projects/dto/create-project.dto.ts
import { IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString() name: string;
  @IsString() description: string;
  @IsString() userId: number;  // ID of owner (or omit and use JWT)
}

