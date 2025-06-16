import { IsNumberString, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class TaskQueryDto {
  @ApiPropertyOptional({ description: 'Page number', example: '1' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Items per page', example: '10' })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({ description: 'Search term for name/email/etc.', example: 'john' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Sort by field and direction (e.g., createdAt:desc)', example: 'createdAt:desc' })
  @IsOptional()
  @IsString()
  sortBy?: string;
}
