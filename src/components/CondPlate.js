import { React, useState, useEffect, useRef } from "react";
import Gradient from "javascript-color-gradient";

import "./CondPlate.css";

const CondPlate = ({openPlate, setOpenPlate, plateData}) => {
  const [numCond, setNumCond] = useState(1);
  const [filas, setFilas] = useState(1);
  const [columnas, setColumnas] = useState(1);
  const [width, setWidth] = useState("50px");
  const [height, setHeight] = useState("50px");
  const [colorGradient, setColorGradient] = useState([]);
  const [condArray, setCondArray] = useState([[]])

  const condPlateRef = useRef(null);

  const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


  useEffect(() => {
    console.log('=========== USE EFFECT')

    const temp_condArray = {...plateData['condArray']}
    const temp_filas = plateData['filas']
    console.log('filas', temp_filas)
    const temp_col = plateData['columnas']
    console.log('col', temp_col)
    const temp_nCond = plateData['cond'].length
    console.log('nCond', temp_nCond)

    setCondArray(temp_condArray)
    setFilas(temp_filas)
    setColumnas(temp_col)
    setNumCond(temp_nCond)

    if (temp_filas * temp_col < 3) {
      setWidth("150px");
      setHeight("150px");
    } else if (temp_filas * temp_col < 6) {
      setWidth("100px");
      setHeight("100px");
    } else if (temp_filas * temp_col < 16) {
      setWidth("75px");
      setHeight("75px");
    } else if (temp_filas * temp_col < 74 && temp_filas < 8) {
      setWidth("50px");
      setHeight("50px");
    } else if (temp_filas < 10 && temp_col < 15) {
      setWidth("40px");
      setHeight("40px");
    } else {
      setWidth("30px");
      setHeight("30px");
    }

    setColorGradient(
      new Gradient()
        .setColorGradient("#027df7", "#dcecfc")
        .setMidpoint(
          temp_nCond + 2
        )
        .getColors()
    );

    console.log("===========")
  }, [plateData]);

  //const condArray = [[1, 1], [2, 2]]

    // Function to close the CondPlate
    const closeCondPlate = () => {
      setOpenPlate(false);
    };
  
    // Event listener for clicks outside CondPlate
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (condPlateRef.current && !condPlateRef.current.contains(event.target)) {
          closeCondPlate();
        }
      };
  
      // Attach the event listener when CondPlate is open
      if (openPlate) {
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
      <div className="dialog-div" style={{width: "810px"}} ref={condPlateRef}>
      <div style={{ display: "flex" }} >
          <div className="select-cond-row" >
            {Array.from({ length: numCond }, (_, i) => (
              <div
                key={`cond-${i}`}
                className="cond-element"
              >
                <div
                  className="cond-element-color"
                  style={{ backgroundColor: colorGradient[i] || "white"}}
                />

                {i + 1}{`: ${plateData['cond'][i]}`}
              </div>
            ))}
          </div>
        </div>
        <br />

      <div className="plate-div">
            <div
              className="plate-header"
              style={{
                left: "11px",
                top: "-1px",
                position: "relative",
                display: "flex",
                justifyContent: "space-around",
                width: "579.6px",
              }}
            >
              {columnas > 1 &&
                Array.from({ length: columnas }, (_, i) => {
                  return (
                    <span key={i + 1} style={{ width: width }}>
                      {i + 1}
                    </span>
                  );
                })}
            </div>
            {Array.from({ length: filas }, (_, i) => (
              <div
                key={`fila-${i}`}
                className="plate-fila"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {filas > 1 && (
                  <div
                    className="plate-row-header"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ userSelect: "none" }}>{ABC[i]}</span>
                  </div>
                )}
                {Array.from({ length: columnas }, (_, j) => {
                  const key = `columna-${j}`;
                  return (
                    <div
                      key={key}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <div
                        key={key}
                        className="individual-div"
                        style={{
                          width: width,
                          height: height,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: condArray[i] && condArray[i][j]
                          ? colorGradient[parseFloat(condArray[i][j])]
                          : "rgb(223, 223, 223)",
                        }}
                      >
                        <span
                          style={{
                            fontStyle: "italic",
                            color: "white",
                            userSelect: "none",
                          }}
                        >
                          {condArray[i] && condArray[i][j] ? condArray[i][j] : ''}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {filas > 1 && (
                  <div
                    className="plate-row-header"
                    style={{
                      width: "10.21px",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default CondPlate;