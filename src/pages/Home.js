
import React, { useState, useEffect, useRef } from "react";

import "./Home.css";
import "./PalletLayout.css";
import Dialog from "../components/dialog";
import CondPlate from "../components/CondPlate";
import {Sortable} from '@shopify/draggable';


const Home = () => {

  const [openPlate, setOpenPlate] = useState(false);
  const [plateData, setPlateData] = useState({cond:[], condArray:[[]]});
  const [plateLocation, setPlateLocation] = useState("C1-P1");

  const [almacenes, setAlmacenes] = useState([]);
  const [cassettes, setCassettes] = useState([]);
  const [pallets, setPallets] = useState([]);
  const [leave, setLeave] = useState([]);
  const [almacenesNom, setAlmacenesNom] = useState(["0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);


  const [draggedPallet, setDraggedPallet] = useState(null);
  const [targetSlot, setTargetSlot] = useState(null);

  const [dispositivo, setDispositivo] = useState("");
  const [experimentos, setExperimentos] = useState([]);
  const [estadoExperimentos, setEstadoExperimentos] = useState({});

  const [palletHeight, setPalletHeight] = useState("50");
  const [palletWidth, setPalletWidth] = useState("200");
  const [almacenSpace, setalmacenSpace] = useState("200");
  const [sensors, setSensors] = useState([]);
  
  const [slots, setSlots] = useState([]);
  const containerRef = useRef(null);

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    index: "",
  });

  const [expVal, setExpVal] = useState({
    val: "",
    idExp: -1,
  });

  const handleEstadoSelect = async (event, idExperimentos) => {
    const selectedValue = event.target.value;
    // Check if the selected value is "descargado" and display the confirm message
    if (selectedValue === "descargado") {
      // const confirmed = window.confirm("Are you sure you want to set it as 'descargado'?");

      // if (!confirmed) {
      //   // If the user cancels, revert the selected value
      //   event.target.value = estadoExperimentos[idExperimentos];
      //   return;
      // } else {
      //   handleUpdateEstadoExp(selectedValue, idExperimentos);
      // }

      setDialog({
        message: "Va a descargar los pallets (esta acción es irreversible)",
        isLoading: true,
        index: 0,
      });

      setExpVal({
        val: selectedValue,
        idExp: idExperimentos,
      })

    } else {
      handleUpdateEstadoExp(selectedValue, idExperimentos);
    }

    setEstadoExperimentos((prevExperimentoStates) => ({
      ...prevExperimentoStates,
      [idExperimentos]: selectedValue,
    }));
  };

  const areUSureExperiments = async (choose) => {
    if (choose) {
      setDialog("", false, "");
      handleUpdateEstadoExp(expVal.val, expVal.idExp);
    } else {
      setDialog("", false, "");
    }
  };

  const handleUpdateEstadoExp = async (nEstado, idExperimento) => {
    
    // console.log('Hola desde el cambio');
    if (nEstado == "descargado") {
      console.log("Descargando")
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/control/${idExperimento}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/update_est_exp/${idExperimento}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nEstado }),
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
    window.location.reload(false);
  };

  useEffect(() => {
    fetchExperimentos();
  }, []);

  const fetchExperimentos = async () => {
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/experimentos/`);
      const data = await response.json();
      const arrayData = Object.values(data);
      generateExperimentos(arrayData);
      const initialExperimentoStates = {};
      arrayData.forEach((experimento) => {
        initialExperimentoStates[experimento.idExperimentos] = "select";
      });
      setEstadoExperimentos(initialExperimentoStates);
    } catch (error) {
      console.error("Error fetching experimentos:", error);
    }
  };
  

  const generateExperimentos = (exps) => {
    setExperimentos([...exps]);
  };  

  useEffect(() => {
    fetchDispositivo();
  }, []);

  const fetchDispositivo = async () => {
    console.log(`${window.location.protocol}//${window.location.hostname}/8000/local/dispositivos/`);  
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/dispositivos/`);
      //const response = await fetch("http://192.168.1.104:8000/local/dispositivos/");
      //const response = await fetch("http://158.42.163.183:8000/local/dispositivos/");
      //const response = await fetch("http://localhost:8000/local/dispositivos/");
      const data = await response.json();
      setDispositivo(data[0].Modelo);
      console.log(data[0].Modelo, data[0].nAlmacenes, data[0].nCassettes);
      //console.log(`Tipo de dato: ${typeof(data)}. Experimentos: ${experimentos[0]}`);
      generateAlmacenes(data[0].nAlmacenes);
      generateCassettes(data[0].nCassettes);
      fetchPalletsAndSetColors();
    } catch (error) {
      console.error("Error fetching dispositivo:", error);
    }
  };

  const generateAlmacenes = (numAlmacenes) => {
    const generatedAlmacenes = [];
    for (let i = 1; i <= numAlmacenes; i++) {
      generatedAlmacenes.push({ id: i });
    }
    setAlmacenes(generatedAlmacenes);
    //console.log(almacenes);
  };

  const generateCassettes = (numCassettes) => {
    const generatedCassettes = [];
    const slotsPerCassette = 9; // Number of slots per cassette
  
    for (let i = 1; i <= numCassettes; i++) {
      generatedCassettes.push({ id: i, slots: slotsPerCassette });
    }
  
    setCassettes(generatedCassettes);
    //console.log(cassettes);
  };

  const fetchPallets = async () => {
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/pallets`);
      //const response = await fetch("http://158.42.163.183:8000/local/pallets");
      //const response = await fetch("http://localhost:8000/local/pallets");
      const data = await response.json();
      //console.log(data);
      setPallets(data);
    } catch (error) {
      console.error("Error fetching pallets:", error);
    }
  };

  useEffect(() => {
    const generatedSlots = generateSlots();
    setSlots(generatedSlots);
    //console.log(generatedSlots);
    //console.log(slots);
  }, [cassettes]);

  const generateSlots = () => {
    const generatedSlots = [];
    const slotsPerCassette = 9; // Number of slots per cassette

    cassettes.forEach((cassette) => {
      for (let i = 1; i <= slotsPerCassette; i++) {
        generatedSlots.push({ cassetteId: cassette.id, slotId: i });
      }
    });

    return generatedSlots;
  };

  const getSlotKey = (cassetteId, slotId) => {
    return `slot-${cassetteId}-${slotId}`;
  };

  const getColorByExperimento = async (idPallets) => {
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/get_color/${idPallets}/`);
      //const response = await fetch(`http://158.42.163.183:8000/local/get_color/${idPallets}/`);
      //const response = await fetch(`http://localhost:8000/local/get_color/${idPallets}/`);
      const data = await response.json();
      //console.log(`Esta es la info: ${data.estado}`);
      return data;
    } catch (error) {
      console.error("Error fetching color by idPallets:", error);
      return "#747478"; // Return a default color in case of an error
    }
  };

  const fetchPalletsAndSetColors = async () => {
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/pallets`);
      //const response = await fetch("http://158.42.163.183:8000/local/pallets");
      //const response = await fetch("http://localhost:8000/local/pallets");
      const data = await response.json();
      const updatedPallets = await Promise.all(
        data.map(async (pallet) => {
          const fetchedData = await getColorByExperimento(pallet.idPallets);
          const color = fetchedData.color;
          const estado = fetchedData.estado;
          return { ...pallet, color, estado };
        })
      );
      setPallets(updatedPallets);
    } catch (error) {
      console.error("Error fetching pallets:", error);
    }
  };

  useEffect(() => {
  const interval = setInterval(fetchPalletsAndSetColors, 5000);

  // Fetch initial pallets and set colors once after fetching
  fetchPalletsAndSetColors();

  return () => {
    clearInterval(interval);
  };
}, []);

useEffect(() => {
  const interval = setInterval(printStuff, 500);

  // Fetch initial pallets and set colors once after fetching
  printStuff();

  return () => {
    clearInterval(interval);
  };
}, [cassettes, almacenes, window.innerHeight, window.innerWidth]);

const printStuff = () => {
  // console.log(`The height is: ${window.innerHeight}, and the width is: ${window.innerWidth}`);
  // console.log("Cassettes:", cassettes, "Almacenes:", almacenes);
  //let cheight = (window.innerHeight - (59+78+50+150) - 150) / (cassettes.length*9);
  //let cwidth = (window.innerWidth - 150 - 150) / almacenes.length;
  //console.log("Height:", height);
  //console.log("Width:", width);
  let cheight = 0;
  let cwidth = 0;

  if (containerRef.current) {
    const { width, height } = containerRef.current.getBoundingClientRect();
    // Use the width and height values as needed
    // console.log("Height:", height);
    // console.log("Width:", width);

    //cheight = (height - (59+78+50+150) - 150) / (cassettes.length*9);
    //cheight = (height - (59+78+50+150) - 150) / 9;
    cheight = (window.innerHeight - (59+78+50+150) - 150) / (cassettes.length*9);
    cwidth = (width - 150 - 150) / almacenes.length;

    // console.log(`Calculated Height: ${cheight}. Calculated Width: ${cwidth}`);
  }

  if (cheight > (cwidth/9)) {
    // console.log('Caso alto');
    if(cwidth < 250){
        setPalletWidth(250);
    } else{
        setPalletWidth(cwidth);
    }
    cheight = cwidth *0.9689;
    if(cheight/9 < 30){
        setPalletHeight(30);
    } else{
        setPalletHeight(cheight/9);
    }
    //console.log(`This is the height: ${palletHeight}, and this is the width: ${palletWidth}`);
    var space = (200 / (almacenes.length*(1+(almacenes.length/10)))) * (1-((2000 -  window.innerWidth)/2000));
    setalmacenSpace(space);

  } else {
    // console.log('Caso ancho');
    if(cheight < 30){
        setPalletHeight(30);
    } else{
        setPalletHeight(cheight);
    }
    cwidth = cheight /0.9689;
    if(cwidth*9 < 250){
        setPalletWidth(250);
    } else{
        setPalletWidth(cwidth*9);
    }
    
    //console.log(`This is the height: ${palletHeight}, and this is the width: ${palletWidth}`);
    var space = (200 / almacenes.length)*(1-((2000 -  window.innerWidth)/2000));
    setalmacenSpace(space);
  }
};
  
  // ----------------------- PALLET SWITCHING ----------------------- //

  const handleDragStart = (event, pallet) => {
    //event.dataTransfer.setData("application/json", JSON.stringify(pallet));
    event.dataTransfer.setData("text/plain", pallet.idPallets);
    setDraggedPallet(pallet);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event, slot) => {
    event.preventDefault();
    setTargetSlot(slot);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
  
    if (draggedPallet && targetSlot) {
      const droppedPallet = draggedPallet;
      const droppedSlot = targetSlot;
  
      console.log("Dropped Pallet:", droppedPallet);
      console.log("Dropped Slot:", droppedSlot);
  
      const { almacenId, cassetteId, slotId } = droppedSlot;
  
      // Check if the dropped slot is empty or occupied by a pallet
      const droppedPalletIndex = pallets.findIndex(
        (pallet) =>
          pallet.localizacion[1] == almacenId &&
          pallet.localizacion[4] == cassetteId &&
          pallet.localizacion[7] == slotId
      );
  
      if (droppedPalletIndex !== -1) {
        // Slot is occupied by a pallet
        const droppedPallet = pallets[droppedPalletIndex];
        console.log("Pallet already present:", droppedPallet);
  
        if (draggedPallet.idPallets === droppedPallet.idPallets) {
          console.log("You are dropping the pallet in the same position");
        } else {
          if (draggedPallet.idPallets !== null && droppedPallet.idPallets !== null) {
            console.log("Perform pallet switching:", draggedPallet.idPallets, droppedPallet.idPallets);
  
            const switchUrl = `${window.location.protocol}//${window.location.hostname}:8000/local/switch_pallets/${draggedPallet.idPallets}/${droppedPallet.idPallets}`;
            //const switchUrl = `http://158.42.163.183:8000/local/switch_pallets/${draggedPallet.idPallets}/${droppedPallet.idPallets}`;
            //const switchUrl = `http://localhost:8000/local/switch_pallets/${draggedPallet.idPallets}/${droppedPallet.idPallets}`;
            try {
              console.log(switchUrl.toString());
              const switchResponse = await fetch(switchUrl);
              const switchData = await switchResponse.json();
              if (switchData.success) {
                console.log("Pallet switch successful");
                // Update the pallets state or perform any necessary UI updates
                fetchPalletsAndSetColors();
              } else {
                console.log("Pallet switch failed");
                // Handle the failure case
              }
            } catch (error) {
              console.error("Error switching pallets:", error);
              // Handle the error case
            }
          }
        }
      } else {
        // Slot is empty
        console.log("Empty slot");
      
        // Perform the logic to move the pallet to the empty position
        const moveUrl = `${window.location.protocol}//${window.location.hostname}:8000/local/move_pallet/`;
        //const moveUrl = `http://158.42.163.183:8000/local/move_pallet/`;
        //const moveUrl = `http://localhost:8000/local/move_pallet/`;
        
        try {
          const moveResponse = await fetch(moveUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pallet_id: draggedPallet.idPallets,
              new_position: `A${almacenId}-C${cassetteId}-P${slotId}`,
            }),
          });
      
          const moveData = await moveResponse.json();
          if (moveData.success) {
            console.log("Pallet move successful");
            // Update the pallets state or perform any necessary UI updates
            fetchPalletsAndSetColors();
          } else {
            console.log("Pallet move failed");
            // Handle the failure case
          }
        } catch (error) {
          console.error("Error moving pallet:", error);
          // Handle the error case
        }
      }
    }
  
    setDraggedPallet(null);
    setTargetSlot(null);
  };
      
  // ----------------------- PALLET SWITCHING ----------------------- //

  // ----------------------- FETCH PALLET ----------------------- //
  const fetchPallet = (id) => {
    async function fetchId() {
      fetch(`http://${window.location.hostname}:8000/local/distr_pallet/` + id, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setPlateData(data);
        });
    }

    fetchId();
  }
  // ----------------------- FETCH PALLET ----------------------- //

  // ----------------------- GET SENSORS ----------------------- //

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

  const setCollorPallet = (valueLetter) => {
    let auxLetter = valueLetter.toLowerCase();
    let strForSensor = "caset_" + auxLetter;
    if (sensors[strForSensor] == "True") {
      // console.log("verde que te quiero verde", sensors[strForSensor], strForSensor);
      return "4px solid rgba(29, 161, 73, 0.856)"
    }
    else {
      // console.log("ay rojo que te cojo", sensors[strForSensor], strForSensor);
      return "4px solid rgba(221, 71, 71, 0.856)"
    }

  };

  // ----------------------- GET SENSORS ----------------------- //

  return (
    
    <div className="App2">
      {openPlate && <CondPlate openPlate={openPlate} setOpenPlate={setOpenPlate} plateData={plateData} plateLocation={plateLocation}/>}
      <div className="pallet-experimentos-container">
        {experimentos.map((experimento) => (
          <div key={experimento.idExperimentos} className="experimento-table">
            <span className="experimento-cabecera">Experimento {experimento.nombreExperimento}</span>
            <div className="experimento-fila-color">
              <span className="span-fila-color">Color</span>
              <div
                className="experimento-color"
                style={{
                  marginTop: '3.9px',
                  width: '30px',
                  height: '10px',
                  backgroundColor: `${experimento.color}`,
                }}
              ></div>
            </div>
            <div className="experimento-select-estado">
              <select
                id={`experimento-estado-select-${experimento.idExperimentos}`}
                value={estadoExperimentos[experimento.idExperimentos]}
                onChange={(event) => handleEstadoSelect(event, experimento.idExperimentos)}
              >
                <option value="select" disabled>Select</option>
                <option value="cargado">Cargado</option>
                <option value="descargado">Descargado</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* DIALOG */}

      {dialog.isLoading && (
        <Dialog onDialog={areUSureExperiments} message={dialog.message} />
      )}

      <div className="pallet-layout-container" ref={containerRef}>
        {almacenes.map((almacen) => (
          <div key={almacen.id} className="almacen-container" style={{
            paddingLeft: `${almacenSpace}px`,
            paddingRight: `${almacenSpace}px`,
          }}>
            <h2 className="pallet-layout-header">Almacen: {almacenesNom[almacen.id]}</h2>
            <div className="pallet-layout">
              <div className="pallet-border-1">
              {cassettes.reverse().map((cassette) => (
                <div key={cassette.id} className="pallet-container" style={{border: `${setCollorPallet(almacenesNom[almacen.id])}`,}}>
                  <div className="pallet-border-1">
                  {slots
                    .filter((slot) => slot.cassetteId === cassette.id).reverse()
                    .map((slot) => {
                      const slotKey = getSlotKey(slot.cassetteId, slot.slotId);
                      const pallet = pallets.find(
                        (pallet) =>
                          pallet.localizacion[1] == almacen.id &&
                          pallet.localizacion[4] == cassette.id &&
                          pallet.localizacion[7] == slot.slotId
                      );
                      if (pallet) {
                        let estadoPallet = (pallet.estado == 'pendiente') ? pallet.estado : pallet.idPallets;
                        estadoPallet = (pallet.estado == 'error') ? 'ERROR' : estadoPallet;
                        //console.log(`From the return. This is the height: ${palletHeight}, and this is the width: ${palletWidth}`);
                        return (
                          <button
                            key={pallet.idPallets}
                            className="pallet"
                            style={{
                              width: `${palletWidth}px`,
                              height: `${palletHeight}px`,
                              backgroundColor: pallet.color,
                            }}
                            draggable
                            onDragStart={(event) => handleDragStart(event, pallet)}
                            onDragEnter={(event) => handleDragEnter(event, {almacenId: almacen.id, cassetteId: cassette.id, slotId: slot.slotId,})}
                            onDragOver={handleDragOver}
                            onDragLeave={() => setLeave(null)}
                            onDrop={handleDrop}
                            onDoubleClick={()=> {
                              fetchPallet(pallet.idPallets)
                              setTimeout(() => {
                                setOpenPlate(true);
                                setPlateLocation(`Cassette ${almacenesNom[almacen.id]} - Posición ${slot.slotId}`);
                              }, 75); // delay para que se recalcule antes de visualizar el componente
                            }}
                            
                          >
                            {`Pallet ${estadoPallet}, ${pallet.estado}`}
                          </button>
                        );
                      } else {
                        return (
                          <div
                            key={slotKey}
                            className="empty-slot"
                            onDragOver={handleDragOver}
                            onDragEnter={(event) => handleDragEnter(event, {almacenId: almacen.id, cassetteId: cassette.id, slotId: slot.slotId,})}
                            onDrop={handleDrop}
                          >
                            <button className="pallet" 
                            style={{
                              width: `${palletWidth}px`,
                              height: `${palletHeight}px`,
                            }}>
                              {`Vacío en ${almacen.id} - ${cassette.id} - ${slot.slotId}`}
                            </button>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
