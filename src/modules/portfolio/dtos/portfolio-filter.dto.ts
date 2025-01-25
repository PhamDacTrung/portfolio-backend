import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PortfolioFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The keywords to search for',
    example: 'JavaScript, React, Node.js',
  })
  keywords?: string;
}
