import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Note {
  @Column()
  id: string;

  @Column()
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
