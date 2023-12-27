import React, { useState, useEffect, } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import "./AlarmPage.css"

const AlarmPage = () => {
  const [alarms, setAlarms] = useState(null);
  let { user } = useContext(AuthContext);

  const acknowledgeAlarm = async (valor) => {

    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/handle_alarm/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ valor }),
    });
    if (response.ok) {
      // Update was successful
      // Do something, e.g., display a success message
    } else {
      // Update failed
      // Do something, e.g., display an error message
    }
      // console.log(`Este es el valor: ${valor}`);
      window.location.reload(false);
    } catch (error) {
      setAlarms(null);
      console.error(error);
    }

  };

  const getAlarms = async () => {

    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/handle_alarm`);
      const data = await response.json();
      if (data.dato == 0) {
        // console.log('Sin alarmas');
        setAlarms(null);
      } else {
          let my_val = data.alarma.map((alarmString) => (JSON.parse(alarmString)));
          const boolValue = JSON.parse(my_val[0].critical.toLowerCase());
          console.log(my_val);
          let aux1 = user.permission | (!boolValue);
          setAlarms(my_val);
      }

    } catch (error) {
        // setAlarms(null);
        console.error("Error fetching the alarm handling", error);
    }
    

  };

  useEffect(() => {
    const interval = setInterval(getAlarms, 5000);
  
    getAlarms();
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="alarm-page">
      <div className="alarm-header">Gestor de alarmas</div>
      <div>
        <h2 className="alarm-table-header">Lista de Alarmas</h2>
        {alarms ? (
          <ul className="alarm-table">
              <li className="alarm-list" key="-1">
                <p className="alarm-id">ID</p>
                <p className="alarm-message">Mensaje</p>
                <p className="alarm-critical">Criticidad</p>
                <p className="alarm-state">Estado</p>
                <p className="alarm-acknowledge">Archivar</p>
              </li>
            {alarms.map((alarm, index) => (
              <li className="alarm-list" key={index} style={{
                backgroundColor: JSON.parse(alarm.critical.toLowerCase())
                  ? '#E9644C'
                  : '#F59453',
                
              }} >
                <p className="alarm-id">{alarm.id}</p>
                <p className="alarm-message">{alarm.message}</p>
                <p className="alarm-critical">{alarm.critical}</p>
                <p className="alarm-state">{alarm.alm_state}</p>
                {(user.permission | (!JSON.parse(alarm.critical.toLowerCase()))) ? <div className="alarm-acknowledge"><button className="alarm-acknowledge-button" onClick={() => acknowledgeAlarm(alarm.id)}>Archivar</button></div> : <div className="alarm-acknowledge"><span className="alarm-acknowledge-p">LLAME AL SERVICIO TÉCNICO</span></div>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No alarms found at the moment</p>
        )}
      </div>
    </div>
  );
};

export default AlarmPage;
