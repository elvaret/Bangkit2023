import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

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

      const response = await axios.post("http://localhost:5000/predict_face", formData);
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
    <div>
      {isCameraOpen ? (
        <div>
          <Webcam ref={webcamRef} />
          <button onClick={closeCamera}>Tutup Kamera</button>
          <button onClick={captureImage}>Ambil Gambar</button>
        </div>
      ) : (
        <button onClick={openCamera}>Buka Kamera</button>
      )}

      {predictionResult && isCameraOpen && (
        <div>
          <h3>Hasil Prediksi:</h3>
          <p>Your Face is: {predictionResult.predictedClass}</p>
          {/* <p>Probabilities: {predictionResult.probabilities}</p> */}
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;