import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
// import AuthContext from "../context/AuthContext";

import panel from "../icons/display.svg";
import visual from "../icons/stats.svg"; //chart.svg
import camara from "../icons/videocam.svg";
import logout from "../icons/logout.svg";
import ai2 from "../icons/ai2.png";
import settings from "../icons/settings.svg";
import "./sidebar.css";
const Sidebar = () => {
  // let { logoutCall } = useContext(AuthContext);

  const [text, setText] = useState("STOP");

  const fetchDispositivoState = async () => {

    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/dispositivos/`);
      const data = await response.json();
      let estado = data[0].estado;
      
      if (estado === 'funciona') {
        setText('STOP');
      } else {
        setText('REANUDAR');
      }

    } catch (error) {
      console.error('Error at fetching dispositivos');
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchDispositivoState, 5000);
  
    // Fetch initial pallets and set colors once after fetching
    fetchDispositivoState();
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleEmergencyStop = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); //Set a timeout to get a response from the node
  
      const response = await fetch(
        `${window.location.protocol}//${window.location.hostname}:8000/local/emergency_stop/`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const data = await response.json();
      console.log("Retorno:", data);
      console.log(data.Estado);
      if (data.Estado === 'funciona'){
        setText('STOP');
      } else {
        setText('REANUDAR');
      }
      

    } catch (error) {
      console.error("Error llamando:", error);
    }
  };

  return (
    <div className="sidebar">
      <NavLink to={"/"} style={{ textDecoration: "none" }}>
        <div className="logo-div">
          <img src={ai2} alt="" />
        </div>
      </NavLink>

      <ul className="sidebar-buttons">
        <NavLink
          to={"/camaras"}
          style={{ textDecoration: "none" }}
          className={"link"}
        >
          <li className="sidebar-button">
            <img src={camara} alt="" />
            <span>Cámaras</span>
          </li>
        </NavLink>

        <NavLink
          to={"/Configuracion"}
          style={{ textDecoration: "none" }}
          className={"link"}
        >
          <li className="sidebar-button">
            <img src={settings} alt="" />
            <span>Configuración</span>
          </li>
        </NavLink>
        {/* <NavLink
          to={"/control"}
          style={{ textDecoration: "none" }}
          className={"link"}
        >
          <li className="sidebar-button">
            <img src={panel} alt="" />
            <span>Panel de Control</span>
          </li>
        </NavLink>
        <NavLink
          to={"/visualizar"}
          style={{ textDecoration: "none" }}
          className={"link"}
        >
          <li className="sidebar-button">
            <img src={visual} alt="" />
            <span>Resultados</span>
          </li>
        </NavLink> */}
      </ul>
      <div className="div-border" style={{ marginTop: "-10px" }}></div>
      {/* <div className="sidebar-out" onClick={logoutCall}> */}
      <div className="sidebar-out">
        <img src={logout} alt="" />
        <span>Log Out</span>
      </div>
      <div className="emergency-button">
        <button onClick={handleEmergencyStop}>{text}</button>
      </div>
      {/* <img
        src={ai2}
        alt=""
        style={{
          width: "100px",
          position: "relative",
          top: "-450px",
          left: "35px",
        }}
      /> */}
    </div>
  );
};

export default Sidebar;
