import { IPaginationLinks, IPaginationMeta } from "./interfaces";

export class Pagination<PaginationObject> {
  constructor(
    public readonly items: PaginationObject[],
    public readonly meta: IPaginationMeta,
    public readonly links?: IPaginationLinks | undefined
  ) {}
}
