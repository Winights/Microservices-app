import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JwtDto {
  @ApiProperty({
    description: 'Access token',
    required: true,
    type: String,
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    required: true,
    type: String,
  })
  @Expose()
  refreshToken: string;
}

export class RefreshJwtDto {
  @ApiProperty({
    description: 'Refresh token',
    required: true,
    type: String,
  })
  @Expose()
  refreshToken: string;
}