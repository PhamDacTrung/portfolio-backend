import { INJECTION_SERVICE_TOKEN } from '@common/enums';
import { Portfolio, Project, ProjectSkill } from '@entities';
import { UserSkillModule } from '@modules/user-skill/user-skill.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectSkillController } from './project-skill.controller';
import { ProjectSkillService } from './services/project-skill.service';

const Adapters = [
  {
    provide: INJECTION_SERVICE_TOKEN.PROJECT_SKILL_SERVICE,
    useClass: ProjectSkillService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectSkill, Project, Portfolio]),
    UserSkillModule,
  ],
  controllers: [ProjectSkillController],
  providers: [...Adapters],
})
export class ProjectSkillModule {}
