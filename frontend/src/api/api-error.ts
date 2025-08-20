export class ApiError extends Error {
  status: number;
  constructor({
    message,
    statusCode,
  }: {
    message: string;
    statusCode: number;
  }) {
    super(message);
    this.message = message;
    this.status = statusCode;
  }
}