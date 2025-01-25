import { AchievementType } from '@common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class AchievementFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The keywords to search for',
    example: 'JavaScript, React, Node.js',
  })
  keywords?: string;

  @IsOptional()
  @IsEnum(AchievementType)
  @ApiPropertyOptional({
    description: 'The type of the achievement',
    enum: AchievementType,
    example: AchievementType.CERTIFICATION,
  })
  type?: AchievementType;
}
