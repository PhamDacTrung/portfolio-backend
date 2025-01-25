import { CurrentUser } from '@common/decorators';
import { INJECTION_SERVICE_TOKEN } from '@common/enums';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SkillCreateDto } from './dtos';
import { IUserSkillService } from './interfaces';

@Controller('skill')
export class SkillController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.USER_SKILL_SERVICE)
    private readonly userSkillService: IUserSkillService,
  ) {}

  @Post('create')
  async createSkill(
    @CurrentUser('id') userId: string,
    @Body() data: SkillCreateDto,
  ) {
    return this.userSkillService.create(userId, data);
  }
}
