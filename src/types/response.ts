export type Pagination<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Response<T> = {
  success: boolean;
  code: number;
  message: string;
  data?: T;
};
