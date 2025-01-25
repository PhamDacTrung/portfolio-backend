import { handleErrorException } from '@core/exceptions';
import { Contact } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { ContactCreateOrUpdateDto, ContactResponseDto } from '../dtos';
import { IContactService } from '../interfaces';

@Injectable()
export class ContactService implements IContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async createOrUpdate(
    userId: string,
    data: ContactCreateOrUpdateDto,
  ): Promise<ContactResponseDto> {
    try {
      const existingContact = await this.contactRepository.findOne({
        where: {
          userId,
        },
      });

      if (!existingContact) {
        // create new contact if not exists
        await this.contactRepository.save(
          this.contactRepository.create({
            ...data,
            userId,
          }),
        );
      } else {
        // update contact if exists
        await this.contactRepository.update(existingContact.id, {
          ...data,
        });
      }

      const contact = await this.contactRepository.findOne({
        where: {
          userId,
        },
      });

      return plainToInstance(ContactResponseDto, contact);
    } catch (error) {
      handleErrorException(error);
    }
  }

  async get(userId: string): Promise<ContactResponseDto> {
    try {
      const contact = await this.contactRepository.findOne({
        where: {
          userId,
        },
      });

      return plainToInstance(ContactResponseDto, contact);
    } catch (error) {
      handleErrorException(error);
    }
  }
}
