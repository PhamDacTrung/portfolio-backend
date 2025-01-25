import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Portfolio } from './portfolio.entity';
import { Skill } from './skill.entity';

@Entity()
export class UserSkill extends BaseEntity {
  @Column('uuid')
  portfolioId: string;

  @ManyToOne(() => Portfolio)
  @JoinColumn({ name: 'portfolio_id' })
  portfolio: Portfolio;

  @Column('uuid')
  skillId: string;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

  @Column('text', { nullable: true })
  description: string;
}
