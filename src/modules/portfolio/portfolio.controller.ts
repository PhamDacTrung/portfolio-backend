import {
  ApiResponseWrapper,
  CurrentUser,
  IsPublic,
  Roles,
} from '@common/decorators';
import { UpdateOrDeleteResponseDto } from '@common/dtos';
import { INJECTION_SERVICE_TOKEN, UserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  PortfolioCreateDto,
  PortfolioResponseDto,
  PortfolioUpdateDto,
} from './dtos';
import { IPortfolioService } from './interfaces';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('')
@ApiBearerAuth('access-token')
export class PortfolioController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.PORTFOLIO_SERVICE)
    private readonly portfolioService: IPortfolioService,
  ) {}

  @Roles(UserRole.USER)
  @ApiResponseWrapper(PortfolioResponseDto, 'Create a portfolio')
  @Post('portfolio')
  create(
    @CurrentUser('id') userId: string,
    @Body() data: PortfolioCreateDto,
  ): Promise<PortfolioResponseDto> {
    return this.portfolioService.create(userId, data);
  }

  // @Roles(UserRole.USER)
  // @ApiResponseWrapper(PageDto<PortfolioResponseDto>, 'Get all portfolios')
  // @Get('@me/portfolios')
  // getAll(
  //   @CurrentUser('id') userId: string,
  //   @Query() query: PageOptionsDto,
  // ): Promise<PageDto<PortfolioResponseDto>> {
  //   return this.portfolioService.getAll(userId, query);
  // }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(PortfolioResponseDto, 'Get a portfolio')
  @Get('portfolio')
  get(@CurrentUser('id') userId: string) {
    return this.portfolioService.get(userId);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(UpdateOrDeleteResponseDto, 'Update a portfolio')
  @Patch('portfolio')
  update(@CurrentUser('id') userId: string, @Body() data: PortfolioUpdateDto) {
    return this.portfolioService.update(userId, data);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(UpdateOrDeleteResponseDto, 'Delete a portfolio')
  @Delete('portfolio')
  delete(@CurrentUser('id') userId: string) {
    return this.portfolioService.delete(userId);
  }

  // @Roles(UserRole.ADMIN)
  // @Get(':userId/portfolios')
  // getAllByAdmin(
  //   @Param('userId') userId: string,
  //   @Query() query: PageOptionsDto,
  // ) {
  //   return this.portfolioService.getAll(userId, query);
  // }

  // pulibc this endpoint
  @IsPublic()
  @ApiResponseWrapper(PortfolioResponseDto, 'Get a portfolio (Public endpoint)')
  @Get(':userId/portfolio')
  getByAdmin(@Param('userId') userId: string) {
    return this.portfolioService.getPublic(userId);
  }
}
