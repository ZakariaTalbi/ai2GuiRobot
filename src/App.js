import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Camaras from "./pages/Camaras";
import Login from "./pages/Login";
import Sidebar from "./components/sidebar";
import Panel from "./pages/Panel";
import Lifespan from "./pages/lifespan1";
import LifespanR from "./pages/lifespanr";
import HealthspanR from "./pages/healthspanr";
import Visualizar from "./pages/Visualizar";
import Seleccionar from "./pages/SeleccionarPallet";
import Configuracion from "./pages/Configuracion";
import Nav from "./components/navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {

  const getAlarms = async () => {

    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/handle_alarm`);
      const data = await response.json();
      
      if (data.dato == 0) {
        console.log('Sin alarmas');
      } else {
        const confirmed = window.confirm('¿Desea archivar la alarma?')

        if (!confirmed) {
          //Do nothing (the message reappers as the alarm won't be acknowledged)
        } else {
          try {
            const responseFix = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/handle_alarm/`, { //Cuidado con la IP
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify('A'),
            });

          } catch (error) {
            console.error('Error acknowledging the alarm');
          }
        }

      }

    } catch (error) {
      console.error("Error fetching the alarm handling", error);
    }

  };

  useEffect(() => {
    const interval = setInterval(getAlarms, 5000);
  
    // Fetch initial pallets and set colors once after fetching
    getAlarms();
  
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <>
      {/* <AuthProvider> */}
      <Sidebar />
      <Nav />
      <div className="App">
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route element={<PrivateRoutes />}> */}
          <Route path="/" element={<Home />} />
          <Route path="control">
            <Route index element={<Panel />} />
            <Route path="lifespan-1" element={<Lifespan />} />
          </Route>
          <Route path="camaras" element={<Camaras />} />
          <Route path="visualizar">
            <Route index element={<Visualizar />} />
            <Route path="lifespan-r" element={<LifespanR />} />
            <Route path="healthspan-r" element={<HealthspanR />} />
          </Route>
          <Route path="/seleccionar" element={<Seleccionar />}/>
          <Route path="/configuracion" element={<Configuracion />}/>
          {/* </Route> */}
          
        </Routes>
      </div>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
