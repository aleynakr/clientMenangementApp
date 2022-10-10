import { object } from "yup";
export interface IUsersEnvelope{
    allUsers:IUser[];
    userCount:number;
}


export interface IUser {
    id :number;
    firstName: string;
    lastName: string;
    email: string;
    
}
export interface IUserFormValues extends Partial<IUser>{

}

export class UserFormValues implements IUserFormValues{
    id:number=0;
    firstName : string="";
    lastName : string="";
    email : string="";

}

// export class IUser implements IUser{
//     constructor(init?:UserFormValues){
//         Object.assign(this,init);
//     }
// }
// export class UserFormValues extends IUserFormValues {
//     firstName : string="";
//     lastName : string="";
//     email : string="";

//     constructor(values?:UserFormValues){
//         if(values){
//          this.firstName=values.firstName;
//          this.lastName=values.lastName;
//          this.email=values.email;
//         }
//     }
  
// }



 