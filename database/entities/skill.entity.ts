import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Skill extends BaseEntity {
  @Column('varchar', { length: 255, unique: true })
  name: string;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression: "to_tsvector('simple', name)",
    select: false,
    nullable: true,
  })
  @Index('skill_search_vector_idx', { synchronize: false })
  search_vector: string;
}
