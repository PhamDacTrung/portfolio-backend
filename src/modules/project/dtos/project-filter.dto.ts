import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProjectFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The keywords of the project',
    example: 'Project Keywords',
  })
  keywords?: string;
}
