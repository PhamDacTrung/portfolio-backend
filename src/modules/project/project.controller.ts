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
  ProjectCreateDto,
  ProjectFilterDto,
  ProjectResponseDto,
  ProjectUpdateDto,
} from './dtos';
import { IProjectService } from './interfaces';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class ProjectController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.PROJECT_SERVICE)
    private readonly projectService: IProjectService,
  ) {}

  @Roles(UserRole.USER)
  @ApiResponseWrapper(ProjectResponseDto, 'Get all projects')
  @Get()
  async getAll(
    @CurrentUser('id') userId: string,
    @Query() pageOptions: PageOptionsDto,
    @Query() filters: ProjectFilterDto,
  ): Promise<PageDto<ProjectResponseDto>> {
    return this.projectService.getAll(userId, pageOptions, filters);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(ProjectResponseDto, 'Get project by id')
  @Get(':id')
  async getById(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ): Promise<ProjectResponseDto> {
    return this.projectService.getById(userId, id);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(ProjectResponseDto, 'Create project')
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() data: ProjectCreateDto,
  ): Promise<ProjectResponseDto> {
    return this.projectService.create(userId, data);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(UpdateOrDeleteResponseDto, 'Update project')
  @Patch(':id')
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() data: ProjectUpdateDto,
  ): Promise<UpdateOrDeleteResponseDto> {
    return this.projectService.update(userId, id, data);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(UpdateOrDeleteResponseDto, 'Delete project')
  @Delete(':id')
  async delete(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ): Promise<UpdateOrDeleteResponseDto> {
    return this.projectService.delete(userId, id);
  }
}
