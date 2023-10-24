import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageViewer from "./CameraViewDjango";

import "./Camaras.css";

const Camaras = () => {
  const [dispositivo, setDispositvo] = useState("V0");
  const [visible, setVisible] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState("camera1");
  const location = useLocation();
  const navigate = useNavigate();
  const seleccionAntigua = location.state?.selectedPalletId || null;
  const [sliderValueZ, setSliderValueZ] = useState(50);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  const setLeftButtonClinkZ = (prevValueZ) => {
    setSliderValueZ((prevValueZ) => prevValueZ - 5);
  }

  const handleLeftButtonClickZ = async () => {
    console.log(`Previous value: ${sliderValueZ}`);
    let newSliderValueZ = sliderValueZ - 5;
  
    if (sliderValueZ < 5) {
      newSliderValueZ = 0;
    }
  
    setSliderValueZ(newSliderValueZ);
    console.log(`New value: ${newSliderValueZ}`);
  
    try {
      const response = await fetch(
        `${window.location.protocol}//${window.location.hostname}:8000/local/send_z_pos_ros2/${newSliderValueZ}/`
      );
      const data = await response.json();
      console.log("Retorno:", data);
      // Add your desired logic here to display the pallet information
    } catch (error) {
      console.error("Error llamando:", error);
    }
  };
  
  const setRightButtonClinkZ = (prevValueZ) => {
    setSliderValueZ((prevValueZ) => prevValueZ + 5);
  };

  const handleRightButtonClickZ = async () => {
    console.log(`Previous value: ${sliderValueZ}`);
    let newSliderValueZ = sliderValueZ + 5;
  
    if (sliderValueZ >= 95) {
      newSliderValueZ = 100;
    }
  
    setSliderValueZ(newSliderValueZ);
    console.log(`New value: ${newSliderValueZ}`);
  
    try {
      const response = await fetch(
        `${window.location.protocol}//${window.location.hostname}:8000/local/send_z_pos_ros2/${newSliderValueZ}/`
      );
      const data = await response.json();
      console.log("Retorno:", data);
      // Add your desired logic here to display the pallet information
    } catch (error) {
      console.error("Error llamando:", error);
    }
  };

  useEffect(() => {
    const fetchDispositivo = async () => {
      try {
        const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/dispositivos/`);
        const data = await response.json();
        setDispositvo(data[0].modelo);
        if (data[0].modelo === "miniTower") {
          setVisible(false);
        } else {
          setVisible(true);
        }
      } catch (error) {
        console.error("Error fetching almacenes:", error);
      }
    };

    fetchDispositivo();
  }, [dispositivo]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const storedSelectedPalletId = urlSearchParams.get("selectedPalletId");

    if (seleccionAntigua !== null && !isInitialized) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${window.location.protocol}//${window.location.hostname}:8000/local/send_selected_pallet/${seleccionAntigua}/`
          );
          const data = await response.json();
          console.log("Retorno:", data);
        } catch (error) {
          console.error("Error llamando:", error);
        }
      };

      fetchData();
      setIsInitialized(true);
    }
  }, [location.search, isInitialized]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const updatedSearch = urlSearchParams.toString();

    navigate({
      search: updatedSearch,
    });
  }, [location.search, navigate]);

  return (
    <div className="camara-div">
      <div className="camara-container">
        <div className="camara-controles">
          {visible && (
            <div>
              <div className="slider-title">
                <span>Eje Z</span>
              </div>

              <div className="slider-container">
                <button className="slider-button left" onClick={handleLeftButtonClickZ}></button>
                <input
                  className="slider"
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValueZ}
                  disabled
                />
                <button className="slider-button right" onClick={handleRightButtonClickZ}></button>
              </div>
            </div>
          )}

          <Link to="/select">
            <button className="boton-seleccion-pallet">Seleccione Pallet</button>
          </Link>
        </div>
        <div className="camara-viewer">
          <div className="camara-header">
            <h2>Vista de la cámara</h2>
          </div>
          <br />
          <div className="canvas">
            <ImageViewer camera={selectedCamera} />
          </div>
        </div>
        <div className="dropdown-container">
          <label htmlFor="camera-select" className="label">
            Seleccione una cámara:
          </label>
          <select id="camera-select" value={selectedCamera} onChange={handleCameraChange}>
            <option value="camera1">Cámara 1</option>
            <option value="camera2">Cámara 2</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Camaras;
