export interface ErrorResponse<T> {
  content: T;
  errors: { [key: string]: any };
}
