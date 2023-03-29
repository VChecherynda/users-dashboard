import { User } from '../../users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;
}
