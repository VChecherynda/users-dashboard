import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  age: number;

  @Column()
  location: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
