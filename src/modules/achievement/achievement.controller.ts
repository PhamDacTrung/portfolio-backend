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
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  AchievementCreateDto,
  AchievementFilterDto,
  AchievementResponseDto,
  AchievementUpdateDto,
} from './dtos';
import { IAchievementService } from './interfaces';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('')
@ApiBearerAuth('access-token')
export class AchievementController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.ACHIEVEMENT_SERVICE)
    private readonly achievementService: IAchievementService,
  ) {}

  @Roles(UserRole.USER)
  @ApiResponseWrapper(AchievementResponseDto, 'Get a achievement')
  @Get('achievements/:id')
  getOneByUser(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ): Promise<AchievementResponseDto> {
    return this.achievementService.get(userId, id);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(PageDto<AchievementResponseDto>, 'Get all achievements')
  @Get('achievements')
  getAllByUser(
    @CurrentUser('id') userId: string,
    @Query() query: PageOptionsDto,
    @Query() filters: AchievementFilterDto,
  ): Promise<PageDto<AchievementResponseDto>> {
    return this.achievementService.getAll(userId, query, filters);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(AchievementResponseDto, 'Create a achievement')
  @Post('achievements')
  create(
    @CurrentUser('id') userId: string,
    @Body() data: AchievementCreateDto,
  ): Promise<AchievementResponseDto> {
    return this.achievementService.create(userId, data);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(UpdateOrDeleteResponseDto, 'Update a achievement')
  @Patch('achievements/:id')
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() data: AchievementUpdateDto,
  ): Promise<UpdateOrDeleteResponseDto> {
    return this.achievementService.update(userId, id, data);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(UpdateOrDeleteResponseDto, 'Delete a achievement')
  @Delete('achievements/:id')
  delete(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ): Promise<UpdateOrDeleteResponseDto> {
    return this.achievementService.delete(userId, id);
  }

  @Roles(UserRole.ADMIN)
  @ApiResponseWrapper(AchievementResponseDto, 'Get a achievement (admin only)')
  @Get(':userId/achievements/:id')
  getOneByAdmin(
    @Param('userId') userId: string,
    @Param('id') id: string,
  ): Promise<AchievementResponseDto> {
    return this.achievementService.get(userId, id);
  }

  @Roles(UserRole.ADMIN)
  @ApiResponseWrapper(
    PageDto<AchievementResponseDto>,
    'Get all achievements (admin only)',
  )
  @Get(':userId/achievements')
  getAllByAdmin(
    @Param('userId') userId: string,
    @Query() query: PageOptionsDto,
    @Query() filters: AchievementFilterDto,
  ): Promise<PageDto<AchievementResponseDto>> {
    return this.achievementService.getAll(userId, query, filters);
  }
}
