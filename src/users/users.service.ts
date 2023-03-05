import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { SavedUser, NewUser } from './interfaces/user.interface';

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

  async create({ email, password }: NewUser) {
    await this.usersRepository.save({ email, password });
  }

  async update(id: string, user: SavedUser) {
    await this.usersRepository.update(id, user);
  }

  async delete(id: string) {
    await this.usersRepository.delete(id);
  }
}
