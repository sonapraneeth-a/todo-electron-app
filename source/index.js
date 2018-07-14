import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import "./scss/main.scss";

import bootstrap from "bootstrap";
import popper from "popper.js";

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
// let root = document.createElement("div");

// root.id = "react-app"
// document.body.appendChild(root);

// Now we can render our application into it
render(<App content="Test" />, document.getElementById("react-app"));
