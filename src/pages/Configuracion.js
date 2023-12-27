import React, { useState, useEffect, useRef } from 'react';
import { toast } from "react-toastify";
// import Technician from './Technician';
import './Configuracion.css';

const Configuracion = () => {
  const [IP, setIP] = useState('');
  const [imgsPath, setImgsPath] = useState('');
  const [IPRemote, setIPRemote] = useState('');
  const [hora, setHora] = useState('');
  const horaRef = useRef(null);

  const [dispositivo, setDispositivo] = useState("");

  useEffect(() => {
    fetchDispositivo();
  }, []);

  const fetchDispositivo = async () => {
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/dispositivos/`);
      //const response = await fetch("http://localhost:8000/local/dispositivos/");
      const data = await response.json();
      setDispositivo(data[0].idDispositivos);
    } catch (error) {
      console.error("Error fetching dispositivo:", error);
    }
  };

  const handleSubmitIP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_ip/${dispositivo}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ IP }),
      });
      if (response.ok) {
        // Update was successful
        // Do something, e.g., display a success message
      } else {
        // Update failed
        // Do something, e.g., display an error message
      }
    } catch (error) {
      // Error occurred during the update
      // Do something, e.g., display an error message
    }
  };

  const handleSubmitImgsPath = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_path_remote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgsPath }),
      });
      if (response.ok) {
        // Update was successful
        // Do something, e.g., display a success message
      } else {
        // Update failed
        // Do something, e.g., display an error message
      }
    } catch (error) {
      // Error occurred during the update
      // Do something, e.g., display an error message
    }
  };

  const handleSubmitIPRemote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_ip_remote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ IPRemote }),
      });
      if (response.ok) {
        // Update was successful
        // Do something, e.g., display a success message
      } else {
        // Update failed
        // Do something, e.g., display an error message
        window.alert("¡Seleccione una IP Correcta!");
      }
    } catch (error) {
      // Error occurred during the update
      // Do something, e.g., display an error message
    }
  };

  const handleSubmitHora=  async (e) => {
    e.preventDefault();

    if (!horaRef.current.value) {
      window.alert("¡Seleccione una hora!");
      return;
    }

    // console.log(horaRef.current.value);
    let timeSet = horaRef.current.value

    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_backup_time/`, { //Cuidado con la IP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timeSet }),
      });
      if (response.ok) {
        // Update was successful
        // Do something, e.g., display a success message
      } else {
        // Update failed
        // Do something, e.g., display an error message
      }
    } catch (error) {
      // Error occurred during the update
      // Do something, e.g., display an error message
    }
  };

  const handleInputIP = (event) => {
    setIP(event.target.value);
  };
  const handleInputImgsPath = (event) => {
    setImgsPath(event.target.value);
  };
  const handleInputIPRemote = (event) => {
    setIPRemote(event.target.value); 
 
  };
  const handleInputHora = (event) => {
    setHora(event.target.value);
  };

  return (
    <div className="configuracion">
      <div className="configuracion-panel">
        <span className="cabecera">Panel de configuración del dispositivo</span>
      </div>
      <div className="content">
        <span className="config-disp-texto" style={{
          margin: "20px 0",
          fontWeight: "bold",
          fontSize: "18px",
        }}>Configuración propia del dispositivo</span>
        <div className='configuracion-ip-path'>
          <span className='configuracion-texto'>Introduzca la IP del dispositivo: </span>
          <p></p>
          <input type="text" value={IP} onChange={handleInputIP} />
          <button className='configuracion-boton'  onClick={handleSubmitIP}>Submit</button>
        </div>
        <span className="config-remoto-texto" style={{
          margin: "20px 0",
          paddingBottom: "10px",
          fontWeight: "bold",
          fontSize: "18px",
        }}>Configuración para la copia de imágenes en remoto</span>
        <div className='configuracion-path-imagenes'>
          <span className='configuracion-texto'>Introduzca el path remoto para el almacenamiento de las imágenes: </span>
          <p></p>
          <input type="text" value={imgsPath} onChange={handleInputImgsPath} />
          <button className='configuracion-boton'  onClick={handleSubmitImgsPath}>Submit</button>
        </div>
        <div className='configuracion-modelo'>
          <span className='configuracion-texto'>Introduzca la IP en la que almacenar las imágenes en remoto: </span>
          <p></p>
          <input type="text" value={IPRemote} onChange={handleInputIPRemote} />
          <button className='configuracion-boton'  onClick={handleSubmitIPRemote}>Submit</button>
        </div>
        <div className='configuracion-n-almacenes'>
          <span className='configuracion-texto'>Introduzca la hora en la que realizar la copia de las imágenes: </span>
          <p></p>
          {/* <input type="text" value={hora} onChange={handleInputHora} /> */}
          <input className="input-field" type="time" ref={horaRef} />
          <button className='configuracion-boton'  onClick={handleSubmitHora}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
