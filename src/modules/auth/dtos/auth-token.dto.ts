import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthTokenDto {
  @Expose()
  @ApiProperty({
    description: 'The access token',
    example: '1234567890',
  })
  accessToken: string;
}
