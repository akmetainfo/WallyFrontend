import axios from "axios";
import { API_URL } from "@/config/config";
import store from "@/store";

const ApiService = {
  init() {
    const config = {
      baseURL: API_URL,
      headers: {
        post: {
          "Content-Type": "application/json"
        },
        common: {
          Authorization: `Bearer ${store.state.auth.token}`
        }
      }
    };
    ApiService.AxiosReq = axios.create(config);
  },

  post(resource, params) {
    return ApiService.AxiosReq.post(resource, JSON.stringify(params));
  },

  get_error(error) {
    if (error.response) {
      if (error.response.status === 400) {
        return "Неверный логин и/или пароль.";
      }

      if (error.response.status === 401) {
        return "Истёк срок токена. Нажмите Logout, затем войдите снова.";
      }

      if (error.response.status === 403) {
        return "Недостаточно прав для выполнения этой операции.";
      }

      return error.response.status;
    }

    if (error.request) {
      return "Сервер недоступен. Попробуйте позднее.";
    }

    return error.message;
  }
};

export default ApiService;

export const AuthService = {
  auth(user) {
    const config = {
      baseURL: API_URL,
      headers: {
        post: {
          "Content-Type": "application/json"
        }
      }
    };
    const instance = axios.create(config);
    return instance.post("/token", user);
  }
};
