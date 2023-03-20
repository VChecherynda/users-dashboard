import { NoteEntity } from 'src/notes/entities/note.entity';
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
export class UserEntity {
  @PrimaryColumn()
  @Generated('uuid')
  @OneToMany(() => NoteEntity, (note) => note.userId)
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
