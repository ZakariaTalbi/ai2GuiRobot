import React, { useState, useEffect, useRef } from 'react';
import UserDialog from "../components/userDialog";
import { toast } from "react-toastify";
// import Technician from './Technician';
import './Configuracion.css';

const Configuracion = () => {
  const [IP, setIP] = useState('');
  const [imgsPath, setImgsPath] = useState('');
  const [showImgsPath, setShowImgsPath] = useState('');
  const [IPRemote, setIPRemote] = useState('');
  const [showIPRemote, setShowIPRemote] = useState('');
  const [remoteUser, setRemoteUser] = useState('');
  const [remotePassword, setRemotePassword] = useState('');
  const [hora, setHora] = useState('');
  const horaRef = useRef(null);

  const [selectedFunc, setSelectedFunc] = useState(0);

  const [dispositivo, setDispositivo] = useState("");
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    index: "",
  });

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

  const handleSubmitImgsPath = async (user, password) => {
    // e.preventDefault();
    if(remoteUser == '' || remotePassword == '') {
      window.alert('¡Introduzca un usuario/contraseña válidos!');
      return;
    }
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_path_remote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgsPath, remoteUser, remotePassword, user, password }),
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

  const handleSubmitButtonImgs = async (e) => {

    e.preventDefault();

    console.log(imgsPath)

    if(remoteUser == '' || remotePassword == '') {
      window.alert('¡Introduzca un usuario/contraseña válidos!');
      return;
    }

    setSelectedFunc(1);

    setDialog({
      message: "Cambio de la ruta de almacenamiento de imágenes en remoto.",
      isLoading: true,
      index: 0,
    });
    return
  };

  const fetchImgsPath = async () => {
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_path_remote/`);
      //const response = await fetch("http://localhost:8000/local/dispositivos/");
      const data = await response.json();
      // console.log(data.message);
      setShowImgsPath(data.message);
    } catch (error) {
      console.error("Error fetching dispositivo:", error);
    }
  };

  useEffect(() => {
    fetchImgsPath();
  }, []);

  const handleSubmitIPRemote = async (user, password) => {
    // e.preventDefault();
    if(remoteUser == '' || remotePassword == '') {
      window.alert('¡Introduzca un usuario/contraseña válidos!');
      return;
    }
    // setDialog({
    //   message: "Va a descargar los pallets (esta acción es irreversible)",
    //   isLoading: true,
    //   index: 0,
    // });
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_ip_remote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ IPRemote, remoteUser, remotePassword, user, password, imgsPath }),
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

  const handleSubmitButtonIP = async (e) => {

    e.preventDefault();

    if(remoteUser == '' || remotePassword == '') {
      window.alert('¡Introduzca un usuario/contraseña válidos!');
      return;
    }

    setSelectedFunc(0);

    setDialog({
      message: "Cambio de la IP del dispositivo de almacenamiento en remoto.",
      isLoading: true,
      index: 0,
    });
    return
  };

  const fetchIPRemote = async () => {
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_ip_remote/`);
      //const response = await fetch("http://localhost:8000/local/dispositivos/");
      const data = await response.json();
      // console.log(data.message);
      setShowIPRemote(data.message);
    } catch (error) {
      console.error("Error fetching dispositivo:", error);
    }
  };

  useEffect(() => {
    fetchIPRemote();
  }, []);


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

  const areUSureSubmit = async (choose, user, password) => {
    if (choose) {
      if (selectedFunc == 0) {
        setDialog("", false, "");
        handleSubmitIPRemote(user, password);
        // console.log("chose", user, password);
      } else {
        setDialog("", false, "");
        handleSubmitImgsPath(user, password);
        // console.log("chose", user, password);
      }
      //handleUpdateEstadoExp(expVal.val, expVal.idExp);
    } else {
      setDialog("", false, "");
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
  const handleInputRemoteUser = (event) => {
    setRemoteUser(event.target.value); 
 
  };
  const handleInputRemotePassword = (event) => {
    setRemotePassword(event.target.value); 
 
  };

  return (
    <div className="configuracion">
      
      {/* DIALOG */}

      {dialog.isLoading && (
        <UserDialog onDialog={areUSureSubmit} message={dialog.message} />
      )}

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
        <div className='configuracion-usuario'>
          <span className='configuracion-texto'>Introduzca el usuario del dispositivo remoto:</span>
          <p></p>
          <input type="text" value={remoteUser} placeholder={"usuario"} onChange={handleInputRemoteUser} holder={showIPRemote} />
        </div>
        <div className='configuracion-contraseña'>
          <span className='configuracion-texto'>Introduzca la contraseña del usuario remoto:</span>
          <p></p>
          <input type="password" value={remotePassword} placeholder={"contraseña"} onChange={handleInputRemotePassword} holder={showIPRemote} />
        </div>
        <div className='configuracion-path-imagenes'>
          <span className='configuracion-texto'>Introduzca el path remoto para el almacenamiento de las imágenes: </span>
          <p></p>
          <input type="text" value={imgsPath} placeholder={showImgsPath} onChange={handleInputImgsPath} />
          {/*<button className='configuracion-boton'  onClick={handleSubmitButtonImgs}>Submit</button>*/}
        </div>
        <div className='configuracion-modelo'>
          <span className='configuracion-texto'>Introduzca la IP en la que almacenar las imágenes en remoto: </span>
          <p></p>
          <input type="text" value={IPRemote} placeholder={showIPRemote} onChange={handleInputIPRemote} holder={showIPRemote} />
          <button className='configuracion-boton'  onClick={handleSubmitButtonIP}>Submit</button>
        </div>
        {/* <div className='configuracion-n-almacenes'>
          <span className='configuracion-texto'>Introduzca la hora en la que realizar la copia de las imágenes: </span>
          <p></p>
          <input className="input-field" type="time" ref={horaRef} />
          <button className='configuracion-boton'  onClick={handleSubmitHora}>Submit</button>
        </div> */}
      </div>
    </div>
  );
};

export default Configuracion;
