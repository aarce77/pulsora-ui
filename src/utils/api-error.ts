export class ApiError extends Error {
  constructor(
    message: string,
    readonly statusCode?: number,
    readonly payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
