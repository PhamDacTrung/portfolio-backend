import { UpdateOrDeleteResponseDto } from '@common/dtos';
import {
  PortfolioCreateDto,
  PortfolioResponseDto,
  PortfolioUpdateDto,
} from '../dtos';

export interface IPortfolioService {
  create(
    userId: string,
    data: PortfolioCreateDto,
  ): Promise<PortfolioResponseDto>;

  get(userId: string): Promise<PortfolioResponseDto>;

  getPublic(userId: string): Promise<PortfolioResponseDto>;

  // getAll(
  //   userId: string,
  //   pageOptions: PageOptionsDto,
  //   filters?: PortfolioFilterDto,
  // ): Promise<PageDto<PortfolioResponseDto>>;

  update(
    userId: string,
    data: PortfolioUpdateDto,
  ): Promise<UpdateOrDeleteResponseDto>;

  delete(userId: string): Promise<UpdateOrDeleteResponseDto>;
}
