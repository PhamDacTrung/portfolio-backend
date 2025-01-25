import { INJECTION_SERVICE_TOKEN } from '@common/enums';
import { Portfolio } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './services/portfolio.service';

const Adapters = [
  {
    provide: INJECTION_SERVICE_TOKEN.PORTFOLIO_SERVICE,
    useClass: PortfolioService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio])],
  controllers: [PortfolioController],
  providers: [...Adapters],
})
export class PortfolioModule {}
