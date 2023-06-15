import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import './WebcamComponent.css';

const WebcamComponent = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const webcamRef = useRef(null);

  const openCamera = () => {
    setIsCameraOpen(true);
    setPredictionResult(null); // Menghapus hasil prediksi saat membuka kamera kembali
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    setPredictionResult(null); // Menghapus hasil prediksi saat menutup kamera
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURLtoBlob(imageSrc);
    const imageFile = new File([blob], 'image.jpg');

    setPredictionResult(null);
    predictImage(imageFile);
  };

  const predictImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axios.post("https://glassfitprediction-slnmoy67ka-et.a.run.app/predict_face", formData);
      const data = response.data;
      const predictedClass = data.predicted_class;
      const probabilities = data.probabilities;

      setPredictionResult({
        predictedClass,
        probabilities,
      });
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className="container">
      {isCameraOpen ? (
        <div className="container-cam">
          <Webcam 
          className="webcam"
          ref={webcamRef} />
          <div className="button">
          <button className="take-pic" onClick={captureImage}>Ambil Gambar</button>
          <button className="close-cam" onClick={closeCamera}>Tutup Kamera</button>
          </div>
        </div>
      ) : (
        <button className="open-cam" onClick={openCamera}>Buka Kamera</button>
      )}

      {predictionResult && isCameraOpen && (
        <div className="predict">
          <h3>Hasil Prediksi:</h3>
          <p>Your Face is: {predictionResult.predictedClass}</p>
          {/* <p>Probabilities: {predictionResult.probabilities}</p> */}
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;