import { ContactCreateOrUpdateDto, ContactResponseDto } from '../dtos';

export interface IContactService {
  createOrUpdate(
    userId: string,
    data: ContactCreateOrUpdateDto,
  ): Promise<ContactResponseDto>;
  get(userId: string): Promise<ContactResponseDto>;
}
