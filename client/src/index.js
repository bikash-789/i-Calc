import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Rout from "./Rout";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Rout />
  </Router>
);
