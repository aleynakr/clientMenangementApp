import { useContext,useState } from "react";
import { RootStoreContext } from "../app/stores/rootStore";
// import agent from "../api/agent";
import {  useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";

 const Form = () => {
    const rootStore = useContext(RootStoreContext);
   const { cancel,editUser} = rootStore.userStore;
   const location = useLocation();

  const [id, setId] = useState(Number(location.pathname.split("/")[2]));

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
      };
    
      const [formData, setFormData] = useState(initialFormData);
    
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // await agent.User.edit(id, initialFormData);
      // Reset form data
      setFormData(initialFormData);
    
      console.log(formData);
      editUser(formData,id);
    }catch{
      console.log("not working");
    }
  };

 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };
  
  return <div>
   <form onSubmit={handleSubmit} className="form">
        <h1>React form</h1>
        <div>
          <label> First Name</label>
          <input
            type="text"
            name="firstName"
            className="input"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="input"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="button" value="Submit" />
      </form> 
  </div>;
}
export default observer(Form);