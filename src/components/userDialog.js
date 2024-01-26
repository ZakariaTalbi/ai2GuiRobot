import React, { useState } from "react";
import "./dialog.css";

const UserDialog = ({ message, onDialog }) => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleInputUser = (event) => {
    setUser(event.target.value); 
 
  };
  const handleInputPassword = (event) => {
    setPassword(event.target.value); 
 
  };

  return (
    <div className="outter-div">
      <div className="dialog-div" style={{width: "510px", height: "200px"}}>
        {/* <span>{message}</span> */}
        <div style={{justifyContent: 'left', }}>
          <br></br>
          {/* <span style={{paddingBottom: "20px"}}>¿Está seguro?</span> */}
          <div>
            <span style={{paddingRight: '20px',}}>usuario</span>
            <input type="text" value={user} placeholder={"usuario"} onChange={handleInputUser} />
          </div>
          <br></br>
          <div style={{paddingBottom: '15px',}}>
            <span style={{paddingRight: '20px',}}>contraseña</span>
            <input type="password" value={password} placeholder={"contraseña"} onChange={handleInputPassword} />
          </div>
        </div>
        <div>
          <button style={{width: '100px', marginRight: '20px', }} onClick={() => onDialog(true, user, password)}>Confirmar</button>
          <button style={{width: '100px',}} onClick={() => onDialog(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default UserDialog;
