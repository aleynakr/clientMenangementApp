 import UserStore from './userStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import AdminStore from './adminStore';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
 

configure({enforceActions: 'always'});

export class RootStore {
     userStore: UserStore;
     adminStore: AdminStore;
     commonStore:CommonStore;
     modalStore:ModalStore;

    constructor() {
         this.userStore = new UserStore(this);
        this.adminStore= new AdminStore(this);
        this.commonStore=new CommonStore(this);
        this.modalStore=new ModalStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());