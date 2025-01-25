import { User } from '@entities';
import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Contact extends BaseEntity {
  @Column('uuid')
  userId: string;

  @OneToOne(() => User)
  user: User;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 255, nullable: true })
  github: string;

  @Column('varchar', { length: 255, nullable: true })
  linkedin: string;

  @Column('varchar', { length: 255, nullable: true })
  twitter: string;

  @Column('varchar', { length: 255, nullable: true })
  facebook: string;

  @Column('varchar', { length: 255, nullable: true })
  youtube: string;

  @Column('varchar', { length: 255, nullable: true })
  telegram: string;

  @Column('varchar', { length: 255, nullable: true })
  discord: string;

  @Column('varchar', { length: 255, nullable: true })
  twitch: string;

  @Column('varchar', { length: 255, nullable: true })
  snapchat: string;

  @Column('varchar', { length: 255, nullable: true })
  whatsapp: string;
}
