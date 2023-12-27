import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import panel from "../icons/display.svg";
import visual from "../icons/stats.svg"; //chart.svg
import camara from "../icons/videocam.svg";
import logout from "../icons/logout.svg";
import ai2 from "../icons/ai2.png";
import settings from "../icons/settings.svg";
import engineering from "../icons/engineering.svg";
import off from "../icons/off.svg";
import "./sidebar.css";
import Dialog from "../components/dialog";

const Sidebar = () => {
  let { logoutCall } = useContext(AuthContext);

  const [text, setText] = useState("STOP");
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    index: "",
  });

  const fetchDispositivoState = async () => {

    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/estado_dispositivo/`);
      const data = await response.json();
      let estado = data.Estado;

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
      // console.log("Retorno:", data);
      // console.log(data.Estado);
      if (data.Estado === 'funciona'){
        setText('STOP');
      } else {
        setText('REANUDAR');
      }
      

    } catch (error) {
      console.error("Error llamando:", error);
    }
  };

  const handleOFFSystem = async (choose) => {
    //e.preventDefault();
    let auxRasP="apagar";

    if (choose) {
      setDialog("", false, "");
      try {
        const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/turn_off_system/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ auxRasP }),
        });
        if (response.ok) {
          // Update was successful
          // Do something, e.g., display a success message
        } else {
          // Update failed
          // Do something, e.g., display an error message
          window.confirm("No se ha podido apagar")
        }
      } catch (error) {
        // Error occurred during the update
        // Do something, e.g., display an error message
      }
    } else {
      setDialog("", false, "");
    }
};
  const areUSureOff = async () => {
    let offMessage = "Va a apagar el dispositivo.";
    //Fetch both the state of the alarms of the system 
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/handle_alarm`);
      const data = await response.json();
      // console.log(`This is the data for the alarms.`);
      // console.log(data);

      if (data.dato == 0) {
        //setDialog("", false, "");
      } else {
        offMessage += " Hay alarmas presentes en el sistema, si lo desea revíselas antes de apagar."
      }

    } catch (error) {
      console.error("Error fetching the alarm handling", error);
    }

    // Check if the system is capturing
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/check_crc_status/`);
      const data = await response.json();
      // console.log(`This is the data for the state of CRC.`);
      // console.log(data);

      if (data.state == false) {
        //setDialog("", false, "");
      } else {
        offMessage += " El sistema se encuentra actualmente capturando, si procede, el sistema se apagará una vez finalizado el proceso de captura."
      }

    } catch (error) {
      console.error("Error fetching the alarm handling", error);
    }

    // Check if and when is the next capture task programmed
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/check_next_task/`);
      const data = await response.json();
      // console.log(`This is the data for the dates of the next task.`);
      // console.log(data);

      if (data.dato == 0) {
        //setDialog("", false, "");
      } else {
        offMessage += ` La siguiente captura se realizará en la siguiente fecha: ${data.fecha}. Recuerde encender el dispositivo previamente.`
      }

    } catch (error) {
      console.error("Error fetching the alarm handling", error);
    }

    setDialog({
      message: offMessage,
      isLoading: true,
      index: 0,
    });


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
          to={"/config"}
          style={{ textDecoration: "none" }}
          className={"link"}
        >
          <li className="sidebar-button">
            <img src={settings} alt="" />
            <span>Configuración</span>
          </li>
        </NavLink>

        <NavLink
          to={"/technician"}
          style={{ textDecoration: "none" }}
          className={"link"}
        >
          <li className="sidebar-button">
            <img src={engineering} alt="" />
            <span>Técnico</span>
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
      <div className="div-border" style={{ marginTop: "70px" }}></div>
      <div className="sidebar-out" onClick={logoutCall}>
      {/* <div className="sidebar-out"> */}
        <img src={logout} alt="" />
        <span>Log Out</span>
      </div>
       {/* DIALOG */}

       {dialog.isLoading && (
        <Dialog onDialog={handleOFFSystem} message={dialog.message} />
      )}
      <div className="sidebar-out" style={{ marginTop: "30px" }} onClick={areUSureOff}>
      {/* <div className="sidebar-out"> */}
        <img src={off} alt="" />
        <span>Apagar</span>
      </div>
      <div className="emergency-button">
        <div className="emergency-envolvent">
          <button className="button-emrgncy" onClick={handleEmergencyStop}>{text}</button>
        </div>
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
