import { React, useState, useEffect, useRef } from "react";
// import Gradient from "javascript-color-gradient";

import "./CondPlate.css";

const AlarmDialog = ({criticalAlarm, setCriticalAlarm, message}) => {

  const condPlateRef = useRef(null);

  const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


  //const condArray = [[1, 1], [2, 2]]

    // Function to close the CondPlate
    const closeCondPlate = () => {
      setCriticalAlarm(false);
    };
  
    // Event listener for clicks outside CondPlate
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (condPlateRef.current && !condPlateRef.current.contains(event.target)) {
          closeCondPlate();
        }
      };
  
      // Attach the event listener when CondPlate is open
      if (criticalAlarm) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        // Remove the event listener when CondPlate is closed
        document.removeEventListener('mousedown', handleClickOutside);
      }
  
      // Clean up the event listener on component unmount
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);


  return (
    <div className="outter-div">
      <div className="dialog-div" style={{width: "510px", height: "150px"}} ref={condPlateRef}>
      <span className="dialog-span">{message}</span>
      </div>

    </div>
  );
};

export default AlarmDialog;
