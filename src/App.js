
import React, { useState, useEffect, } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Camaras from "./pages/Camaras";
import Login from "./pages/Login";
import Sidebar from "./components/sidebar";
import Dialog from "./components/dialog";
import AlarmDialog from "./components/AlarmDialog";
import Seleccionar from "./pages/SeleccionarPallet";
import Configuracion from "./pages/Configuracion";
import Technician from "./pages/Technician";
import AlarmPage from "./pages/AlarmPage";
import Nav from "./components/navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
import TechnicianRoute from "./utils/TecnicianRoute"
import { AuthProvider } from "./context/AuthContext";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [criticalAlarm, setCriticalAlarm] = useState(false);
  const [criticalMessage, setCriticalMessage] = useState("EMERGENCIA. LLAME AL SERVICIO TÉCNICO")

  const navigate = useNavigate();
  const location = useLocation();
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
        // console.log(`Tipo de alarma: ${contenidoAlarma.critical}`);
        // console.log(`Alarma: ${data.alarma[1]}`);
        // const contenidoAlarma = JSON.parse(data.alarma[0]);
        if (data.dato == 0) {
          // console.log('Sin alarmas');
          setDialog("", false, "");
        } else {
          if (!window.location.pathname.includes('/alarms')){
            let alarmMessage = "Tiene una alarma o alarmas pendiente en el sistema.\n¿Desea navegar al gestor de alarmas\n?";
            setDialog({
              message: alarmMessage,
              isLoading: true,
              index: 0,
            });
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
      // Navigate("/alarms");
      setDialog("", false, "");
      // console.log('Acknowledged');
      try {
            // const responseFix = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/handle_alarm/`, { //Cuidado con la IP
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify('A'),
            // });
            navigate('/alarms', { replace: true });

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
              <Route path="/alarms" element={<AlarmPage />} />
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
