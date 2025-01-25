import { INJECTION_SERVICE_TOKEN } from '@common/enums';
import { Achievement, Portfolio } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './services/achievement.service';

const Adapters = [
  {
    provide: INJECTION_SERVICE_TOKEN.ACHIEVEMENT_SERVICE,
    useClass: AchievementService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Achievement, Portfolio])],
  controllers: [AchievementController],
  providers: [...Adapters],
})
export class AchievementModule {}
