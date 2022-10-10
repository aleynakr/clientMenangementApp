import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { RootStoreContext } from "../app/stores/rootStore";
import { useLocation } from "react-router-dom";
import { UserFormValues } from "../app/models/user";
import { Segment, Form, Button, Grid, Container } from "semantic-ui-react";
import { history } from "..";

const UpdateClientComponent = () => {
  const rootStore = useContext(RootStoreContext);
  const { editUser, cancel } = rootStore.userStore;
const {isLoggedIn}=rootStore.adminStore
  const location = useLocation();

  const [id, setId] = useState(Number(location.pathname.split("/")[2]));

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setFormData(initialFormData);

      editUser(formData, id);
    } catch {
      console.log("not working");
    }
    
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  return (
  
    <div>
      <Container>
        <br></br>
        <br></br>
        <br></br>
      <h2 className="text-center">Update Client Information</h2>
      <br></br>
      <br></br>
      <div className="container" style={{ width: "45vw" }}>
        <Form onSubmit={handleSubmit} onReset={cancel}>
          <Form.Field>
            <label>First Name</label>
            <input
            required
              placeholder="First Name"
              type="text"
              name="firstName"
              className="input"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
            required
              placeholder="Last Name"
              type="text"
              name="lastName"
              className="input"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>E Mail </label>
            <input
            required
              placeholder="E Mail"
              type="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Field>
          <Button type="submit" color="green">
            Save
          </Button>
          <Button type="reset" color="red">
            Cancel
          </Button>
        </Form>
      </div>
      </Container>
    </div>
   
  );
};

export default observer(UpdateClientComponent);
