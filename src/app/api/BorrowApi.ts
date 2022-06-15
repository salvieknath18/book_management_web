import { ApiClient } from "./ApiClient";

export class BorrowedBookAPI extends ApiClient {
    getBorrowedBooks = async (id: string) => {
      const response = await this.get(`analytics/borrowedBooks/${id}`);
      return response;
    };
  }

export class BorrowBook extends ApiClient {
    borrowBook = async (id: string) => {
      const response = await this.post("borrowBook", {id});
      return response;
    };
  }

  export class ReturnBook extends ApiClient {
    returnBook = async (id: string) => {
      const response = await this.post("returnBook", {id});
      return response;
    };
  }