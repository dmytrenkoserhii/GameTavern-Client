import { List } from './list.interface';

export interface GetListsResponseData {
  items: List[];
  meta: {
    total: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}
