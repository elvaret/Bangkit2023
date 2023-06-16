import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./WebcamComponent.css";
import heartSVG from "./content/heart.svg";
import oblongSVG from "./content/oblong.svg";
import ovalSVG from "./content/oval.svg";
import roundSVG from "./content/round.svg";
import squareSVG from "./content/square.svg";

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
    const imageFile = new File([blob], "image.jpg");

    setPredictionResult(null);
    predictImage(imageFile);
  };

  const predictImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        "https://glassfitprediction-slnmoy67ka-et.a.run.app/predict_face",
        formData
      );
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
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const renderPredictionResult = () => {
    if (predictionResult && isCameraOpen) {
      let faceImage;
      switch (predictionResult.predictedClass) {
        case "Heart":
          faceImage = <img className="hasil" src={heartSVG} alt="Heart" />;
          break;
        case "Oblong":
          faceImage = <img className="hasil" src={oblongSVG} alt="Oblong" />;
          break;
        case "Oval":
          faceImage = <img className="hasil" src={ovalSVG} alt="Oval" />;
          break;
        case "Round":
          faceImage = <img className="hasil" src={roundSVG} alt="Round" />;
          break;
        case "Square":
          faceImage = <img className="hasil" src={squareSVG} alt="Square" />;
          break;
        default:
          faceImage = null;
          break;
      }
  
      if (faceImage) {
        return (
          <div className="predict">
            {faceImage}
          </div>
        );
      }
    }
  
    return null;
  };

  return (
    <div className="container-product">
      {isCameraOpen ? (
        <div className="container-cam">
          <Webcam className="webcam" ref={webcamRef} />
          <div className="button">
            <button className="take-pic" onClick={captureImage}>
              Ambil Gambar
            </button>
            <button className="close-cam" onClick={closeCamera}>
              Tutup Kamera
            </button>
          </div>
        </div>
      ) : (
        <button className="open-cam" onClick={openCamera}>
          Buka Kamera
        </button>
      )}

      {renderPredictionResult()}
    </div>
  );
};

export default WebcamComponent;