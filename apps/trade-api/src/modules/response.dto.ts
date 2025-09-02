export class ResponseDto<T> {
  constructor(data: { message: string; data: T }) {
    this.message = data.message;
    this.data = data.data;
  }

  message: string;
  data: T;
}
