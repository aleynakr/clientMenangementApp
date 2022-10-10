import "./App.css";
import React, { useContext, useEffect } from "react";
import { Link, Route, Router, Switch, useLocation } from "react-router-dom";
import ClientList from "./components/ClientList";
import ViewClientComponent from "./components/ViewClientComponent";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "./app/stores/rootStore";
import AddClientComponent from "./components/AddClientComponent";
import UpdateClientComponent from "./components/UpdateClientComponent";
import HeaderComponent from "./components/HeaderComponent";
import Display from "./components/Display";
import { Container } from "semantic-ui-react";
import AdminStore from "./app/stores/adminStore";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const rootStore = useContext(RootStoreContext);
  const { listele, listUser, userRegistry, all } = rootStore.userStore;
  const { isLoggedIn } = rootStore.adminStore;
  
  
  useEffect(() => {
    all();
  }, []);

  return (
    
    <div>
      <HeaderComponent />
      <div>
        <Switch>
          <Route exact path="/" component={Display}></Route>
          {isLoggedIn && (
            <div>
              <Switch>
                <Route path="/admin/clients" component={ClientList}></Route>
                <Route
                  path="/admin/add-client"
                  component={AddClientComponent}
                />
                <Route
                  path="/admin/view-client/:id"
                  component={ViewClientComponent}
                />
                <Route
                  path="/admin/update-client/:id"
                  component={UpdateClientComponent}
                ></Route>
              </Switch>
            </div>
          )}
        </Switch>
        </div>
    </div>
    
  );
}

export default observer(App);
