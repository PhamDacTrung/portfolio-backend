import { INJECTION_SERVICE_TOKEN } from '@common/enums';
import { Portfolio, Skill } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSkill } from 'database/entities/user-skill.entity';

import { UserSkillService } from './service';
import { SkillController } from './user-skill.controller';

const Adapter = [
  {
    provide: INJECTION_SERVICE_TOKEN.USER_SKILL_SERVICE,
    useClass: UserSkillService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Skill, UserSkill, Portfolio])],
  controllers: [SkillController],
  providers: [...Adapter],
  exports: [...Adapter],
})
export class UserSkillModule {}
