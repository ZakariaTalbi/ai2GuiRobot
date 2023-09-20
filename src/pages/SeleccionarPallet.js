
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";
import "./PalletLayout.css";

const Home = () => {
  const [almacenes, setAlmacenes] = useState([]);
  const [cassettes, setCassettes] = useState([]);
  const [pallets, setPallets] = useState([]);

  const [dispositivo, setDispositivo] = useState("");

  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchDispositivo();
  }, []);

  const fetchDispositivo = async () => {
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/dispositivos/`);
      //const response = await fetch("http://localhost:8000/local/dispositivos/");
      const data = await response.json();
      setDispositivo(data[0].Modelo);
      console.log(data[0].Modelo, data[0].nAlmacenes, data[0].nCassettes);
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
      //const response = await fetch(`http://localhost:8000/local/get_color/${idPallets}/`);
      const data = await response.json();
      //console.log(`Esta es la info: ${data.color}`);
      return data.color;
    } catch (error) {
      console.error("Error fetching color by idPallets:", error);
      return "#747478"; // Return a default color in case of an error
    }
  };

  const fetchPalletsAndSetColors = async () => {
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/pallets`);
      //const response = await fetch("http://localhost:8000/local/pallets");
      const data = await response.json();
      const updatedPallets = await Promise.all(
        data.map(async (pallet) => {
          const color = await getColorByExperimento(pallet.idPallets);
          return { ...pallet, color };
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

  // Pallet Selection

  const navigate = useNavigate();

  const handlePalletSelect = (palletId) => {
    console.log("Selected Pallet ID:", palletId);
    navigate("/camaras", { state: { selectedPalletId: palletId } }); // Pass selectedPalletId as state
  };

  const handleDoubleClick = (idPallet) => {
    console.log(`Double-clicked on pallet with ID: ${idPallet}`);
    handlePalletSelect(idPallet);
  };
  
  return (
    <div className="App2">
      <div style={{ marginTop: "5px", marginBottom: "1.2em", justifyContent: "center", display: "flex", fontSize: "20px"}}>
        Seleccione Pallet
      </div>
      <div className="pallet-layout-container">
        {almacenes.map((almacen) => (
          <div key={almacen.id} className="almacen-container">
            <h2 className="pallet-layout-header">Almacen: {almacen.id}</h2>
            <div className="pallet-layout">
              {cassettes.map((cassette) => (
                <div key={cassette.id} className="pallet-container">
                  {slots
                    .filter((slot) => slot.cassetteId === cassette.id)
                    .map((slot) => {
                      const slotKey = getSlotKey(slot.cassetteId, slot.slotId);
                      const pallet = pallets.find(
                        (pallet) =>
                          pallet.localizacion[1] == almacen.id &&
                          pallet.localizacion[4] == cassette.id &&
                          pallet.localizacion[7] == slot.slotId
                      );
                      if (pallet) {
                        return (
                          <button
                            key={pallet.id}
                            className="pallet"
                            style={{
                              backgroundColor: pallet.color,
                            }}
                            onDoubleClick={() => handleDoubleClick(pallet.idPallets)}
                          >
                            {`Pallet ${pallet.idPallets}`}
                          </button>
                        );
                      } else {
                        return (
                          <div
                            key={slotKey}
                            className="empty-slot"
                          >
                            <button className="pallet">
                              {`Vacío en ${almacen.id} - ${cassette.id} - ${slot.slotId}`}
                            </button>
                          </div>
                        );
                      }
                    })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
