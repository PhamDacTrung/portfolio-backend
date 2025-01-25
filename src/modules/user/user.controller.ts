import { ApiResponseWrapper, CurrentUser, Roles } from '@common/decorators';
import { UpdateOrDeleteResponseDto } from '@common/dtos';
import { INJECTION_SERVICE_TOKEN, UserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import { PageDto, PageOptionsDto } from '@common/paginations';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserFilterDto, UserResponseDto, UserUpdateDto } from './dtos';
import { IUserService } from './interfaces';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
@ApiBearerAuth('access-token')
export class UserController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Roles(UserRole.USER)
  @ApiResponseWrapper(UserResponseDto, 'Get user')
  @Get('@me')
  getByUser(@CurrentUser('id') id: string): Promise<UserResponseDto> {
    return this.userService.get(id);
  }

  @Roles(UserRole.ADMIN)
  @ApiResponseWrapper(UserResponseDto, 'Get user (admin only)')
  @Get(':id')
  getByAdmin(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.get(id);
  }

  @Roles(UserRole.ADMIN)
  @ApiResponseWrapper(PageDto<UserResponseDto>, 'Get all users (admin only)')
  @Get()
  getAll(
    @Query() pageOptions: PageOptionsDto,
    @Query() filter?: UserFilterDto,
  ): Promise<PageDto<UserResponseDto>> {
    return this.userService.getAll(pageOptions, filter);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(UpdateOrDeleteResponseDto, 'Update user')
  @Patch('@me')
  update(
    @CurrentUser('id') id: string,
    @Body() data: UserUpdateDto,
  ): Promise<UpdateOrDeleteResponseDto> {
    return this.userService.update(id, data);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(UpdateOrDeleteResponseDto, 'Delete user')
  @Delete('@me')
  deleteByUser(
    @CurrentUser('id') id: string,
  ): Promise<UpdateOrDeleteResponseDto> {
    return this.userService.softDelete(id);
  }

  @Roles(UserRole.ADMIN)
  @ApiResponseWrapper(UpdateOrDeleteResponseDto, 'Delete user (admin only)')
  @Delete(':id')
  deleteByAdmin(@Param('id') id: string): Promise<UpdateOrDeleteResponseDto> {
    return this.userService.softDelete(id);
  }
}
