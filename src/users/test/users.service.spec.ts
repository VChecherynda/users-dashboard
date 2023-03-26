import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Note } from '../../notes/entity/note.entity';
import { UsersService } from '../users.service';

describe('UserService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;
  let notesRepository: Repository<Note>;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Note),
          useClass: Repository,
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: {
            // Mock the methods of CacheManager if needed
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    notesRepository = module.get<Repository<Note>>(getRepositoryToken(Note));
    cacheManager = module.get<Cache>('CACHE_MANAGER');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
