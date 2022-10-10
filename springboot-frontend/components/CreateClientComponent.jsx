import axios from 'axios';

import React from 'react';
import { useEffect,useState } from 'react';

import ClientService from '../service/ClientService';

const CreateClientComponent = (props,id) => {
    const[client,setClient]=useState({});
    const[firstName,setFirstName]= useState("");
    const[lastName,setLastName]=useState("");
    const[email,setEmail]=useState("");

    useEffect(()=> {
        axios.get("http://localhost:8080/api/v1/clients"+props.match.params.id)
        .then(res => res.json())
        .then(
          (result) => {
            setClient(result);
          }
        );
        if(id === '_add'){
            return;
        }else{
            setFirstName(client.firstName);
            setLastName(client.lastName);
            setEmail(client.email);

        }        
    }, [props.match.params.id, id, client.firstName, client.lastName, client.email],);


    useEffect(()=>{
        changeFirstNameHandler("");
     },[firstName]);   
    useEffect(()=>{
        changeLastNameHandler("");
     },[lastName]); 
    useEffect(()=>{
        saveOrUpdateClient("");
     },);     
       

    // step 3
    // componentDidMount(){

    //     // step 4
    //     if(this.state.id === '_add'){
    //         return
    //     }else{
    //         ClientService.getClientById(this.state.id).then( (res) =>{
    //             let client = res.data;
    //             this.setState({firstName: client.firstName,
    //                 lastName: client.lastName,
    //                 email : client.email
    //             });
    //         });
    //     }        
    // }
    const saveOrUpdateClient = (e) => {
        e.preventDefault();
        let client = {firstName: firstName, lastName: lastName, email: email};
        console.log('client => ' + JSON.stringify(client));

        // step 5
        if(id === '_add'){
            ClientService.createClient(client).then(res =>{
                props.history.push('/clients');
            });
        }else{
            ClientService.updateClient(client,id).then( res => {
                props.history.push('/clients');
            });
        };
    };
    
    const changeFirstNameHandler = (e) => {
        setFirstName(e.target.value) ;   
    }
    const changeLastNameHandler= (e) => {
        setLastName(e.target.value) ;   
    }

    const changeEmailHandler = (e) => {
        setEmail(e.target.value) ;
    }
    const cancel = () => {
        props.history.push('/clients');
    }

   const getTitle = () => {
        if(id === '_add'){
            return <h3 className="text-center">Add Client</h3>
        }else{
            return <h3 className="text-center">Update Client</h3>
        }
    }
    
    return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div  padding="12px 28px" className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={firstName} onChange={changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={lastName} onChange={changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email Address" name="email" className="form-control" 
                                                value={email} onChange={changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={saveOrUpdateClient}>Save</button>
                                        <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
    );
    
}
export default CreateClientComponent;
