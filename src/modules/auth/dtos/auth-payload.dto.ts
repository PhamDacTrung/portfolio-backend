import { UserRole } from '@common/enums';
import { AuthPayload } from '@common/interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthPayloadDto implements AuthPayload {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;
}
