import { UpdateOrDeleteResponseDto } from '@common/dtos';
import { PageDto, PageOptionsDto } from '@common/paginations';
import { SkillResponseDto } from '@modules/user-skill/dtos';
import {
  ProjectSkillCreateDto,
  ProjectSkillDeleteDto,
  ProjectSkillResponseDto,
} from '../dtos';

export interface IProjectSkillService {
  getSkills(
    userId: string,
    projectId: string,
    pageOptions: PageOptionsDto,
  ): Promise<PageDto<SkillResponseDto>>;
  create(
    userId: string,
    projectId: string,
    data: ProjectSkillCreateDto,
  ): Promise<ProjectSkillResponseDto>;
  delete(
    userId: string,
    projectId: string,
    data: ProjectSkillDeleteDto,
  ): Promise<UpdateOrDeleteResponseDto>;
}
