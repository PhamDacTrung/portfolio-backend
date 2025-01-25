import { UpdateOrDeleteResponseDto } from '@common/dtos';
import { PageDto, PageOptionsDto } from '@common/paginations';
import {
  AchievementCreateDto,
  AchievementFilterDto,
  AchievementResponseDto,
  AchievementUpdateDto,
} from '../dtos';

export interface IAchievementService {
  get(userId: string, id: string): Promise<AchievementResponseDto>;

  getAll(
    userId: string,
    pageOptions: PageOptionsDto,
    filters?: AchievementFilterDto,
  ): Promise<PageDto<AchievementResponseDto>>;

  create(
    userId: string,
    data: AchievementCreateDto,
  ): Promise<AchievementResponseDto>;

  update(
    userId: string,
    id: string,
    data: AchievementUpdateDto,
  ): Promise<UpdateOrDeleteResponseDto>;

  delete(userId: string, id: string): Promise<UpdateOrDeleteResponseDto>;
}
