import { ProjectSkill } from '@entities';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Portfolio } from './portfolio.entity';

@Entity()
export class Project extends BaseEntity {
  @Column('uuid')
  portfolioId: string;

  @ManyToOne(() => Portfolio)
  @JoinColumn({ name: 'portfolio_id' })
  portfolio: Portfolio;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255, nullable: true })
  organization: string;

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

  @Column('varchar', { length: 255, nullable: true })
  sourceCodeUrl: string;

  @Column('boolean', { default: false })
  isPublic: boolean;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression:
      "to_tsvector('simple', name || ' ' || COALESCE(organization, ''))",
    select: false,
    nullable: true,
  })
  @Index('project_search_vector_idx', { synchronize: false })
  search_vector: string;

  projectSkills: ProjectSkill[];
}
