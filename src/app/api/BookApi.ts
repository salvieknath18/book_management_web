import { ApiClient } from "./ApiClient";

export class BookListApi extends ApiClient {
  getBooks = async () => {
    const response = await this.get("books");
    return response;
  };
}

export class AddBookAPI extends ApiClient {
  addBooks = async (isbn: string, title: string, description: string, genre: string, author: string, yearPublished: string, totalCount: string, availableCount: string) => {
    const response = await this.post(`books`, { isbn, title, description, genre, author, yearPublished, totalCount, availableCount});
    return response;
  };
}

export class UpdateBookAPI extends ApiClient {
  updateBooks = async (id: string, isbn: string, title: string, description: string, genre: string, author: string, yearPublished: string, totalCount: string, availableCount: string) => {
    console.log("totalCount")
    console.log(totalCount)
    const response = await this.put(`book/${id}`, {isbn, title, description, genre, author, yearPublished, totalCount, availableCount});
    return response;
  };
}

export class DeleteBookAPI extends ApiClient {
  DeleteBook = async (id: string) => {
    //const response = await this.delete("book/"+{id});
    const response = await this.delete(`book/${id}`);
    return response;
  };
}