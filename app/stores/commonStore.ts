import { makeAutoObservable, observable, reaction } from "mobx";
import { ServerError } from "../models/serverError";
import { RootStore } from "../stores/rootStore";

export default class CommonStore {
   @observable error: ServerError | null = null;
    @observable token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;

    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        
        makeAutoObservable(this);
        this.rootStore= rootStore;
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }
    
    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}