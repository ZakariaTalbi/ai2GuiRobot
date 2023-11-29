import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

//THE STRICT MODE RENDERS THE PAGES TWICE

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <script id="DragDropTouch" src="https://bernardo-castilho.github.io/DragDropTouch/DragDropTouch.js"></script>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);