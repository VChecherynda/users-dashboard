import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  room: string;

  @Column()
  sender: string;

  @Column()
  message: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
