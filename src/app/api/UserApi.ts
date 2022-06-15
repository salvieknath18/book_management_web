import { ApiClient } from "./ApiClient";

export class UserListApi extends ApiClient {
  getUsers = async () => {
    const response = await this.get("users");
    return response;
  };
}

export class AddUserAPI extends ApiClient {
  addUsers = async (name: string, email: string, password:string, role: string) => {
    const response = await this.post(`users`, { name, email, password, role});
    return response;
  };
}

export class UpdateUserAPI extends ApiClient {
  updateUsers = async (id:string, name: string, email: string, role: string) => {
    const response = await this.put(`user/${id}`, { name, email, role});
    return response;
  };
}

export class DeleteUserAPI extends ApiClient {
  DeleteUser = async (id: string) => {
    const response = await this.delete(`user/${id}`);
    //const response = await this.delete("user/62a6df0381dde1689722ab0f");
    return response;
  };
}

export class GetUserAPI extends ApiClient {
  getUser = async (id: string) => {
    const response = await this.get(`user/${id}`);
    //const response = await this.delete("user/62a6df0381dde1689722ab0f");
    return response;
  };
}
