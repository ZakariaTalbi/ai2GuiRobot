import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import danger from "../icons/danger.svg"
import "./navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [captState, setCaptState] = useState(false);
  const [captPer, setCaptPer] = useState("0%");

  const getSensorMessages = async () => {
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/sensor_msgs/`);
      const data = await response.json();
      setSensors(data);
      // console.log(data)
      // console.log(sensors.palet_descolocat_1)
      return data;
    } catch (error) {
      console.error("Error fetching sensor messages:", error);
      return "#747478"; // Return a default color in case of an error
    }
  };

  useEffect(() => {
    const interval = setInterval(getSensorMessages, 2000);
  
    // Fetch initial pallets and set colors once after fetching
    getSensorMessages();
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getCaptureState = async () => {
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/capture_progress/`);
      const data = await response.json();
      console.log(data);
      console.log(captState);
      setCaptState(data.is_capturing);
      setCaptPer(data.percentage);
      // console.log(data)
      // console.log(sensors.palet_descolocat_1)
      return data;
    } catch (error) {
      console.error("Error fetching sensor messages:", error);
      return "#747478"; // Return a default color in case of an error
    }
  };

  useEffect(() => {
    const interval = setInterval(getCaptureState, 5000);
  
    // Fetch initial pallets and set colors once after fetching
    getSensorMessages();
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      
      <div className="navbar">
        <div className="navbar-climate-column" style={{
          width: `${((window.innerWidth -180))}px`,
        }}>
          <div className="navbar-climate-row" style={{
            justifyContent: "center",
            // alignContent: "center",
          }}>
              <div className="nav-info-div-tec">
                <span>Temperatura:</span>
                <label className="nav-label-tec-sensors">{sensors.temperatura} °C</label>
              </div>

              <div className="nav-info-div-tec">
                <span>Humedad:</span>
                <label className="nav-label-tec-sensors">{sensors.humitat} %</label>
              </div>

              {captState && <div className="nav-info-div-tec">
                <span>Capturando:</span>
                <label className="nav-label-tec-sensors">{captPer}</label>
              </div>}

              
          </div> 
        </div>
       
        <div className="navbar-elements" ref={menuRef}>
          

          {/* <img
            src={danger}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpen(!open);
            }}
          /> */}
          <div>
            <NavLink
            to={"/alarms"}
            style={{ textDecoration: "none" }}
            className={"link"}
            >
              {/* <li> */}
                <img src={danger} alt="" />
              {/* </li> */}
            </NavLink>
          </div>
          {/* <div
            className={`settings-dropdown ${open ? "active" : "inactive"}`}
          ></div> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
