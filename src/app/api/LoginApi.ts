import { ApiClient } from "./ApiClient";

export class LoginApi extends ApiClient {
  login = async (email: string, password: string) => {
    const response = await this.post("auth/login", { email, password });
    return response;
  };
}
