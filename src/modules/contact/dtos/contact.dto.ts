import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ContactCreateOrUpdateDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the contact',
    example: 'john.doe@example.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The github of the contact',
    example: 'https://github.com/john.doe',
  })
  github?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The linkedin of the contact',
    example: 'https://linkedin.com/in/john.doe',
  })
  linkedin?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The twitter of the contact',
    example: 'https://twitter.com/john.doe',
  })
  twitter?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The facebook of the contact',
    example: 'https://facebook.com/john.doe',
  })
  facebook?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The youtube of the contact',
    example: 'https://youtube.com/john.doe',
  })
  youtube?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The telegram of the contact',
    example: 'https://t.me/john.doe',
  })
  telegram?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The discord of the contact',
    example: 'https://discord.com/john.doe',
  })
  discord?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The twitch of the contact',
    example: 'https://twitch.com/john.doe',
  })
  twitch?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The snapchat of the contact',
    example: 'https://snapchat.com/john.doe',
  })
  snapchat?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The whatsapp of the contact',
    example: 'https://wa.me/john.doe',
  })
  whatsapp?: string;
}

@Exclude()
export class ContactResponseDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the contact',
    example: '123abc-123abc-123abc-123abc',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The updated at of the contact',
    example: '2021-01-01',
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The email of the contact',
    example: 'john.doe@example.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    description: 'The github of the contact',
    example: 'https://github.com/john.doe',
  })
  github: string;

  @Expose()
  @ApiProperty({
    description: 'The linkedin of the contact',
    example: 'https://linkedin.com/in/john.doe',
  })
  linkedin: string;

  @Expose()
  @ApiProperty({
    description: 'The twitter of the contact',
    example: 'https://twitter.com/john.doe',
  })
  twitter: string;

  @Expose()
  @ApiProperty({
    description: 'The facebook of the contact',
    example: 'https://facebook.com/john.doe',
  })
  facebook: string;

  @Expose()
  @ApiProperty({
    description: 'The youtube of the contact',
    example: 'https://youtube.com/john.doe',
  })
  youtube: string;

  @Expose()
  @ApiProperty({
    description: 'The telegram of the contact',
    example: 'https://t.me/john.doe',
  })
  telegram: string;

  @Expose()
  @ApiProperty({
    description: 'The discord of the contact',
    example: 'https://discord.com/john.doe',
  })
  discord: string;

  @Expose()
  @ApiProperty({
    description: 'The twitch of the contact',
    example: 'https://twitch.com/john.doe',
  })
  twitch: string;

  @Expose()
  @ApiProperty({
    description: 'The snapchat of the contact',
    example: 'https://snapchat.com/john.doe',
  })
  snapchat: string;

  @Expose()
  @ApiProperty({
    description: 'The whatsapp of the contact',
    example: 'https://wa.me/john.doe',
  })
  whatsapp: string;
}
