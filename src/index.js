import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap-4.0.0-beta.2-dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
