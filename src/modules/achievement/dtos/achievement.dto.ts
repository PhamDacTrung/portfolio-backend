import { AchievementType } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AchievementCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The title of the achievement',
    example: 'Best Developer of the Year',
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The provider of the achievement',
    example: 'Google',
  })
  provider?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The start date of the achievement',
    example: '2021-01-01',
  })
  startedAt?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The end date of the achievement',
    example: '2021-01-01',
  })
  endedAt?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the achievement',
    example: 'This is a description of the achievement',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The thumbnail of the achievement',
    example: 'https://example.com/thumbnail.jpg',
  })
  thumbnail?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The url of the achievement',
    example: 'https://example.com/achievement',
  })
  url?: string;

  @IsOptional()
  @IsEnum(AchievementType)
  @ApiProperty({
    description: 'The type of the achievement',
    example: 'OTHER',
  })
  type?: AchievementType;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Whether the achievement is public',
    example: true,
  })
  isPublic?: boolean;
}

export class AchievementUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The title of the achievement',
    example: 'Best Developer of the Year',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The provider of the achievement',
    example: 'Google',
  })
  provider?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The start date of the achievement',
    example: '2021-01-01',
  })
  startedAt?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The end date of the achievement',
    example: '2021-01-01',
  })
  endedAt?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the achievement',
    example: 'This is a description of the achievement',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The thumbnail of the achievement',
    example: 'https://example.com/thumbnail.jpg',
  })
  thumbnail?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The url of the achievement',
    example: 'https://example.com/achievement',
  })
  url?: string;

  @IsOptional()
  @IsEnum(AchievementType)
  @ApiProperty({
    description: 'The type of the achievement',
    example: 'OTHER',
  })
  type?: AchievementType;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Whether the achievement is public',
    example: true,
  })
  isPublic?: boolean;
}

export class AchievementResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the achievement',
    example: '123',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The created date of the achievement',
    example: '2021-01-01',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The updated date of the achievement',
    example: '2021-01-01',
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The title of the achievement',
    example: 'Best Developer of the Year',
  })
  title: string;

  @Expose()
  @ApiProperty({
    description: 'The provider of the achievement',
    example: 'Google',
  })
  provider: string;

  @Expose()
  @ApiProperty({
    description: 'The start date of the achievement',
    example: '2021-01-01',
  })
  startedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The end date of the achievement',
    example: '2021-01-01',
  })
  endedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The description of the achievement',
    example: 'This is a description of the achievement',
  })
  description: string;

  @Expose()
  @ApiProperty({
    description: 'The thumbnail of the achievement',
    example: 'https://example.com/thumbnail.jpg',
  })
  thumbnail: string;

  @Expose()
  @ApiProperty({
    description: 'The url of the achievement',
    example: 'https://example.com/achievement',
  })
  url: string;

  @Expose()
  @ApiProperty({
    description: 'The type of the achievement',
    example: 'OTHER',
  })
  type: AchievementType;

  @Expose()
  @ApiProperty({
    description: 'Whether the achievement is public',
    example: true,
  })
  isPublic: boolean;
}
