import { INJECTION_SERVICE_TOKEN } from '@common/enums';
import { AuthConfig } from '@config';
import { User } from '@entities';
import { ContactModule } from '@modules/contact/contact.module';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthPasswordService } from './services';
import { JwtStrategy } from './strategies';

const Adapters = [
  {
    provide: INJECTION_SERVICE_TOKEN.AUTH_SERVICE,
    useClass: AuthPasswordService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      global: true,
      inject: [AuthConfig.KEY],
      useFactory: (authConfig: ConfigType<typeof AuthConfig>) => {
        const { jwtSecret, accessTokenExpiration } = authConfig;
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: parseInt(accessTokenExpiration, 10),
          },
        };
      },
    }),
    ContactModule,
  ],
  controllers: [AuthController],
  providers: [...Adapters, JwtStrategy],
})
export class AuthModule {}
