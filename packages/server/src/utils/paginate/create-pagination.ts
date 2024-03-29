import { IPaginationLinks, IPaginationMeta } from "./interfaces";
import { Pagination } from "./pagination";

export function createPaginationObject<T>(
  items: T[],
  totalItems: number,
  currentPage: number,
  limit: number,
  route?: string | undefined
): Pagination<T> {
  const totalPages = Math.ceil(totalItems / limit);

  const hasFirstPage = route;
  const hasPreviousPage = route && currentPage > 1;
  const hasNextPage = route && currentPage < totalPages;
  const hasLastPage = route && totalPages > 0;

  const symbol = route && new RegExp(/\?/).test(route) ? "&" : "?";

  const routes: IPaginationLinks = {
    first: hasFirstPage ? `${route}${symbol}limit=${limit}` : "",
    previous: hasPreviousPage
      ? `${route}${symbol}page=${currentPage - 1}&limit=${limit}`
      : "",
    next: hasNextPage
      ? `${route}${symbol}page=${currentPage + 1}&limit=${limit}`
      : "",
    last: hasLastPage
      ? `${route}${symbol}page=${totalPages}&limit=${limit}`
      : "",
  };

  const meta: IPaginationMeta = {
    totalItems,
    itemCount: items.length,
    itemPerPage: limit,
    totalPages,
    currentPage,
  };

  return new Pagination(items, meta, route ? routes : undefined);
}
