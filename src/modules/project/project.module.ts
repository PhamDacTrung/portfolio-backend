import { INJECTION_SERVICE_TOKEN } from '@common/enums';
import { Portfolio, Project } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './services/project.service';

const Adapters = [
  {
    provide: INJECTION_SERVICE_TOKEN.PROJECT_SERVICE,
    useClass: ProjectService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Project, Portfolio])],
  controllers: [ProjectController],
  providers: [...Adapters],
})
export class ProjectModule {}
