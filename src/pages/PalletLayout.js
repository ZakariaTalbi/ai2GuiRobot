import React, { useState, useEffect } from 'react';
import './PalletLayout.css';

const PalletLayout = ({ almacen }) => {
  const [pallets, setPallets] = useState([]);
  const targetWidth = 700; // Adjust the target width as needed
  const [draggedPalletId, setDraggedPalletId] = useState(null);
  const [targetPalletId, setTargetPalletId] = useState(null);

  const fetchPallets = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/palletsAlmacen/${almacen}/`);
      const data = await response.json();
      setPallets(data);
    } catch (error) {
      console.error('Error fetching pallets:', error);
    }
  };

  useEffect(() => {
    fetchPallets();

    const refreshInterval = 15000; // 15 seconds
    const intervalId = setInterval(fetchPallets, refreshInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const maxPlacas = 63;
  const palletsPerContainer = Math.ceil(pallets.length / 9);
  const containerWidth = 200; // Adjust the width as needed
  const palletsWidth = containerWidth;
  let palletsHeight = (targetWidth / containerWidth) * 1.7 * (maxPlacas / pallets.length);

  if (palletsHeight > 50) {
    palletsHeight = 35;
  }

  const handleDoubleClick = async (idPallet) => {
    console.log(`Double-clicked on pallet with ID: ${idPallet}`);

    try {
      const response = await fetch(`http://localhost:8000/api/pallets/${idPallet}/`);
      const data = await response.json();
      console.log('Pallet information:', data);
      // Add your desired logic here to display the pallet information
    } catch (error) {
      console.error('Error fetching pallet information:', error);
    }
  };

  const handleDragStart = (event, idPallet) => {
    event.dataTransfer.setData('text/plain', idPallet);
    setDraggedPalletId(idPallet);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event, idPallet) => {
    event.preventDefault();
    setTargetPalletId(idPallet);
  };

  const handleDrop = async (event, targetPalletId) => {
    event.preventDefault();
  
    if (draggedPalletId !== null && targetPalletId !== null) {
      console.log('Perform pallet switching:', draggedPalletId, targetPalletId);
  
      // Make a request to the DRF view to handle the switch
      const url = `http://localhost:8000/switch_pallets/${draggedPalletId}/${targetPalletId}/`;
      try {
        console.log(url.toString());
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          console.log('Pallet switch successful');
          // Update the pallets in the state based on the response
          const updatedPallets = pallets.map((pallet) => {
            if (pallet.id_pallets_key === draggedPalletId) {
              return { ...pallet, idExperimentos: data.dragged_pallet.idExperimentos };
            } else if (pallet.id_pallets_key === targetPalletId) {
              return { ...pallet, idExperimentos: data.target_pallet.idExperimentos };
            }
            return pallet;
          });
          setPallets(updatedPallets);
        } else {
          console.log('Pallet switch failed:', data.message);
        }
      } catch (error) {
        console.error('Error occurred during pallet switch:', error);
      }
    }
  
    setDraggedPalletId(null);
    setTargetPalletId(null);
  };  

  const handlePalletClick = (event, idPallet) => {
    if (event.shiftKey) {
      // If shift key is pressed, add or remove the pallet ID from selectedPalletIds
      console.log('Shift key pressed');
    } else {
      // If shift key is not pressed, replace the selectedPalletIds with the clicked pallet ID
      console.log('Shift key not pressed');
    }
  };

  const isPalletDragged = (id_pallets_key) => draggedPalletId === id_pallets_key;
  const isPalletSelected = (id_pallets_key) => false; // Change this logic as per your requirements

  return (
    <div className="pallet-layout">
      {Array.from({ length: palletsPerContainer }).map((_, containerIndex) => (
        <div key={containerIndex} className="pallet-container">
          {pallets
            .slice(containerIndex * 9, (containerIndex + 1) * 9)
            .map((pallet, index) => (
              <button
                key={pallet.id_pallets_key}
                className={`pallet ${isPalletDragged(pallet.id_pallets_key) ? 'dragged' : ''} ${
                  isPalletSelected(pallet.id_pallets_key) ? 'selected' : ''
                }`}
                draggable="true"
                onDragStart={(event) => handleDragStart(event, pallet.id_pallets_key)}
                onDragEnter={(event) => handleDragEnter(event, pallet.id_pallets_key)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, pallet.id_pallets_key)}
                onClick={(event) => handlePalletClick(event, pallet.id_pallets_key)}
                onDoubleClick={() => handleDoubleClick(pallet.id_pallets_key)}
                style={{
                  width: `${palletsWidth}px`,
                  height: `${palletsHeight}px`,
                  backgroundColor: getColorByExperimento(pallet.idExperimentos),
                }}
              >
              </button>
            ))}
        </div>
      ))}
    </div>
  );
};

const getColorByExperimento = (idExperimentos) => {
  // Define the color mapping based on the experimento ID
  // Modify this function as per your specific color requirements
  if (idExperimentos === 1) {
    return '#fff88e';
  } else if (idExperimentos === 2) {
    return '#c7f4f7';
  } else if (idExperimentos === 3) {
    return '#c7f7d0';
  } else {
    return '#e4e4e4';
  }
};

export default PalletLayout;
