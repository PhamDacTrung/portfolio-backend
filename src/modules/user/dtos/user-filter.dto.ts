import { UserRole } from '@common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UserFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Keywords to search for',
    example: 'John Doe',
  })
  keywords?: string;

  @IsOptional()
  @IsEnum(UserRole)
  @ApiPropertyOptional({
    description: 'Role to filter by',
    example: UserRole.USER,
  })
  role?: UserRole;
}
