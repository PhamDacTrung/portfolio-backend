import { ApiResponseWrapper } from '@common/decorators';
import { INJECTION_SERVICE_TOKEN } from '@common/enums';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  AuthTokenDto,
  LoginInputDto,
  RegisterInputDto,
  RegisterResponseDto,
} from './dtos';
import { IAuthService } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}

  @ApiResponseWrapper(RegisterResponseDto, 'Register a new user')
  @Post('register')
  register(@Body() input: RegisterInputDto): Promise<RegisterResponseDto> {
    return this.authService.register(input);
  }

  @ApiResponseWrapper(AuthTokenDto, 'Login a user')
  @Post('login')
  login(@Body() input: LoginInputDto): Promise<AuthTokenDto> {
    return this.authService.login(input);
  }
}
