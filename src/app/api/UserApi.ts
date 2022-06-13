import { ApiClient } from "./ApiClient";

export class UserListApi extends ApiClient {
  getUsers = async () => {
    const response = await this.get("users");
    return response;
  };
}

export class UpdateUserAPI extends ApiClient {
  updateUsers = async (id:string, name: string, email: string, role: string) => {
    const response = await this.put("user/"+{id}, { name, email, role});
    return response;
  };
}

export class DeleteUserAPI extends ApiClient {
  DeleteUser = async (id: string) => {
    //const response = await this.delete("user/"+{id});
    const response = await this.delete("user/62a6df0381dde1689722ab0f");
    return response;
  };
}