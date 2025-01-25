import { AchievementType } from '@common/enums';
import { Portfolio } from '@entities';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Achievement extends BaseEntity {
  @Column('uuid')
  portfolioId: string;

  @ManyToOne(() => Portfolio)
  portfolio: Portfolio;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('varchar', { length: 255, nullable: true })
  provider: string;

  @Column('timestamp', { nullable: true })
  startedAt: Date | null;

  @Column('timestamp', { nullable: true })
  endedAt: Date | null;

  @Column('varchar', { length: 255, nullable: true })
  description: string;

  @Column('varchar', { length: 255, nullable: true })
  thumbnail: string;

  @Column('varchar', { length: 255, nullable: true })
  url: string;

  @Column('enum', { enum: AchievementType, default: AchievementType.OTHER })
  type: AchievementType;

  @Column('boolean', { default: false })
  isPublic: boolean;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression:
      "to_tsvector('simple', title || ' ' || COALESCE(provider, ''))",
    select: false,
    nullable: true,
  })
  @Index('achievement_search_vector_idx', { synchronize: false })
  search_vector: string;
}
