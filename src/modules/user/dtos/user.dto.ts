import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 'John Doe' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: '+62' })
  phoneCode?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: '81234567890' })
  phoneNumber?: string;
}

@Exclude()
export class UserResponseDto {
  @Expose()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: '+62' })
  phoneCode: string;

  @Expose()
  @ApiProperty({ example: '81234567890' })
  phoneNumber: string;
}
