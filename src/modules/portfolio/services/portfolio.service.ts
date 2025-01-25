import { UpdateOrDeleteResponseDto } from '@common/dtos';
import {
  BadRequestException,
  handleErrorException,
  NotFoundException,
} from '@core/exceptions';
import { Portfolio } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import {
  PortfolioCreateDto,
  PortfolioResponseDto,
  PortfolioUpdateDto,
} from '../dtos';
import { IPortfolioService } from '../interfaces';

@Injectable()
export class PortfolioService implements IPortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(
    userId: string,
    data: PortfolioCreateDto,
  ): Promise<PortfolioResponseDto> {
    try {
      const portfolio = await this.portfolioRepository.findOne({
        where: { userId },
      });

      if (portfolio) {
        throw new BadRequestException('Portfolio already exists');
      }

      const newPortfolio = await this.portfolioRepository.save({
        ...data,
        userId,
      });
      return plainToInstance(PortfolioResponseDto, newPortfolio);
    } catch (error) {
      handleErrorException(error);
    }
  }

  async get(userId: string): Promise<PortfolioResponseDto> {
    try {
      const portfolio = await this.portfolioRepository.findOne({
        where: { userId },
      });
      return plainToInstance(PortfolioResponseDto, portfolio);
    } catch (error) {
      handleErrorException(error);
    }
  }

  async getPublic(userId: string): Promise<PortfolioResponseDto> {
    try {
      const portfolio = await this.portfolioRepository.findOne({
        where: { userId, isPublic: true },
      });
      return plainToInstance(PortfolioResponseDto, portfolio);
    } catch (error) {
      handleErrorException(error);
    }
  }

  // async getAll(
  //   userId: string,
  //   pageOptions: PageOptionsDto,
  //   filters?: PortfolioFilterDto,
  // ): Promise<PageDto<PortfolioResponseDto>> {
  //   try {
  //     const { page, take, sort, sortDirection } = pageOptions;

  //     const query = this.portfolioRepository
  //       .createQueryBuilder('portfolio')
  //       .where('portfolio.userId = :userId', { userId })
  //       .take(take)
  //       .skip(pageOptions.skip);

  //     if (sort || sortDirection) {
  //       query.orderBy(sort || 'created_at', sortDirection || 'DESC');
  //     } else {
  //       query.orderBy('created_at', 'DESC');
  //     }

  //     if (filters) {
  //       const { keywords } = filters;
  //       if (keywords) {
  //         const formattedQuery = keywords.trim().replace(/ /g, ' & ');
  //         const searchQuery = keywords ? `${formattedQuery}:*` : formattedQuery;

  //         query.andWhere(
  //           'portfolio.search_vector @@ to_tsquery(:searchQuery)',
  //           {
  //             searchQuery,
  //           },
  //         );
  //       }
  //     }

  //     const [portfolios, total] = await query.getManyAndCount();

  //     const data = plainToInstance(PortfolioResponseDto, portfolios);
  //     const meta = new PageMetaDto({ page, take, itemCount: total });

  //     return new PageDto(data, meta);
  //   } catch (error) {
  //     handleErrorException(error);
  //   }
  // }

  async update(
    userId: string,
    data: PortfolioUpdateDto,
  ): Promise<UpdateOrDeleteResponseDto> {
    try {
      const portfolio = await this.portfolioRepository.findOne({
        where: { userId },
      });

      if (!portfolio) {
        throw new NotFoundException('Portfolio not found');
      }

      const updateResult = await this.portfolioRepository.update(portfolio.id, {
        ...data,
      });
      return plainToInstance(UpdateOrDeleteResponseDto, {
        isSuccess: updateResult.affected > 0,
        message: 'Portfolio updated successfully',
        at: new Date(),
      });
    } catch (error) {
      handleErrorException(error);
    }
  }

  async delete(userId: string): Promise<UpdateOrDeleteResponseDto> {
    try {
      const portfolio = await this.portfolioRepository.findOne({
        where: { userId },
      });

      if (!portfolio) {
        throw new NotFoundException('Portfolio not found');
      }

      const deleteResult = await this.portfolioRepository.softDelete(
        portfolio.id,
      );
      return plainToInstance(UpdateOrDeleteResponseDto, {
        isSuccess: deleteResult.affected > 0,
        message: 'Portfolio deleted successfully',
        at: new Date(),
      });
    } catch (error) {
      handleErrorException(error);
    }
  }
}
