export type Options = Partial<{
  method: 'GET' | 'POST';
  body: BodyInit | null;
  headers: HeadersInit;
  signal: AbortSignal;
}> | null;

export type ResponseData<T> = {
  code: number;
  isSuccessful: boolean;
  data?: T;
};
