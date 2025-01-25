import { UpdateOrDeleteResponseDto } from '@common/dtos';
import { PageDto, PageOptionsDto } from '@common/paginations';
import { UserFilterDto, UserResponseDto, UserUpdateDto } from '../dtos';

export interface IUserService {
  get(id: string): Promise<UserResponseDto>;
  getAll(
    pageOptions: PageOptionsDto,
    filter?: UserFilterDto,
  ): Promise<PageDto<UserResponseDto>>;
  update(id: string, data: UserUpdateDto): Promise<UpdateOrDeleteResponseDto>;
  softDelete(id: string): Promise<UpdateOrDeleteResponseDto>;
}
