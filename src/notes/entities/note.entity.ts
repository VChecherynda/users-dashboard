import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class NoteEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;
}
