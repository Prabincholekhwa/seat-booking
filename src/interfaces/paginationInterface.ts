import { SortEnum } from "../enums";

export interface PaginationExtend {
  offset: number;
  limit: number;
}

export interface OrderExtend {
  sort: SortEnum;
  order: string;
}

export interface SearchExtend {
  search?: string;
}

export interface PaginationOrderSearchExtend
  extends PaginationExtend,
    OrderExtend,
    SearchExtend {}

export interface CursorInterface {
  cursor: string;
  node: object;
}

export interface CursorInputInterface {
  count: number;
  cursorCount: number;
  rows: any[];
  before: string | undefined;
  limit: number | undefined;
}

export interface PageInfoInterface {
  count: number;
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}
