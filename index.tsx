import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./App";
import ReactDOM from "react-dom";
// import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
   
      <App />
    
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
