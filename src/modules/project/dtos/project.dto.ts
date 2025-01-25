import { SkillResponseDto } from '@modules/user-skill/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProjectCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the project',
    example: 'Project Name',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The organization of the project',
    example: 'Project Organization',
  })
  organization?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The start date of the project',
    example: '2024-01-01',
  })
  startedAt?: Date | null;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The end date of the project',
    example: '2024-01-01',
  })
  endedAt?: Date | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the project',
    example: 'Project Description',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The thumbnail of the project',
    example: 'Project Thumbnail',
  })
  thumbnail?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The url of the project',
    example: 'Project Url',
  })
  url?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The source code url of the project',
    example: 'Project Source Code Url',
  })
  sourceCodeUrl?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'The public status of the project',
    example: 'true',
  })
  isPublic?: boolean;
}

export class ProjectUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The name of the project',
    example: 'Project Name',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The organization of the project',
    example: 'Project Organization',
  })
  organization?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The start date of the project',
    example: '2024-01-01',
  })
  startedAt?: Date | null;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The end date of the project',
    example: '2024-01-01',
  })
  endedAt?: Date | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the project',
    example: 'Project Description',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The thumbnail of the project',
    example: 'Project Thumbnail',
  })
  thumbnail?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The url of the project',
    example: 'Project Url',
  })
  url?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The source code url of the project',
    example: 'Project Source Code Url',
  })
  sourceCodeUrl?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'The public status of the project',
    example: 'true',
  })
  isPublic?: boolean;
}

@Exclude()
export class ProjectResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the project',
    example: 'Project Id',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The name of the project',
    example: 'Project Name',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'The organization of the project',
    example: 'Project Organization',
  })
  organization: string;

  @Expose()
  @ApiProperty({
    description: 'The start date of the project',
    example: '2024-01-01',
  })
  startedAt: Date | null;

  @Expose()
  @ApiProperty({
    description: 'The end date of the project',
    example: '2024-01-01',
  })
  endedAt: Date | null;

  @Expose()
  @ApiProperty({
    description: 'The description of the project',
    example: 'Project Description',
  })
  description: string;

  @Expose()
  @ApiProperty({
    description: 'The thumbnail of the project',
    example: 'Project Thumbnail',
  })
  thumbnail: string;

  @Expose()
  @ApiProperty({
    description: 'The url of the project',
    example: 'Project Url',
  })
  url: string;

  @Expose()
  @ApiProperty({
    description: 'The source code url of the project',
    example: 'Project Source Code Url',
  })
  sourceCodeUrl: string;

  @Expose()
  @ApiProperty({
    description: 'The skills of the project',
    example: [
      {
        id: 'Skill Id',
        name: 'Skill Name',
      },
    ],
  })
  skills: SkillResponseDto[];

  @Expose()
  @ApiProperty({
    description: 'The public status of the project',
    example: 'true',
  })
  isPublic: boolean;
}
