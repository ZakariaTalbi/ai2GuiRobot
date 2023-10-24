import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import jwt_decode from "jwt-decode";
import AuthContext from "../context/AuthContext";

const TechnicianRoute = () => {
  let { user } = useContext(AuthContext);
//   localStorage.getItem("authTokens")
//       ? jwt_decode(localStorage.getItem("authTokens"))
//       : null

  return user.permission ? <Outlet /> : <Navigate to="/" />;
};

export default TechnicianRoute;
