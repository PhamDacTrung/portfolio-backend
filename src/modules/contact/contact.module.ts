import { INJECTION_SERVICE_TOKEN } from '@common/enums';
import { Contact } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactService } from './services/contact.service';

const Adapters = [
  {
    provide: INJECTION_SERVICE_TOKEN.CONTACT_SERVICE,
    useClass: ContactService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [...Adapters],
  exports: [...Adapters],
})
export class ContactModule {}
