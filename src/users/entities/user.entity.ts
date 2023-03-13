import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

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
}
