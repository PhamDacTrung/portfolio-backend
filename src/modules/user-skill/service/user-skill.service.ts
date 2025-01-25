import { UpdateOrDeleteResponseDto } from '@common/dtos';
import {
  ConflictException,
  handleErrorException,
  NotFoundException,
} from '@core/exceptions';
import { Portfolio, Skill } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserSkill } from 'database/entities/user-skill.entity';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import {
  SkillCreateDto,
  SkillResponseDto,
  UserSkillResponseDto,
} from '../dtos';
import { IUserSkillService } from '../interfaces';

@Injectable()
export class UserSkillService implements IUserSkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,

    @InjectRepository(UserSkill)
    private readonly userSkillRepository: Repository<UserSkill>,

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

  @Transactional()
  async create(
    userId: string,
    data: SkillCreateDto,
  ): Promise<UserSkillResponseDto> {
    try {
      const portfolio = await this.getPortfolio(userId);

      const { name, description } = data;
      const existingSkill = await this.skillRepository.findOne({
        where: { name },
      });

      // If the skill does not exist, create it
      if (!existingSkill) {
        const skill = await this.skillRepository.save(
          this.skillRepository.create({ name }),
        );

        const userSkill = await this.userSkillRepository.save(
          this.userSkillRepository.create({
            skillId: skill.id,
            portfolioId: portfolio.id,
            description,
          }),
        );

        return plainToInstance(UserSkillResponseDto, {
          id: userSkill.id,
          skill: plainToInstance(SkillResponseDto, skill),
        });
      }

      // If the skill exists, check if the user has the skill
      const existingUserSkill = await this.userSkillRepository.findOne({
        where: { skillId: existingSkill.id, portfolioId: portfolio.id },
      });

      // If the user does not have the skill, create it
      if (!existingUserSkill) {
        const userSkill = await this.userSkillRepository.save(
          this.userSkillRepository.create({
            skillId: existingSkill.id,
            portfolioId: portfolio.id,
            description,
          }),
        );

        return plainToInstance(UserSkillResponseDto, {
          id: userSkill.id,
          skill: plainToInstance(SkillResponseDto, existingSkill),
        });
      } else {
        throw new ConflictException('Skill already exists');
      }
    } catch (error) {
      handleErrorException(error);
    }
  }

  async deleteSkill(id: string): Promise<UpdateOrDeleteResponseDto> {
    try {
      const result = await this.skillRepository.delete(id);

      return plainToInstance(UpdateOrDeleteResponseDto, {
        isSuccess: result.affected > 0,
        message: 'Skill deleted successfully',
      });
    } catch (error) {
      handleErrorException(error);
    }
  }

  async deleteUserSkill(
    userId: string,
    skillId: string,
  ): Promise<UpdateOrDeleteResponseDto> {
    try {
      const portfolio = await this.getPortfolio(userId);

      const existingUserSkill = await this.userSkillRepository.findOne({
        where: { portfolioId: portfolio.id, skillId },
      });

      if (!existingUserSkill) {
        throw new NotFoundException('User skill not found');
      }

      const result = await this.userSkillRepository.delete({
        portfolioId: portfolio.id,
        skillId,
      });

      return plainToInstance(UpdateOrDeleteResponseDto, {
        isSuccess: result.affected > 0,
        message: 'User skill deleted successfully',
      });
    } catch (error) {
      handleErrorException(error);
    }
  }
}
