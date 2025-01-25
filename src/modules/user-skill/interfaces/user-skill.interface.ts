import { SkillCreateDto, UserSkillResponseDto } from '../dtos';

export interface IUserSkillService {
  create(userId: string, data: SkillCreateDto): Promise<UserSkillResponseDto>;
}
