import React from "react";
import "./dialog.css";

const Dialog = ({ message, onDialog }) => {
  return (
    <div className="outter-div">
      <div className="dialog-div" style={{width: "510px", height: "200px"}}>
        <span>{message}</span>
        <div>
          <br></br>
          <span style={{paddingBottom: "20px"}}>¿Está seguro?</span>
        </div>
        <div>
          <button onClick={() => onDialog(true)}>Sí</button>
          <button onClick={() => onDialog(false)}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
