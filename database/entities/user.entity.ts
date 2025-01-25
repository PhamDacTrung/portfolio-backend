import { UserRole } from '@common/enums';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { nullable: true })
  phoneCode: string;

  @Column('varchar', { nullable: true })
  phoneNumber: string;

  @Column('enum', { enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression:
      "to_tsvector('simple', name || ' ' || email || ' ' || COALESCE(phone_number, ''))",
    select: false,
    nullable: true,
  })
  @Index('user_search_vector_idx', { synchronize: false })
  search_vector: string;
}
