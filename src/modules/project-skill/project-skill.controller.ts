import { ApiResponseWrapper, CurrentUser, Roles } from '@common/decorators';
import { UpdateOrDeleteResponseDto } from '@common/dtos';
import { INJECTION_SERVICE_TOKEN, UserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import { PageDto, PageOptionsDto } from '@common/paginations';
import { SkillResponseDto } from '@modules/user-skill/dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  ProjectSkillCreateDto,
  ProjectSkillDeleteDto,
  ProjectSkillResponseDto,
} from './dtos';
import { IProjectSkillService } from './interfaces';

@Controller('projects/:projectId/skills')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class ProjectSkillController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.PROJECT_SKILL_SERVICE)
    private readonly projectSkillService: IProjectSkillService,
  ) {}

  @Roles(UserRole.USER)
  @ApiResponseWrapper(ProjectSkillResponseDto, 'Create project skill')
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Param('projectId') projectId: string,
    @Body() data: ProjectSkillCreateDto,
  ): Promise<ProjectSkillResponseDto> {
    return this.projectSkillService.create(userId, projectId, data);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(UpdateOrDeleteResponseDto, 'Delete project skill')
  @Delete()
  async delete(
    @CurrentUser('id') userId: string,
    @Param('projectId') projectId: string,
    @Body() data: ProjectSkillDeleteDto,
  ): Promise<UpdateOrDeleteResponseDto> {
    return this.projectSkillService.delete(userId, projectId, data);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(PageDto<SkillResponseDto>, 'Get project skills')
  @Get()
  async getSkills(
    @CurrentUser('id') userId: string,
    @Param('projectId') projectId: string,
    @Query() pageOptions: PageOptionsDto,
  ): Promise<PageDto<SkillResponseDto>> {
    return this.projectSkillService.getSkills(userId, projectId, pageOptions);
  }
}
