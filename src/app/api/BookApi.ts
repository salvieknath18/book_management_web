import { ApiClient } from "./ApiClient";

export class BookApi extends ApiClient {
  getBooks = async () => {
    const response = await this.get("books");
    return response;
  };
}