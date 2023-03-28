import { User } from '../entity/user.entity';

export const PAGE = 1;
export const LIMIT = 2;
export const TOTAL = 5;
export const USERS = new Array(TOTAL).map(() => new User());

export const PAGINATION_KEY = `findAllUsers/page=${PAGE}/limit=${LIMIT}`;

export const mockPaginationResponse = {
  items: USERS,
  meta: {
    itemCount: TOTAL,
    itemsPerPage: LIMIT,
    currentPage: PAGE,
  },
};
