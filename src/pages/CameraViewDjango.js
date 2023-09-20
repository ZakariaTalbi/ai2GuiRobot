import React, { useEffect, useState } from "react";

const ImageViewer = ({ camera }) => {
  const [imageSrc, setImageSrc] = useState("");

  const fetchImage = async () => {
    try {
      //const response = await fetch(`http://192.168.1.118:8000/try/image_view/${camera}`); change to this when we have multiple cameras
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/local/image_view/${camera}`);
      const data = await response.json();
      setImageSrc(`data:image/jpeg;base64, ${data.image_data_encoded}`);
    } catch (error) {
      //console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (camera) {
      const intervalId = setInterval(fetchImage, 400);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [camera]);

  return <img src={imageSrc} alt="No Received Image" />;
};

export default ImageViewer;
