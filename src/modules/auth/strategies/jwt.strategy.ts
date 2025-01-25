import { INJECTION_SERVICE_TOKEN } from '@common/enums';
import { AuthPayload } from '@common/interfaces';
import { AuthConfig } from '@config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPayloadDto } from '../dtos';
import { IAuthService } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(AuthConfig.KEY)
    private readonly authConfig: ConfigType<typeof AuthConfig>,

    @Inject(INJECTION_SERVICE_TOKEN.AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: authConfig.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: AuthPayload): Promise<AuthPayloadDto> {
    if (!payload) {
      throw new UnauthorizedException('Unauthorized');
    }

    const { id: userId } = payload;
    const user = await this.authService.validateUserById(userId);

    return plainToInstance(AuthPayloadDto, user);
  }
}
