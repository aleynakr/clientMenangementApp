import { IAdmin } from "./../models/admin";
import agent from "../api/agent";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { updateNamespaceExportDeclaration } from "typescript";
import { history } from "../..";
import commonStore from "../stores/commonStore";
import modalStore from "../stores/modalStore";
import CryptoJS from "crypto-js";

export default class AdminStore {
  refreshTokenTimeout: any;
  rootStore: RootStore;
  

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  @observable userData: IAdmin | null = null;
  @observable userName: string = "";
  @observable password: string = "";
  @observable pass: string = "";
  @observable admin: IAdmin | null = null;
  @observable token: string | null = window.localStorage.getItem('jwt');

    

  get isLoggedIn() {
    return !!this.admin;
  }

  @action adminLogin = async (userData: IAdmin) => {
    this.userName = userData.userName;
    this.password = userData.password;
    try {
      const admin = await agent.Admin.login(this.userName, this.password);
     this.rootStore.commonStore.setToken(admin)
     console.log(admin);
     this.startRefreshTokenTimer(admin);
     runInAction(() =>{
      this.admin = admin;
     } )  
      history.push("/admin/clients");
      this.rootStore.modalStore.closeModal();
      console.log("error")
    } catch (error) {
      throw error;
    }
   
  };
  @action logout=()=>{
   this.rootStore.commonStore.setToken(null);
    window.localStorage.removeItem('jwt');
    this.admin = null;
    history.push('/'); 
  }
  refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
        const admin = await agent.Admin.refreshToken();
        runInAction(() => this.admin = admin);
        this.rootStore.commonStore.setToken(this.admin?.accessToken||"");
        this.startRefreshTokenTimer(admin);
    } catch (error) {
        console.log(error);
    }
}

private startRefreshTokenTimer(admin:IAdmin) {
    const jwtToken = JSON.parse(window.atob(admin.accessToken.split('.')[1]));
    console.log(jwtToken)
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
}

private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
}

}




