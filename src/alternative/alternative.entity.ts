import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alternative')
export class Alternative {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  protocol: string;

  @Column()
  position: string;

  @Column()
  numberOfUsers: number;

  @Column({ type: 'decimal' })
  tvl: number;

  @Column({ type: 'decimal' })
  apr: number;

  @Column({ type: 'date' })
  auditOnceSince: Date;
}
