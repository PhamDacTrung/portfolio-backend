import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PortfolioCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The title of the portfolio',
    example: 'My Portfolio',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The description of the portfolio',
    example: 'This is my portfolio',
  })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The avatar of the portfolio',
    example: 'https://example.com/avatar.jpg',
  })
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'The public status of the portfolio',
    example: true,
  })
  isPublic?: boolean;
}

export class PortfolioUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The title of the portfolio',
    example: 'My Portfolio',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the portfolio',
    example: 'This is my portfolio',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The avatar of the portfolio',
    example: 'https://example.com/avatar.jpg',
  })
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'The public status of the portfolio',
    example: true,
  })
  isPublic?: boolean;
}

@Exclude()
export class PortfolioResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the portfolio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The created at date of the portfolio',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The updated at date of the portfolio',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The title of the portfolio',
    example: 'My Portfolio',
  })
  title: string;

  @Expose()
  @ApiProperty({
    description: 'The description of the portfolio',
    example: 'This is my portfolio',
  })
  description: string;

  @Expose()
  @ApiProperty({
    description: 'The avatar of the portfolio',
    example: 'https://example.com/avatar.jpg',
  })
  avatar: string;

  @Expose()
  @ApiProperty({
    description: 'The public status of the portfolio',
    example: true,
  })
  isPublic: boolean;
}
