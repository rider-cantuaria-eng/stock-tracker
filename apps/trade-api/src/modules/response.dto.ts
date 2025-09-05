import { IPaginationMeta } from "./trade/trade.types";

export class ResponseDto<T> {
  constructor(data: {
    message: string;
    data: T;
    pagination?: IPaginationMeta;
  }) {
    this.message = data.message;
    this.data = data.data;
    this.pagination = data.pagination;
  }

  message: string;
  data: T;
  pagination?: IPaginationMeta;
}
