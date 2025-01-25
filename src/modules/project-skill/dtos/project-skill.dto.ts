import { SkillResponseDto } from '@modules/user-skill/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectSkillCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the skill',
    example: 'JavaScript',
  })
  name: string;
}

@Exclude()
export class ProjectSkillResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the project skill',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The skill of the project',
    type: SkillResponseDto,
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'JavaScript',
    },
  })
  skill: SkillResponseDto;
}

export class ProjectSkillDeleteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The id of the skill in the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  skillId: string;
}
