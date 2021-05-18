import { makeAutoObservable } from "mobx";
import { RootStore } from "./root";
import axiosInstance from "../transport";

export class AuthStore {
  root: RootStore;
  isAuthenticated: boolean;

  constructor(root: RootStore) {
    makeAutoObservable(this);

    this.root = root;
    this.isAuthenticated = false;

    this.hydrate();
  }

  hydrate() {
    axiosInstance
      .post("/auth/hydrate")
      .then(({ status, data }) => {
        if (status === 200) {
          this.isAuthenticated = true;
          this.root.user.populate(data.data);
        }
      })
      .catch((e) => console.error(e));
  }

  async login(params: LoginRequest) {
    return axiosInstance
      .post("/auth/login", params)
      .then(({ status, data }) => {
        if (status === 200) {
          this.isAuthenticated = true;
          this.root.user.populate(data.data);
          return true;
        }
      })
      .catch((e) => console.error(e));
  }

  async signup(params: SignupRequest) {
    return axiosInstance
      .post("/auth/signup", params)
      .then(({ status, data }) => {
        return status === 201;
      })
      .catch((e) => console.error(e));
  }

  logout() {
    axiosInstance
      .post("/auth/logout")
      .then(({ status, data }) => {
        if (status === 200) {
          this.isAuthenticated = false;
        }
      })
      .catch((e) => console.error(e));
  }
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
}
