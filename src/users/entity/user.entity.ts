import { Note } from '../../notes/entity/note.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 'user',
  })
  roleId: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  language: string;

  @Column()
  location: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
