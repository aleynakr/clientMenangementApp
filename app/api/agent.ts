
import pq from "module";
import { IUser, IUserFormValues, UserFormValues } from "./../models/user";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { history } from "../..";
import { toast } from "react-toastify";
import { number } from "yup";
import { useContext } from "react";

import { RootStore, RootStoreContext } from "../stores/rootStore";
import { IAdmin } from "../models/admin";
import { url } from "inspector";
import { request } from "http";

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

var rootStore: RootStore;
const axiosToken = () => {
  const log = rootStore.adminStore.isLoggedIn;
  if (log === true) {
    axios.interceptors.request.use((config) => {
      const token = rootStore.commonStore.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }
};
axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }
  const { status, data, config, headers } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }

  if (
    status === 401 &&
    headers["www-authenticate"]?.startWith(
      'Bearer error="invalid_tokeb",error_description="The token is expired"'
    )
  ) {
    rootStore.adminStore.logout();
    toast.info("Your session has expired, please login again");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    rootStore.commonStore.setServerError(data);
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const API_URL = "http://localhost:8080/api/auth";
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Conteent-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
  postA: (url: string, body:any) =>
    axios.post(API_URL+"/login",body
    // username:`${body.userName}`,
    // password:`${body.password}` 
    ).then(responseBody),

  getPageWithHeaders: (url: string, headers: any) => {
    return axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          pageNo: `${headers.pageNo}`,
          pageSize: `${headers.pageSize}`,
          sort: `${headers.sort}`,
        },
      })
      .then(responseBody);
  },
  getAdminWithHeaders: (url: string, headers: any) => {
    return axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          userName: `${headers.userName}`,
          password: `${headers.pass}`,
        },
      })
      .then(responseBody);
  },
};

const User = {
  // getPageAdmin: (pageNo: number, pageSize: number,sort:Array<string>) =>
  //   requests.getPageWithHeaders(`/admin/clients/p`, { pageNo, pageSize ,sort}),
  getPage: (pageNo: number, pageSize: number, sort: Array<string>) =>
    requests.getPageWithHeaders(`/all/clients/p`, { pageNo, pageSize, sort }),
  getUser: () => requests.get("/all/clients"),
  getUserAdmin: () => requests.get("/admin/clients"),
  getFilter: (firstName: string, lastName?: string) =>
    requests.get(`/all/clients/a?firstName=${firstName}`),
  getById: (id?: number) => requests.get(`/admin/${id}`),
  postClient: (user: IUserFormValues) => requests.post(`/admin/clients`, user),
  delete: (id?: number) => requests.del(`/admin/${id}`),
  edit: (id: number, formData: IUser) => requests.put(`/admin/${id}`, formData),
};

const Admin = {
  login: (username: string, password: string) =>
    requests.postA("/login", { username, password }),
  refreshToken: () => requests.post(API_URL + "/refreshtoken ", {}),
};

const agent = {
  Admin,
  User,
};

export default agent;
