import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {
  User as UserInterface,
  UserUpdate as UpdateUserInterface,
} from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(options): Promise<Pagination<UserEntity>> {
    // return this.usersRepository.find();

    const { page, limit } = options;

    return await paginate<UserEntity>(this.usersRepository, {
      page,
      limit,
    });
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async updatePassword(id: string, password: string) {
    return await this.usersRepository.update(id, { password });
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
