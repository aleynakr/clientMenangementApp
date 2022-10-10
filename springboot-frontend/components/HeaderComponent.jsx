import { useContext, useEffect, useState } from "react";
import {
  Container,
  Form,
  Grid,
  Menu,
  Button,
  Portal,
  Segment,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { RootStoreContext } from "../app/stores/rootStore";
import { Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const HeaderComponent = () => {
  const rootStore = useContext(RootStoreContext);
  const { adminLogin, userName, password,logout,isLoggedIn ,} = rootStore.adminStore;

  const userFormData = {
    userName: "",
    password: "",
    showPasswod: false,
  };
  const [userData, setUserData] = useState(userFormData);
  const [open, setOpen] = useState(false);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const handleSubmitPortal = (e) => {
    e.preventDefault();

    try {
      setUserData(userFormData);

      adminLogin(userData);
    } catch {
      console.log("not working");
    }
    handleClose();
    setStep1(false)
    setStep2(false)
    setStep3(true)
  };
  const handlePassword = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUserName = (e) => {
   
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
   
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = () => {
    setStep1(false)
    setStep2(true)
  };
  const logOut=()=>{
    logout();
    setStep1(true);
  }
  

  return (
    <div>
    <Menu inverted fixed="top">
      <Menu.Item as={NavLink} exact to="/" header className="margin-left:0px">
        <img src="/logo192.png" alt="logo" style={{ marginRight: "1vh" }} />
        Client Menangement App
      </Menu.Item>

      <Menu.Item
        position="right"
        onClick={handleOpen}
        header
        className="margin-right:90px"
      >
        <Icon size="large" name="user" />
        <Portal onClose={handleClose} open={open}>
          <Segment
            style={{
              left: "90%",
              position: "fixed",
              top: "5%",
              Index: 1000,
            }}
          >
            {step1 && (
              <div>
                <Button color="blue" onClick={handleLogin}>
                  Login
                </Button>
                {/* <Button color="blue" onClick={handleSignUp}>
                  Sign up
                </Button> */}
              </div>
            )}
            {step2 && (
              <div>
                <Form
                  onSubmit={handleSubmitPortal}
                  onReset={handleClose}
                  className="form"
                >
                  <div>
                    <label>User Name</label>
                    <input
                      required
                      placeholder="User Name"
                      type="text"
                      minLength={3}
                      maxLength={20}
                      name="userName"
                      className="input"
                      value={userData.userName}
                      onChange={handleUserName}
                    />
                  </div>

                  <div>
                    <label>Password</label>
                    <input
                      required
                      placeholder="Password"
                      type="password"
                      minLength={6}
                      maxLength={40}
                      name="password"
                      className="input"
                      value={userData.password}
                      onChange={handlePassword}
                    />
                  </div>
                  <br></br>
                  <Button type="submit" color="green">
                    Submit
                  </Button>
                  <Button type="reset" color="red">
                    Cancel
                  </Button>
                </Form>
              </div>
            )}
            {step3 && isLoggedIn &&(
              <div>
                {console.log("yess")}
                <Button onClick={logOut}>Log Out</Button>
              </div>
            )}
          </Segment>
        </Portal>
      </Menu.Item>
    </Menu>
    </div>
  );
};
export default observer(HeaderComponent);
