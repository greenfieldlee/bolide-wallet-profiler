import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('protocol')
export class Protocol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal' })
  TVL: number; // Total Value Locked

  @Column({ type: 'integer' })
  chainId: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'integer' })
  numberOfAudits: number;

  @Column({ type: 'integer' })
  numberOfParticipants: number;

  @Column({ type: 'decimal' })
  poolTVL: number; // Total Value Locked of the pool

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
