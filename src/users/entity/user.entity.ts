import { Note } from 'src/notes/entity/note.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
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
  created: string;

  @UpdateDateColumn()
  updated: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
