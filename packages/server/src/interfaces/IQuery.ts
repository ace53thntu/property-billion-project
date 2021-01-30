export interface IQuery {
  page?: number | string;
  limit?: number | string;
  [key: string]: any;
}
