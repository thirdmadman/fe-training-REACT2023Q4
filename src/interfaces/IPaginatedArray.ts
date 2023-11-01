export interface IPaginatedArray<T> {
  array: Array<T>;
  pageSize: number;
  currentPage: number;
  size: number;
}
