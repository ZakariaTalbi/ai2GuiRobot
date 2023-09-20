import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

//THE STRICT MODE RENDERS THE PAGES TWICE

root.render(
  // <React.StrictMode>
    <BrowserRouter basename="/ai2app">
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);