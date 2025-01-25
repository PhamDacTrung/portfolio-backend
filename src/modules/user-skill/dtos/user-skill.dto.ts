import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SkillCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the skill',
    example: 'JavaScript',
  })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the skill',
    example: 'I am a JavaScript developer',
  })
  description?: string;
}

@Exclude()
export class SkillResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the skill',
    example: '4ec69f2a-d0bd-4652-ab79-c2e880a3ad78',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The name of the skill',
    example: 'JavaScript',
  })
  name: string;
}

export class UserSkillResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the skill',
    example: '4ec69f2a-d0bd-4652-ab79-c2e880a3ad78',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The skill',
    type: SkillResponseDto,
    example: {
      id: '4ec69f2a-d0bd-4652-ab79-c2e880a3ad78',
      name: 'JavaScript',
    },
  })
  skill: SkillResponseDto;
}
