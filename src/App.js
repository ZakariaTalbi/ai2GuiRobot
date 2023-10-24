
import React, { useState, useEffect, } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Camaras from "./pages/Camaras";
import Login from "./pages/Login";
import Sidebar from "./components/sidebar";
import Dialog from "./components/dialog";
import AlarmDialog from "./components/AlarmDialog";
import Seleccionar from "./pages/SeleccionarPallet";
import Configuracion from "./pages/Configuracion";
import Technician from "./pages/Technician";
import Nav from "./components/navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
import TechnicianRoute from "./utils/TecnicianRoute"
import { AuthProvider } from "./context/AuthContext";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [criticalAlarm, setCriticalAlarm] = useState(false)
  const [criticalMessage, setCriticalMessage] = useState("EMERGENCIA. LLAME AL SERVICIO TÉCNICO")

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    index: "",
  });

  const getAlarms = async () => {

    // console.log(window.location.pathname)
    // console.log(window.location.pathname.includes('/login'))

    if(!window.location.pathname.includes('/login')){
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/handle_alarm`);
      const data = await response.json();
      // console.log(`Info de la alarma. Data: ${data.dato}. Alarma: ${data.alarma} `);
      const contenidoAlarma = JSON.parse(data.alarma);
      // console.log(`Tipo de alarma: ${contenidoAlarma.critical}`);
      if (data.dato == 0) {
        console.log('Sin alarmas');
      } else {
        if (contenidoAlarma.critical == 'False'){
          let alarmMessage1 = "NO ARCHIVE LA ALARMA HASTA SOLUCIONAR EL PROBLEMA.\n";
          let alarmMessage2 = "Alarma: " + contenidoAlarma.message;
          let alarmMessage = alarmMessage1 + alarmMessage2;
          setDialog({
            message: alarmMessage,
            isLoading: true,
            index: 0,
          });
        } else {
          let critMsg = criticalMessage + ". Alarma: " + contenidoAlarma.message;
          setCriticalMessage(critMsg);
          setTimeout(() => {
            setCriticalAlarm(true);
          }, 75);

          while (criticalAlarm != false) {
            //Do nothing and wait a bit for the user to leave before acknowledging the alarm
            setTimeout(() => {
              console.error("ALARMA CRÍTICA");
            }, 5000);
          }
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
  }

  };

  useEffect(() => {
    const interval = setInterval(getAlarms, 5000);
  
    getAlarms();
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  const areUSureAcknowledge = async (choose) => {
    if (choose) {
      setDialog("", false, "");
      // console.log('Acknowledged');
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
    } else {
      setDialog("", false, "");
    }
  };

  const setIdentifiedUser = () => {
    console.log('About to set to true the authentication');
    setIsAuthenticated(true);
  };

  return (
    <>
      <AuthProvider>
        <Sidebar />
        <Nav />
        <div className="App">
        {criticalAlarm && <AlarmDialog criticalAlarm={criticalAlarm} setCriticalAlarm={setCriticalAlarm} message={criticalMessage}/>}
          <Routes>
            <Route path="/login" element={<Login setIdentifiedUser={setIdentifiedUser} />} />
            <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Home />} />
              <Route path="camaras" element={<Camaras />} />
              <Route path="/select" element={<Seleccionar />} />
              <Route path="/config" element={<Configuracion />} />
              <Route element={<TechnicianRoute />}>
                <Route path="/technician" element={<Technician />} />
              </Route>
            </Route>
          </Routes>
        </div>
        {/* DIALOG */}

      {dialog.isLoading && (
        <Dialog onDialog={areUSureAcknowledge} message={dialog.message} />
      )}
      </AuthProvider>
    </>
  );
}

export default App;
