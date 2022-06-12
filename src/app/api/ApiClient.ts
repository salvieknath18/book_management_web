import axios from "axios";
import { AppDispatch, store } from "../store/store";

const BASE_URL = "http://127.0.0.1:5000/api/";

export class ApiClient {
  getToken() {
    return store.getState().userData.token;
  }

  public client = axios.create({
    baseURL: BASE_URL,
  });

  handleError(errorResponse: any) {
    console.log(errorResponse);
    if (errorResponse) {
      switch (errorResponse.status) {
        default:
          throw new Error(errorResponse.data.errorMessage);
      }
    } else {
      throw new Error("Unable to reach server");
    }
  }

  async get(url: string, dispatch: AppDispatch) {
    const token = this.getToken();
    const response = await this.client
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .catch((err) => {
        this.handleError(err.response);
      });

    return response;
  }

  async delete(url: string, dispatch: AppDispatch) {
    const token = this.getToken();
    const response = await this.client
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .catch((err) => {
        this.handleError(err.response);
      });

    return response;
  }

  async patch(url: string, requestBody: any, dispatch: AppDispatch) {
    const token = this.getToken();
    const response = await this.client
      .patch(url, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      })
      .catch((err) => {
        this.handleError(err.response);
      });

    return response;
  }

  async post(url: string, requestBody: any) {
    const token = this.getToken();
    const response = await this.client
      .post(url, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
      .catch((err) => {
        this.handleError(err.response);
      });
    return response;
  }
}