import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
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

  async findAll(options): Promise<Pagination<User>> {
    const { page, limit } = options;

    return await paginate<User>(this.usersRepository, {
      page,
      limit,
    });
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: {
        notes: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async updatePassword(id: string, password: string) {
    return await this.usersRepository.update(id, { password });
  }

  async save(user: UserInterface) {
    return await this.usersRepository.save(user);
  }

  async update(id: string, user: UpdateUserInterface) {
    return await this.usersRepository.update(id, user);
  }

  async delete(id: string) {
    return await this.usersRepository.delete(id);
  }
}
