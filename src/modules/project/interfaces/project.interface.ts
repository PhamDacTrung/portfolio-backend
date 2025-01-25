import { UpdateOrDeleteResponseDto } from '@common/dtos';
import { PageDto, PageOptionsDto } from '@common/paginations';
import {
  ProjectCreateDto,
  ProjectFilterDto,
  ProjectResponseDto,
  ProjectUpdateDto,
} from '../dtos';

export interface IProjectService {
  create(userId: string, data: ProjectCreateDto): Promise<ProjectResponseDto>;
  update(
    userId: string,
    id: string,
    data: ProjectUpdateDto,
  ): Promise<UpdateOrDeleteResponseDto>;
  delete(userId: string, id: string): Promise<UpdateOrDeleteResponseDto>;
  getById(userId: string, id: string): Promise<ProjectResponseDto>;
  getAll(
    userId: string,
    pageOptions: PageOptionsDto,
    filters?: ProjectFilterDto,
  ): Promise<PageDto<ProjectResponseDto>>;
}
