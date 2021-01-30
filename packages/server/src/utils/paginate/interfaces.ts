export interface IPaginationOptions {
  limit: number | string;
  page: number | string;
  route?: string;
}

export interface IPaginationMeta {
  itemCount: number;
  totalItems: number;
  itemPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IPaginationLinks {
  first?: string;
  previous?: string;
  next?: string;
  last?: string;
}
