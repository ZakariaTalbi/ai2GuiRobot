import React, { useState, useEffect } from "react";
import './Technician.css';

const Technician = () => {

    const [raspIP1, setRaspIP1] = useState('192.168.11.11');
    const [raspIP2, setRaspIP2] = useState('192.168.12.12');
    const [ledColor, setLedColor] = useState("gray");
    const [ledColor2, setLedColor2] = useState("gray");
    const [dockerProc, setDockerProc] = useState('0');
    const [dockerProc2, setDockerProc2] = useState('0');
    const [options1, setOptions1] = useState("1");
    const [options2, setOptions2] = useState("1");
    const [sensors, setSensors] = useState([]);

    const handleONRasp = async (valor) => {
        //e.preventDefault();
        let auxRasP;
        if (valor == 1) {
            auxRasP = raspIP1;
        } else if (valor == 2 ) {
            auxRasP = raspIP2;
        } else {
            console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
        }

        try {
          const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/raspon/`, {
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
          }
        } catch (error) {
          // Error occurred during the update
          // Do something, e.g., display an error message
        }
    };

    const handleOFFRasp = async (valor) => {
        //e.preventDefault();

        let auxRasP;
        if (valor == 1) {
            auxRasP = raspIP1;
        } else if (valor == 2 ) {
            auxRasP = raspIP2;
        } else {
            console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
        }

        try {
          const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/raspoff/`, {
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
          }
        } catch (error) {
          // Error occurred during the update
          // Do something, e.g., display an error message
        }
    };

    const handleRestartRasp = async (valor) => {
        //e.preventDefault();

        let auxRasP;
        if (valor == 1) {
            auxRasP = raspIP1;
        } else if (valor == 2 ) {
            auxRasP = raspIP2;
        } else {
            console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
        }

        try {
          const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/raspreboot/`, {
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
          }
        } catch (error) {
          // Error occurred during the update
          // Do something, e.g., display an error message
        }
    };

    const handleStopDockers = async (valor) => {
        //e.preventDefault();
        let auxRasP;
        if (valor == 1) {
            auxRasP = raspIP1;
        } else if (valor == 2 ) {
            auxRasP = raspIP2;
        } else {
            console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
        }
        // console.log(`About to stop the docker for: ${auxRasP}`);
        try {
          const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/stopdock/`, {
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
          }
        } catch (error) {
          // Error occurred during the update
          // Do something, e.g., display an error message
        }
    };

    const handleONCam = async (valor) => {
        //e.preventDefault();

        let auxRasP;
        if (valor == 1) {
            auxRasP = raspIP1;
        } else if (valor == 2 ) {
            auxRasP = raspIP2;
        } else {
            console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
        }

        try {
          const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/camon/`, {
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
          }
        } catch (error) {
          // Error occurred during the update
          // Do something, e.g., display an error message
        }
    };

    const handleOFFCam = async (valor) => {
      //e.preventDefault();

      let auxRasP;
      if (valor == 1) {
          auxRasP = raspIP1;
      } else if (valor == 2 ) {
          auxRasP = raspIP2;
      } else {
          console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
      }

      try {
        const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/camoff/`, {
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
        }
      } catch (error) {
        // Error occurred during the update
        // Do something, e.g., display an error message
      }
  };

  const handleONDisplay = async (valor) => {
      //e.preventDefault();

      let auxRasP;
      if (valor == 1) {
          auxRasP = raspIP1;
      } else if (valor == 2 ) {
          auxRasP = raspIP2;
      } else {
          console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
      }

      try {
          // console.log(`Valor de la IP en Display ON: ${auxRasP}`);
        const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/dispon/`, {
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
        }
      } catch (error) {
        // Error occurred during the update
        // Do something, e.g., display an error message
      }
  };

  const handleOFFDisplay = async (valor) => {
    //e.preventDefault();

    let auxRasP;
    if (valor == 1) {
        auxRasP = raspIP1;
    } else if (valor == 2 ) {
        auxRasP = raspIP2;
    } else {
        console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
    }

    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/dispoff/`, {
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
      }
    } catch (error) {
      // Error occurred during the update
      // Do something, e.g., display an error message
    }
  };

  const handleONTower = async (valor) => {
    //e.preventDefault();

    let auxRasP;
    if (valor == 1) {
        auxRasP = raspIP1;
    } else if (valor == 2 ) {
        auxRasP = raspIP2;
    } else {
        console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
    }

    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/toweron/`, {
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
      }
    } catch (error) {
      // Error occurred during the update
      // Do something, e.g., display an error message
    }
  };

  const handleOFFTower = async (valor) => {
    //e.preventDefault();

    let auxRasP;
    if (valor == 1) {
        auxRasP = raspIP1;
    } else if (valor == 2 ) {
        auxRasP = raspIP2;
    } else {
        console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
    }

    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/toweroff/`, {
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
      }
    } catch (error) {
      // Error occurred during the update
      // Do something, e.g., display an error message
    }
  };

  const handleStatus = async(valor) => {
    toggleStatus(valor);
    dockerProcesses(valor)
    
  };

  const handleSubmit = async (valor) => {
    //e.preventDefault();

    let auxRasP;
    if (valor == 1) {
        auxRasP = options1;
    } else if (valor == 2 ) {
        auxRasP = options2;
    } else {
        console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
    }

    // console.log(`This is the value: ${auxRasP}`);

    switch (auxRasP) {
      case '1':
        handleStopDockers(valor);
        break;

      case '2':
        // console.log("Starting the cameras")
        handleONCam(valor);
        break;

      case '3':
        // console.log("Stopping the cameras");
        handleOFFCam(valor);
        break;

      case '4':
        handleONDisplay(valor);
        break;

      case '5':
        handleOFFDisplay(valor);
        break;
      
      case '6':
        handleONTower(valor);
        break;
      
      case '7':
        handleOFFTower(valor);
        break;

      default:
        console.log('Default case');
        break;
    }
  };

  const toggleStatus = async (valor) => {

    // console.log(`Toggle Status on ${valor}`);

    let auxRasP;
    if (valor === 1) {
        auxRasP = raspIP1; // Use the current value of raspIP1
        // console.log(`IP: ${auxRasP}`);
    } else if (valor === 2) {
        auxRasP = raspIP2;
    } else {
        console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
        return;
    }
    // console.log(`I am about to connect to this IP: ${auxRasP}`)
    try {
        const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/raspstatus/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ auxRasP }),
        });
        const data = await response.json();
        if (data.status === 'reachable') {
            if(valor==1){
                setLedColor("on");}
            else if(valor==2){
                setLedColor2("on");}
        } else if ((data.status === 'unreachable') || (data.status === 'error')) {
            // console.log(`Status is: ${data.status}`);
            if(valor==1){
                setLedColor("off"); }
            else if(valor==2){
                setLedColor2("off");}
            return;
        }
    } catch (error) {
        console.error("Error getting status:", error);
    }
};

  // useEffect(() => {
    
  //     // Function to toggle status
     
  
  //     // Set up the interval to periodically call toggleStatus
  //     const interval = setInterval(() => {
  //         toggleStatus(1);
  //         toggleStatus(2);
  //     }, 15000);
  
  //     // Fetch initial status and set LED color once after mounting
  //     toggleStatus(1);
  //     toggleStatus(2);
  
  //     // Clean up the interval when the component unmounts or when raspIP1 changes
  //     return () => {
  //         clearInterval(interval);
  //     };
  // }, [raspIP1, raspIP2]);

  const dockerProcesses = async (valor) => {

    // console.log(`Docker Processes on ${valor}`);

    let auxRasP;
        if (valor === 1) {
            auxRasP = raspIP1; // Use the current value of raspIP1
            // console.log(`IP: ${auxRasP}`);
        } else if (valor === 2) {
            auxRasP = raspIP2;
        } else {
            console.error("ERROR EN LA LLAMADA A LAS RASPBERRY'S")
            return;
        }
    // console.log(`Docker procs: ${auxRasP}`);      
    try {
    const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/dockerprocs/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auxRasP }),
    });
    const data = await response.json();
    //setDockerProc(data.processes);
    if (response.ok) {
        if (valor == 1) {
            setDockerProc(data.processes);
        }

        else if (valor == 2) {
            setDockerProc2(data.processes);
        }
    } else {
        // Update failed
        // Do something, e.g., display an error message
    }
    } catch (error) {
    // Error occurred during the update
    // Do something, e.g., display an error message
    }
  }; 

  useEffect(() => {

    toggleStatus(1);
    toggleStatus(2);
    dockerProcesses(1);
    dockerProcesses(2);

  }, []);

  const handleInputIP1 = (event) => {
      const newIP = event.target.value;
      setRaspIP1(newIP);
  };

  const handleInputIP2 = (event) => {
      setRaspIP2(event.target.value);
  };

  const handleOptionsChange1 = (event) => {
    setOptions1(event.target.value);
  };

  const handleOptionsChange2 = (event) => {
    setOptions2(event.target.value);
  };

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
    const interval = setInterval(getSensorMessages, 1000);
  
    // Fetch initial pallets and set colors once after fetching
    getSensorMessages();
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
      <div className="configuracion">
        <div className="configuracion-panel">
          <span className="cabecera">Estado y control del sistema</span>
        </div>
        <div className="content">
          <div className="raspi-container">
            <div className='configuracion-ip'>
              <div className="row-1">
                <span className='configuracion-texto'>Introduzca la IP: </span>
                <p></p>
                <div className="select-status">
                  <input type="text" value={raspIP1} onChange={handleInputIP1} />

                  <button className={`led ${ledColor}`}>
                  {/* You can add other content or text here */}
                  </button>
                </div>

                <div className="docker-processes">
                  <span>Imágenes de docker: </span>
                  <label className="label-text">{dockerProc}</label>
                  <button className='boton-tec' onClick={() => handleStatus(1)}>Recarga</button>
              </div>

                <div className="botones-select">
                  <button className='boton-tec'  onClick={() => handleOFFRasp(1)}>OFF</button>
                  <button className='boton-tec'  onClick={() => handleRestartRasp(1)}>RESTART</button>
                  <select className='boton-select' id="camera-select" value={options1} onChange={handleOptionsChange1}>
                    <option className='opt-tec' value="1">Dockers OFF</option>
                    <option className='opt-tec' value="2">Camera ON</option>
                    <option className='opt-tec' value="3">Camera OFF</option>
                    <option className='opt-tec' value="4">Display ON</option>
                    <option className='opt-tec' value="5">Display OFF</option>
                  </select>
                  <button className='boton-tec'  onClick={() => handleSubmit(1)}>Submit</button>
                  {/* <button className='boton'  onClick={() => handleStopDockers(1)}>STOP DOCKERS</button>
                  <button className='boton'  onClick={() => handleONCam(1)}>CAM ON</button>
                  <button className='boton'  onClick={() => handleONDisplay(1)}>DISPLAY ON</button> */}
                </div>
              </div>
            </div>

            <div className='configuracion-ip'>
              <div className="row-1">
                <span className='configuracion-texto'>Introduzca la IP: </span>
                
                <p></p>
                <div className="select-status">
                  <input type="text" value={raspIP2} onChange={handleInputIP2} />

                  <button className={`led ${ledColor2}`}>
                  {/* You can add other content or text here */}
                  </button>
                </div>

                <div className="docker-processes">
                  <span>Imágenes de docker: </span>
                  <label className="label-text">{dockerProc2}</label>
                  <button className='boton-tec' onClick={() => handleStatus(2)}>Recarga</button>
                </div>

                <div className="botones-select">
                  <button className='boton-tec'  onClick={() => handleOFFRasp(2)}>OFF</button>
                  <button className='boton-tec'  onClick={() => handleRestartRasp(2)}>RESTART</button>
                  <select className='boton-select' id="camera-select" value={options2} onChange={handleOptionsChange2}>
                    <option className='opt-tec' value="1">Dockers OFF</option>
                    <option className='opt-tec' value="2">Camera ON</option>
                    <option className='opt-tec' value="3">Camera OFF</option>
                    <option className='opt-tec' value="6">TowerR ON</option>
                    <option className='opt-tec' value="7">TowerR OFF</option>
                  </select>
                  <button className='boton-tec'  onClick={() => handleSubmit(2)}>Submit</button>
                  {/* <button className='boton'  onClick={() => handleStopDockers(2)}>STOP DOCKERS</button>
                  <button className='boton'  onClick={() => handleONCam(2)}>CAM ON</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="cabecera">Información de los sensores del sistema</span>
        </div>

        <div className="informacion-sensores">
          <div className="dispositivos-row-tec" 
          // style={{ minHeight: "120px" }} 
          >
            <div className="row-tec">
              <div className="dispositivo-container-tec" key="1">
                <div className="container-header-tec">
                  <span>FC Garras</span>
                </div>

                <div
                  className="border-div-tec"
                  style={{ width: "100px", height: "5px", marginBottom: "7px"}}
                ></div>

                <div className="info-div-tec">
                  <span>A1</span>
                  {/* <label className="label-tec-sensors">{sensors.fc_garra_a1 ? "True" : "False"}</label> */}
                  <label className="label-tec-sensors">{sensors.fc_garra_a1}</label>
                </div>

                <div className="info-div-tec">
                  <span>A2</span>
                  <label className="label-tec-sensors">{sensors.fc_garra_a2}</label>
                </div>

                <div className="info-div-tec">
                  <span>B1</span>
                  <label className="label-tec-sensors">{sensors.fc_garra_b1}</label>
                </div>

                <div className="info-div-tec">
                  <span>B2</span>
                  <label className="label-tec-sensors">{sensors.fc_garra_b2}</label>
                </div>

              </div>

              <div className="dispositivo-container-tec" key="2">
                <div className="container-header-tec">
                  <span>FC Alturas</span>
                </div>

                <div
                  className="border-div-tec"
                  style={{ width: "100px", height: "5px", marginBottom: "7px"}}
                ></div>

                <div className="info-div-tec">
                  <span>Top 1</span>
                  <label className="label-tec-sensors">{sensors.fc_altura_top_1}</label>
                </div>

                <div className="info-div-tec">
                  <span>Top 2</span>
                  <label className="label-tec-sensors">{sensors.fc_altura_top_2}</label>
                </div>

                <div className="info-div-tec">
                  <span>Bot 1</span>
                  <label className="label-tec-sensors">{sensors.fc_altura_bot_1}</label>
                </div>

                <div className="info-div-tec">
                  <span>Bot 2</span>
                  <label className="label-tec-sensors">{sensors.fc_altura_bot_2}</label>
                </div>

              </div>

              <div className="dispositivo-container-tec" key="3">
                <div className="container-header-tec">
                  <span>Barreras</span>
                </div>

                <div
                  className="border-div-tec"
                  style={{ width: "100px", height: "5px", marginBottom: "7px"}}
                ></div>

                <div className="info-div-tec">
                  <span>A1</span>
                  <label className="label-tec-sensors">{sensors.barrera_a1}</label>
                </div>

                <div className="info-div-tec">
                  <span>A2</span>
                  <label className="label-tec-sensors">{sensors.barrera_a2}</label>
                </div>

                <div className="info-div-tec">
                  <span>B1</span>
                  <label className="label-tec-sensors">{sensors.barrera_b1}</label>
                </div>

                <div className="info-div-tec">
                  <span>B2</span>
                  <label className="label-tec-sensors">{sensors.barrera_b2}</label>
                </div>

              </div>

            </div>

            <div className="row-tec" key="2">
              <div className="dispositivo-container-tec-2" key="4">
                <div className="container-header-tec">
                  <span>Alturas</span>
                </div>

                <div
                  className="border-div-tec"
                  style={{ width: "100px", height: "5px", marginBottom: "7px"}}
                ></div>

                <div className="info-div-tec">
                  <span>1</span>
                  <label className="label-tec-sensors">{sensors.altura1}</label>
                </div>

                <div className="info-div-tec">
                  <span>2</span>
                  <label className="label-tec-sensors">{sensors.altura2}</label>
                </div>

              </div>

              <div className="dispositivo-container-tec-2" key="5">
                <div className="container-header-tec" style={{paddingRight: "10px"}}>
                  <span>Pallets descolocados</span>
                </div>

                <div
                  className="border-div-tec"
                  style={{ width: "100px", height: "5px", marginBottom: "7px"}}
                  key="5"
                ></div>

                <div className="info-div-tec">
                  <span>1</span>
                  <label className="label-tec-sensors">{sensors.palet_descolocat_1}</label>
                </div>

                <div className="info-div-tec">
                  <span>2</span>
                  <label className="label-tec-sensors">{sensors.palet_descolocat_2}</label>
                </div>

              </div>

              <div className="dispositivo-container-tec-2" key="6">
                <div className="container-header-tec">
                  <span>Pallets</span>
                </div>

                <div
                  className="border-div-tec"
                  style={{ width: "100px", height: "5px", marginBottom: "7px"}}
                  key="6"
                ></div>

                <div className="info-div-tec">
                  <span>A</span>
                  <label className="label-tec-sensors">{sensors.palet_a}</label>
                </div>

                <div className="info-div-tec">
                  <span>B</span>
                  <label className="label-tec-sensors">{sensors.palet_b}</label>
                </div>

              </div>

              <div className="dispositivo-container-tec-2" key="7">
                <div className="container-header-tec">
                  <span>Estado ambiental</span>
                </div>

                <div
                  className="border-div-tec"
                  style={{ width: "100px", height: "5px", marginBottom: "7px"}}
                  key="7"
                ></div>

                <div className="info-div-tec">
                  <span>Temp.</span>
                  <label className="label-tec-sensors">{sensors.temperatura}</label>
                </div>

                <div className="info-div-tec">
                  <span>Hum.</span>
                  <label className="label-tec-sensors">{sensors.humitat}</label>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    );
  };

export default Technician;