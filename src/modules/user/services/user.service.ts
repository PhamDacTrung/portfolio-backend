import { UpdateOrDeleteResponseDto } from '@common/dtos';
import { PageDto, PageMetaDto, PageOptionsDto } from '@common/paginations';
import { handleErrorException, NotFoundException } from '@core/exceptions';
import { User } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserFilterDto, UserResponseDto, UserUpdateDto } from '../dtos';
import { IUserService } from '../interfaces';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async get(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return plainToInstance(UserResponseDto, user);
    } catch (error) {
      handleErrorException(error);
    }
  }

  async getAll(
    pageOptions: PageOptionsDto,
    filter?: UserFilterDto,
  ): Promise<PageDto<UserResponseDto>> {
    try {
      const { page, take, sort, sortDirection } = pageOptions;

      const query = this.userRepository
        .createQueryBuilder('user')
        .take(take)
        .skip(pageOptions.skip);

      if (sort || sortDirection) {
        query.orderBy(sort || 'created_at', sortDirection || 'DESC');
      } else {
        query.orderBy('created_at', 'DESC');
      }

      if (filter) {
        const { keywords, role } = filter;

        if (keywords) {
          const formattedQuery = keywords.trim().replace(/ /g, ' & ');
          const searchQuery = keywords ? `${formattedQuery}:*` : formattedQuery;
          query.andWhere('user.search_vector @@ to_tsquery(:searchQuery)', {
            searchQuery,
          });
        }

        if (role) {
          query.andWhere('user.role = :role', { role });
        }
      }

      const [users, total] = await query.getManyAndCount();

      const data = plainToInstance(UserResponseDto, users);
      const meta = new PageMetaDto({ page, take, itemCount: total });

      return new PageDto(data, meta);
    } catch (error) {
      handleErrorException(error);
    }
  }

  async update(
    id: string,
    data: UserUpdateDto,
  ): Promise<UpdateOrDeleteResponseDto> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const updateResult = await this.userRepository.update(id, data);

      return plainToInstance(UpdateOrDeleteResponseDto, {
        isSuccess: updateResult.affected > 0,
        message: 'User updated successfully',
        at: new Date(),
      });
    } catch (error) {
      handleErrorException(error);
    }
  }

  async softDelete(id: string): Promise<UpdateOrDeleteResponseDto> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const deleteResult = await this.userRepository.softDelete(id);

      return plainToInstance(UpdateOrDeleteResponseDto, {
        isSuccess: deleteResult.affected > 0,
        message: 'User deleted successfully',
        at: new Date(),
      });
    } catch (error) {
      handleErrorException(error);
    }
  }
}
