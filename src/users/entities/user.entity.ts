import { Note } from 'src/notes/entities/note.entity';
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
  @OneToMany(() => Note, (note) => note.userId)
  id: string;

  @Column()
  roleId: string;

  @Column()
  name: string;

  @Column()
  age: number;

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
}
