import { IUser } from "./../models/user";
import { toast } from "react-toastify";
import {
  observable,
  action,
  runInAction,
  computed,
  reaction,
  makeAutoObservable,
  values,
} from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";
import { useState } from "react";
import { PaginationProps } from "semantic-ui-react";
import { number } from "yup";
import { IAdmin } from "../models/admin";

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore= rootStore;
  }

  @observable user: IUser | null = null;
  @observable allUsers: IUser[] = [];
  @observable users: IUser[] = [];
  @observable formData: IUser | null = null;
  @observable submitting = false;
  @observable userRegistry = new Map();
  @observable userCount: number = 0;
  @observable pageSize: number = 10;
  @observable pageNo: number = 1;
  @observable userList: IUser[] = [];
  @observable clickCount: number = 0;
  @observable sort :Array<string>=["firstName","asc"];
  @observable userData: IAdmin|null=null;
@observable userName:string="";
@observable password:string="";


    // @action adminLogin = async (userData:IAdmin ) => {
    //   this.userName=userData.userName;
    //    this.password=userData.password;
    //     try {
    //         console.log(this.userName);
            
    //          const admin = await agent.Admin.login(this.userName,this.password);
    //          console.log(admin);
             
       
    //      this.listele(this.pageNo,this.sort);
        
    //      } catch (error) {
    //          console.log(error);
    //      }
    //      history.push('/admin/clients');
    // }
    

  @computed get listUser() {
    return Array.from(this.userRegistry.values());
  }
  @computed get totalPages() {
    return Math.ceil(this.userCount / this.pageSize);
  }
  @action handlePage = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => {
    event.preventDefault();
    this.pageNo = Number(data.activePage);
    this.listele(this.pageNo,this.sort);
    console.log(this.pageNo);
  };

 @action handleLastNameClick=()=>{
   this.sort=["lastName","desc"];
   this.listele(this.pageNo,this.sort);
  
     };
     @action handleFirstNameClick=()=>{
      this.sort=["firstName","desc"];
      this.listele(this.pageNo,this.sort);
     
        };

   
  @action listele = async (pageNo: number,sort:Array<string>) => {
    this.userRegistry.clear();
    try {
      if(pageNo>0){
      this.pageNo = this.pageNo-1;
    }
     
      const listUsers = await agent.User.getPage(this.pageNo, this.pageSize,this.sort);
      console.log(this.pageNo);
      const { users } = listUsers;

      runInAction(() => {
      
        listUsers.forEach((user: any) => {
          this.userRegistry.set(user.id, user);
        });
      });
    } catch (error) {
      
    }
  };
  @action all = async () => {
    try {
      const all = await agent.User.getUser();
      const { allUsers } = all;
      let userCount = 1;
      runInAction(() => {
        all.forEach((user: any) => {
          this.userCount = userCount++;
        });
        console.log(this.userCount);
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action searchClients = async (params: string) => {
    this.userRegistry.clear();
    const paramsAsStr = ("" + params).trim();
    let firstName;
    let lastName;
    if (paramsAsStr.includes(" ")) {
      firstName = paramsAsStr.substring(0, paramsAsStr.indexOf(" "));
      lastName = paramsAsStr.substring(paramsAsStr.lastIndexOf(" ") + 1);
      const listUsers = await agent.User.getFilter(firstName, lastName);
      runInAction(() => {
        listUsers.forEach((user: any) => {
          this.userRegistry.set(user.id, user);
        });
      });
    } else {
      firstName = paramsAsStr;
      const listUsers = await agent.User.getFilter(firstName);
      runInAction(() => {
        listUsers.forEach((user: any) => {
          this.userRegistry.set(user.id, user);
        });
      });
    }
  };

  @action getClientById = async (id: number) => {
    const user = await agent.User.getById(id);
    runInAction(() => {
      this.user = user;
      this.userRegistry.set(this.user, user.id);
      history.push(`/admin/view-client/${id}`);
    });
  };

  @action deleteClient = async (id: number) => {
    await agent.User.delete(id);
    runInAction(() => {
      this.userRegistry.delete(id);
    });
  };

  @action cancel = async () => {
    history.push("/admin/clients");
  };
  @action clickUpdate = async (id: number) => {
    history.push(`/admin/update-client/${id}`);
  };
  @action clickAdd = async () => {
    history.push(`/admin/add-client/`);
  };

  @action createUser = async (formData: IUser) => {
    console.log(formData);
    try {
      await agent.User.postClient(formData);
      runInAction(() => {
        this.listUser.push(formData);
      });
    } catch (error) {
      toast.error("Problem submitting data");
    }
    history.push("/admin/clients");
  };

  @action editUser = async (formData: IUser, id: number) => {
    try {
      await agent.User.edit(id, formData);

      runInAction(() => {
        console.log(formData);
        this.userRegistry.set(id, formData);
        
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error);
    }
    history.push("/admin/clients");
  };
  
}
