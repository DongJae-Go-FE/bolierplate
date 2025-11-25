export type PageProps<Params = unknown, SearchParams = unknown> = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

export type CommonResponse<T = unknown> = {
  timestamp: string;
  success: boolean;
  msg: string;
  code: number;
  error: unknown;
  data: T;
};
