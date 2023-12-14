import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('position')
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  protocol: string;

  @Column()
  positionName: string;

  @Column({ type: 'decimal' })
  depositedAmount: number;

  @Column({ type: 'decimal' })
  earning: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedTime: Date;

  @ManyToOne(() => User, (user) => user.positions)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
