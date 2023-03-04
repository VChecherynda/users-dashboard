import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { User as UserInterface } from './interfaces/user.interface';

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

  findByName(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async create(user: UserInterface) {
    await this.usersRepository.save(user);
  }

  async update(id: string, user: UserInterface) {
    await this.usersRepository.update(id, user);
  }

  async delete(id: string) {
    await this.usersRepository.delete(id);
  }
}
