import { User } from '@entities';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Portfolio extends BaseEntity {
  @Column('uuid', { unique: true })
  userId: string;

  @OneToOne(() => User)
  user: User;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('varchar', { length: 255 })
  description: string;

  @Column('varchar', { length: 255 })
  avatar: string;

  @Column('boolean', { default: false })
  isPublic: boolean;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression: "to_tsvector('simple', title)",
    select: false,
    nullable: true,
  })
  @Index('portfolio_search_vector_idx', { synchronize: false })
  search_vector: string;
}
