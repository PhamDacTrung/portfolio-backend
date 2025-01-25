import { UpdateOrDeleteResponseDto } from '@common/dtos';
import { INJECTION_SERVICE_TOKEN } from '@common/enums';
import { PageDto, PageMetaDto, PageOptionsDto } from '@common/paginations';
import { handleErrorException, NotFoundException } from '@core/exceptions';
import { Portfolio, Project, ProjectSkill } from '@entities';
import { SkillResponseDto } from '@modules/user-skill/dtos';
import { IUserSkillService } from '@modules/user-skill/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import {
  ProjectSkillCreateDto,
  ProjectSkillDeleteDto,
  ProjectSkillResponseDto,
} from '../dtos';
import { IProjectSkillService } from '../interfaces';

@Injectable()
export class ProjectSkillService implements IProjectSkillService {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.USER_SKILL_SERVICE)
    private readonly userSkillService: IUserSkillService,

    @InjectRepository(ProjectSkill)
    private readonly projectSkillRepository: Repository<ProjectSkill>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  private async getPortfolio(userId: string): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { userId },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    return portfolio;
  }

  private async getProject(
    projectId: string,
    portfolioId: string,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId, portfolioId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  @Transactional()
  async create(
    userId: string,
    projectId: string,
    data: ProjectSkillCreateDto,
  ): Promise<ProjectSkillResponseDto> {
    try {
      const portfolio = await this.getPortfolio(userId);

      const project = await this.getProject(projectId, portfolio.id);

      const { name } = data;
      // create skill
      const userSkill = await this.userSkillService.create(userId, { name });

      // create project skill
      const projectSkill = await this.projectSkillRepository.save(
        this.projectSkillRepository.create({
          projectId: project.id,
          skillId: userSkill.skill.id,
        }),
      );

      return plainToInstance(ProjectSkillResponseDto, {
        id: projectSkill.id,
        skill: plainToInstance(SkillResponseDto, userSkill.skill),
      });
    } catch (error) {
      handleErrorException(error);
    }
  }

  async delete(
    userId: string,
    projectId: string,
    data: ProjectSkillDeleteDto,
  ): Promise<UpdateOrDeleteResponseDto> {
    try {
      const portfolio = await this.getPortfolio(userId);

      const project = await this.getProject(projectId, portfolio.id);

      const { skillId } = data;

      // delete project skill
      const projectSkill = await this.projectSkillRepository.findOne({
        where: { projectId: project.id, skillId },
      });

      if (!projectSkill) {
        throw new NotFoundException('Project skill not found');
      }

      await this.projectSkillRepository.delete(projectSkill.id);

      return plainToInstance(UpdateOrDeleteResponseDto, {
        isSuccess: true,
        message: 'Project skill deleted successfully',
      });
    } catch (error) {
      handleErrorException(error);
    }
  }

  async getSkills(
    userId: string,
    projectId: string,
    pageOptions: PageOptionsDto,
  ): Promise<PageDto<SkillResponseDto>> {
    try {
      const portfolio = await this.getPortfolio(userId);

      const project = await this.getProject(projectId, portfolio.id);

      const { page, take, sort, sortDirection } = pageOptions;

      const query = this.projectSkillRepository
        .createQueryBuilder('projectSkill')
        .leftJoinAndSelect('projectSkill.skill', 'skill')
        .where('projectSkill.projectId = :projectId', { projectId: project.id })
        .take(take)
        .skip(pageOptions.skip);

      if (sort || sortDirection) {
        query.orderBy(
          sort || 'projectSkill.created_at',
          sortDirection || 'DESC',
        );
      } else {
        query.orderBy('projectSkill.created_at', 'DESC');
      }

      const [projectSkills, total] = await query.getManyAndCount();

      const data = plainToInstance(
        SkillResponseDto,
        projectSkills.map((item) => item.skill),
      );
      const meta = new PageMetaDto({ page, take, itemCount: total });

      return new PageDto(data, meta);
    } catch (error) {
      handleErrorException(error);
    }
  }
}
