import React, { useState, useEffect } from 'react';

import './Configuracion.css';

const Configuracion = () => {
  const [IP, setIP] = useState('');
  const [imgsPath, setImgsPath] = useState('');
  const [modelo, setModelo] = useState('');
  const [nAlmacenes, setNAlmacenes] = useState('');
  const [nCassettes, setNCassettes] = useState('');

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
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_path/${dispositivo}/`, {
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

  const handleSubmitModelo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_modelo/${dispositivo}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelo }),
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

  const handleSubmitNAlmacenes = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_n_almacenes/${dispositivo}/`, { //Cuidado con la IP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nAlmacenes }),
      });
      // const response = await fetch(`http://localhost:8000/local/update_n_almacenes/${dispositivo}/`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ nAlmacenes }),
      // });
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

  const handleSubmitNCassettes = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_n_cassettes/${dispositivo}/`, { //Cuidado con la IP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nCassettes }),
      });
      // const response = await fetch(`http://localhost:8000/local/update_n_cassettes/${dispositivo}/`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ nCassettes }),
      // });
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
  const handleInputModelo = (event) => {
    setModelo(event.target.value);
  };
  const handleInputNAlmacenes = (event) => {
    setNAlmacenes(event.target.value);
  };
  const handleInputNCassettes = (event) => {
    setNCassettes(event.target.value);
  };

  return (
    <div className="configuracion">
      <div className="configuracion-panel">
        <span className="cabecera">Panel de configuración del dispositivo</span>
      </div>
      <div className="content">
        <div className='configuracion-ip'>
          <span className='configuracion-texto'>Introduzca la nueva IP: </span>
          <p></p>
          <input type="text" value={IP} onChange={handleInputIP} />
          <button className='configuracion-boton'  onClick={handleSubmitIP}>Submit</button>
        </div>
        <div className='configuracion-path-imagenes'>
          <span className='configuracion-texto'>Introduzca el nuevo path para el almacenamiento de las imágenes: </span>
          <p></p>
          <input type="text" value={imgsPath} onChange={handleInputImgsPath} />
          <button className='configuracion-boton'  onClick={handleSubmitImgsPath}>Submit</button>
        </div>
        <div className='configuracion-modelo'>
          <span className='configuracion-texto'>Introduzca el tipo de modelo: </span>
          <p></p>
          <input type="text" value={modelo} onChange={handleInputModelo} />
          <button className='configuracion-boton'  onClick={handleSubmitModelo}>Submit</button>
        </div>
        <div className='configuracion-n-almacenes'>
          <span className='configuracion-texto'>Introduzca el número de almacenes: </span>
          <p></p>
          <input type="text" value={nAlmacenes} onChange={handleInputNAlmacenes} />
          <button className='configuracion-boton'  onClick={handleSubmitNAlmacenes}>Submit</button>
        </div>
        <div className='configuracion-n-cassettes'>
          <span className='configuracion-texto'>Introduzca el número de cassettes: </span>
          <p></p>
          <input type="text" value={nCassettes} onChange={handleInputNCassettes} />
          <button className='configuracion-boton'  onClick={handleSubmitNCassettes}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
