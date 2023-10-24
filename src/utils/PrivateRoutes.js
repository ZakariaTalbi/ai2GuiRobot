import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = () => {
  let { user } = useContext(AuthContext);
  // console.log('user', user)
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
