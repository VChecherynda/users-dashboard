import { CacheModule, CacheStore } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UsersService } from '../users.service';
import { mockPaginationResponse, PAGINATION_KEY, LIMIT, PAGE } from './mocks';
import { paginate } from 'nestjs-typeorm-paginate';

jest.mock('nestjs-typeorm-paginate');

describe('UserService', () => {
  let usersService: UsersService;
  let cacheManager: CacheStore;

  const TOTAL = 5;
  const USERS = new Array(TOTAL).fill(undefined).map(() => new User());

  const mockUserRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn(() => [USERS, TOTAL]),
    })),
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          store: mockCacheManager,
        }),
      ],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: 'CacheStore',
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    cacheManager = module.get<CacheStore>('CacheStore');
  });

  describe('findAll', () => {
    it('should return list of users with pagination from cache', async () => {
      mockCacheManager.get.mockResolvedValue(mockPaginationResponse);

      const response = await usersService.findAll({ page: PAGE, limit: LIMIT });

      expect(cacheManager.get).toHaveBeenCalledWith(PAGINATION_KEY);
      expect(cacheManager.set).not.toHaveBeenCalled();
      expect(response).toEqual(mockPaginationResponse);
    });

    it('should return list of users with database and save to cache', async () => {
      mockCacheManager.get.mockResolvedValue(null);

      (paginate as jest.Mock).mockResolvedValue(mockPaginationResponse);

      const response = await usersService.findAll({ page: PAGE, limit: LIMIT });

      expect(cacheManager.get).toHaveBeenCalledWith(PAGINATION_KEY);
      expect(cacheManager.set).toHaveBeenCalledWith(
        PAGINATION_KEY,
        mockPaginationResponse,
        undefined,
      );
      expect(response).toEqual(mockPaginationResponse);
    });
  });
});
