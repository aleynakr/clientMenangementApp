import React, { useEffect,useState } from "react";
import { useContext } from "react";
import { RootStoreContext } from "../app/stores/rootStore";
import { Card } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

const ViewClientComponent = () => {
  const rootStore = useContext(RootStoreContext);
  const { user,getClientById } = rootStore.userStore;
  const location = useLocation();

  const [id, setId] = useState(location.pathname.split("/")[3])


  useEffect(() => {
   getClientById(id);
    console.log(location);
  }, []);

  return (
    <div className="container">
      <br></br>
      <br></br>
      <h2 className="text-center">View Client</h2>
      <br></br>
      <br></br>
      <Card centered className=" text-center" style={{ margin: "mx-auto" }}>
        <Card.Content>
          <Card.Header>Client First Name :{user?.firstName}</Card.Header>
          <br></br>
          <Card.Header>Client Last Name : {user?.lastName} </Card.Header>
          <br></br>
          <Card.Description>{user?.email}</Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default observer(ViewClientComponent);
