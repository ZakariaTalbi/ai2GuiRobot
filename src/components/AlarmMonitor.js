import React, { useContext } from "react";
import { AlarmContext } from "../context/AlarmContext";

const AlarmMonitor = () => {
  const { alarmState } = useContext(AlarmContext);

  const handleAlarm = () => {
    // Display a message or play a sound based on the alarm state
    if (alarmState === "active") {
      // Display an alert message or play a sound
      alert("ALARM!");
    }
  };

  // Call the handleAlarm function whenever the alarm state changes
  React.useEffect(() => {
    handleAlarm();
  }, [alarmState]);

  return null; // Or return a styled component to display an alarm indicator
};

export default AlarmMonitor;
