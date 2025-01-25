import { UpdateOrDeleteResponseDto } from '@common/dtos';
import { PageDto, PageMetaDto, PageOptionsDto } from '@common/paginations';
import { handleErrorException, NotFoundException } from '@core/exceptions';
import { Achievement, Portfolio } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import {
  AchievementCreateDto,
  AchievementFilterDto,
  AchievementResponseDto,
  AchievementUpdateDto,
} from '../dtos';
import { IAchievementService } from '../interfaces';

@Injectable()
export class AchievementService implements IAchievementService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,

    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  private async checkPortfolio(userId: string): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { userId },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    return portfolio;
  }

  async get(userId: string, id: string): Promise<AchievementResponseDto> {
    try {
      const portfolio = await this.checkPortfolio(userId);

      const achievement = await this.achievementRepository.findOne({
        where: { id, portfolioId: portfolio.id },
      });

      if (!achievement) {
        throw new NotFoundException('Achievement not found');
      }

      return plainToInstance(AchievementResponseDto, achievement);
    } catch (error) {
      handleErrorException(error);
    }
  }

  async getAll(
    userId: string,
    pageOptions: PageOptionsDto,
    filters?: AchievementFilterDto,
  ): Promise<PageDto<AchievementResponseDto>> {
    try {
      const portfolio = await this.checkPortfolio(userId);

      const { page, take, sort, sortDirection } = pageOptions;

      const query = this.achievementRepository
        .createQueryBuilder('achievement')
        .where('achievement.portfolioId = :portfolioId', {
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
        const { keywords, type } = filters;

        if (keywords) {
          const formattedQuery = keywords.trim().replace(/ /g, ' & ');
          const searchQuery = keywords ? `${formattedQuery}:*` : formattedQuery;

          query.andWhere(
            'achievement.search_vector @@ to_tsquery(:searchQuery)',
            {
              searchQuery,
            },
          );
        }

        if (type) {
          query.andWhere('achievement.type = :type', { type });
        }
      }

      const [achievements, total] = await query.getManyAndCount();

      const data = plainToInstance(AchievementResponseDto, achievements);
      const meta = new PageMetaDto({ page, take, itemCount: total });

      return new PageDto(data, meta);
    } catch (error) {
      handleErrorException(error);
    }
  }

  async create(
    userId: string,
    data: AchievementCreateDto,
  ): Promise<AchievementResponseDto> {
    try {
      const portfolio = await this.checkPortfolio(userId);

      const achievement = await this.achievementRepository.save(
        this.achievementRepository.create({
          ...data,
          portfolioId: portfolio.id,
        }),
      );

      return plainToInstance(AchievementResponseDto, achievement);
    } catch (error) {
      handleErrorException(error);
    }
  }

  async update(
    userId: string,
    id: string,
    data: AchievementUpdateDto,
  ): Promise<UpdateOrDeleteResponseDto> {
    try {
      const portfolio = await this.checkPortfolio(userId);

      const updateResult = await this.achievementRepository.update(
        { id, portfolioId: portfolio.id },
        {
          ...data,
        },
      );

      return plainToInstance(UpdateOrDeleteResponseDto, {
        isSuccess: updateResult.affected > 0,
        message: 'Achievement updated successfully',
        at: new Date(),
      });
    } catch (error) {
      handleErrorException(error);
    }
  }

  async delete(userId: string, id: string): Promise<UpdateOrDeleteResponseDto> {
    try {
      const portfolio = await this.checkPortfolio(userId);

      const deleteResult = await this.achievementRepository.delete({
        id,
        portfolioId: portfolio.id,
      });

      return plainToInstance(UpdateOrDeleteResponseDto, {
        isSuccess: deleteResult.affected > 0,
        message: 'Achievement deleted successfully',
        at: new Date(),
      });
    } catch (error) {
      handleErrorException(error);
    }
  }
}
