import { ApiResponseWrapper, CurrentUser, Roles } from '@common/decorators';
import { INJECTION_SERVICE_TOKEN, UserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ContactCreateOrUpdateDto, ContactResponseDto } from './dtos';
import { IContactService } from './interfaces';

@Controller('')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class ContactController {
  constructor(
    @Inject(INJECTION_SERVICE_TOKEN.CONTACT_SERVICE)
    private readonly contactService: IContactService,
  ) {}

  @Roles(UserRole.USER)
  @ApiResponseWrapper(ContactResponseDto, 'Get a contact')
  @Get('@me/contact')
  get(@CurrentUser('id') userId: string) {
    return this.contactService.get(userId);
  }

  @Roles(UserRole.USER)
  @ApiResponseWrapper(ContactResponseDto, 'Update a contact')
  @Patch('@me/contact')
  update(
    @CurrentUser('id') userId: string,
    @Body() data: ContactCreateOrUpdateDto,
  ) {
    return this.contactService.createOrUpdate(userId, data);
  }
}
