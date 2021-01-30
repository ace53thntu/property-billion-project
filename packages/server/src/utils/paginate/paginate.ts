import { Config } from "@config/index";
import {
  FindConditions,
  FindManyOptions,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { createPaginationObject } from "./create-pagination";
import { IPaginationOptions } from "./interfaces";
import { Pagination } from "./pagination";

const DEFAULT_LIMIT = Config.constants.PAGINATION.DEFAULT_LIMIT || 10;
const DEFAULT_PAGE = Config.constants.PAGINATION.DEFAULT_PAGE || 1;

export async function paginate<T>(
  repositoryOrQueryBuilder: Repository<T> | SelectQueryBuilder<T>,
  options: IPaginationOptions,
  searchOptions?: FindConditions<T> | FindManyOptions<T>
) {
  return repositoryOrQueryBuilder instanceof Repository
    ? paginateRepository<T>(repositoryOrQueryBuilder, options, searchOptions)
    : paginateQueryBuilder<T>(repositoryOrQueryBuilder, options);
}

export async function paginateRaw<T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: IPaginationOptions
): Promise<Pagination<T>> {
  const [page, limit, route] = resolveOptions(options);

  const totalQueryBuilder = queryBuilder.clone();
  const [items, total] = await Promise.all([
    queryBuilder
      .limit(limit)
      .offset(limit * (page - 1))
      .getRawMany<T>(),
    totalQueryBuilder.getCount(),
  ]);

  return createPaginationObject<T>(items, total, page, limit, route);
}

export async function paginateRawAndEntities<T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: IPaginationOptions
): Promise<[Pagination<T>, Partial<T>[]]> {
  const [page, limit, route] = resolveOptions(options);

  const totalQueryBuilder = queryBuilder.clone();

  const [itemObject, total] = await Promise.all([
    queryBuilder
      .limit(limit)
      .offset(limit * (page - 1))
      .getRawAndEntities<T>(),
    totalQueryBuilder.getCount(),
  ]);

  return [
    createPaginationObject<T>(itemObject.entities, total, page, limit, route),
    itemObject.raw,
  ];
}

async function paginateRepository<T>(
  repository: Repository<T>,
  options: IPaginationOptions,
  searchOptions?: FindConditions<T> | FindManyOptions<T>
): Promise<Pagination<T>> {
  const [page, limit, route] = resolveOptions(options);

  if (page < 1) {
    return createPaginationObject([], 0, page, limit, route);
  }

  const [items, total] = await repository.findAndCount({
    skip: limit * (page - 1),
    take: limit,
    ...searchOptions,
  });

  return createPaginationObject<T>(items, total, page, limit, route);
}

async function paginateQueryBuilder<T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: IPaginationOptions
): Promise<Pagination<T>> {
  const [page, limit, route] = resolveOptions(options);

  const [items, total] = await queryBuilder
    .take(limit)
    .skip(limit * (page - 1))
    .getManyAndCount();

  return createPaginationObject<T>(items, total, page, limit, route);
}

function resolveOptions(
  options: IPaginationOptions
): [number, number, string | undefined] {
  const page = resolveNumericOption(options, "page", DEFAULT_PAGE);
  const limit = resolveNumericOption(options, "limit", DEFAULT_LIMIT);

  const route = options.route;

  return [page, limit, route];
}

function resolveNumericOption(
  options: IPaginationOptions,
  key: "page" | "limit",
  defaultValue: number
): number {
  const value = options[key];
  const resolvedValue = Number(value);

  if (Number.isInteger(resolvedValue) && resolvedValue >= 0) {
    return resolvedValue;
  }

  console.warn(
    `Query parameter "${key}" with value "${value}" was resolved as "${resolvedValue}", please validate your query input! Falling back to default "${defaultValue}".`
  );
  return defaultValue;
}
