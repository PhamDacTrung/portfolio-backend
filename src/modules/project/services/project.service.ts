import { UpdateOrDeleteResponseDto } from '@common/dtos';
import { PageDto, PageMetaDto, PageOptionsDto } from '@common/paginations';
import { handleErrorException, NotFoundException } from '@core/exceptions';
import { Portfolio, ProjectSkill } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Project } from 'database/entities/project.entity';
import { Repository } from 'typeorm';
import {
  ProjectCreateDto,
  ProjectFilterDto,
  ProjectResponseDto,
  ProjectUpdateDto,
} from '../dtos';
import { IProjectService } from '../interfaces';

@Injectable()
export class ProjectService implements IProjectService {
  constructor(
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

  async create(
    userId: string,
    data: ProjectCreateDto,
  ): Promise<ProjectResponseDto> {
    try {
      const portfolio = await this.getPortfolio(userId);

      const project = await this.projectRepository.save(
        this.projectRepository.create({
          ...data,
          portfolioId: portfolio.id,
        }),
      );

      return plainToInstance(ProjectResponseDto, project);
    } catch (error) {
      handleErrorException(error);
    }
  }

  async update(
    userId: string,
    id: string,
    data: ProjectUpdateDto,
  ): Promise<UpdateOrDeleteResponseDto> {
    try {
      const portfolio = await this.getPortfolio(userId);

      const project = await this.projectRepository.findOne({
        where: { id, portfolioId: portfolio.id },
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      const result = await this.projectRepository.update(id, {
        ...data,
        portfolioId: portfolio.id,
      });

      return plainToInstance(UpdateOrDeleteResponseDto, {
        isSuccess: result.affected > 0,
        message: 'Project updated successfully',
      });
    } catch (error) {
      handleErrorException(error);
    }
  }

  async delete(userId: string, id: string): Promise<UpdateOrDeleteResponseDto> {
    try {
      const portfolio = await this.getPortfolio(userId);

      const result = await this.projectRepository.delete({
        id,
        portfolioId: portfolio.id,
      });

      return plainToInstance(UpdateOrDeleteResponseDto, {
        isSuccess: result.affected > 0,
        message: 'Project deleted successfully',
      });
    } catch (error) {
      handleErrorException(error);
    }
  }

  async getById(userId: string, id: string): Promise<ProjectResponseDto> {
    try {
      const portfolio = await this.getPortfolio(userId);

      const project = await this.projectRepository
        .createQueryBuilder('project')
        .leftJoinAndMapMany(
          'project.skills',
          ProjectSkill,
          'projectSkill',
          'projectSkill.projectId = project.id',
        )
        .leftJoinAndSelect('projectSkill.skill', 'skill')
        .where('project.id = :id', { id })
        .andWhere('project.portfolioId = :portfolioId', {
          portfolioId: portfolio.id,
        })
        .getOne();
      if (!project) {
        throw new NotFoundException('Project not found');
      }

      const skills = project.projectSkills.map((item) => item.skill);

      return plainToInstance(ProjectResponseDto, {
        ...project,
        skills,
      });
    } catch (error) {
      handleErrorException(error);
    }
  }

  async getAll(
    userId: string,
    pageOptions: PageOptionsDto,
    filters?: ProjectFilterDto,
  ): Promise<PageDto<ProjectResponseDto>> {
    try {
      const portfolio = await this.getPortfolio(userId);

      const { page, take, sort, sortDirection } = pageOptions;

      const query = this.projectRepository
        .createQueryBuilder('project')
        .leftJoinAndMapMany(
          'project.skills',
          ProjectSkill,
          'projectSkill',
          'projectSkill.projectId = project.id',
        )
        .leftJoinAndSelect('projectSkill.skill', 'skill')
        .where('project.portfolioId = :portfolioId', {
          portfolioId: portfolio.id,
        })
        .take(take)
        .skip(pageOptions.skip);

      if (sort || sortDirection) {
        query.orderBy(sort || 'created_at', sortDirection || 'DESC');
      } else {
        query.orderBy('created_at', 'DESC');
      }

      if (filters) {
        const { keywords } = filters;

        if (keywords) {
          const formattedQuery = keywords.trim().replace(/ /g, ' & ');
          const searchQuery = keywords ? `${formattedQuery}:*` : formattedQuery;

          query.andWhere('project.search_vector @@ to_tsquery(:searchQuery)', {
            searchQuery,
          });
        }
      }

      const [projects, total] = await query.getManyAndCount();

      const result = projects.map((item) => {
        const skills = item.projectSkills.map((skill) => skill.skill);
        return { ...item, skills };
      });

      const data = plainToInstance(ProjectResponseDto, result);
      const meta = new PageMetaDto({ page, take, itemCount: total });

      return new PageDto(data, meta);
    } catch (error) {
      handleErrorException(error);
    }
  }
}
