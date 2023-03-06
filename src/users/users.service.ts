import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import {
  User as UserInterface,
  UserUpdate as UpdateUserInterface,
} from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async create(user: UserInterface) {
    return await this.usersRepository.save(user);
  }

  async update(id: string, user: UpdateUserInterface) {
    return await this.usersRepository.update(id, user);
  }

  async delete(id: string) {
    return await this.usersRepository.delete(id);
  }
}
