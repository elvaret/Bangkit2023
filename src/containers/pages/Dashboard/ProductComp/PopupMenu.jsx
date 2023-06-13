import React, { useState } from 'react';
import './PopupMenu.css';

const PopupMenu = () => {
  const [stream, setStream] = useState(null);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
    } catch (error) {
      console.log('Gagal mendapatkan akses kamera:', error);
    }
  };

  const closeCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="popup">
      {stream ? (
        <video
          srcObject={stream}
          autoPlay
        />
      ) : (
        <button onClick={openCamera}>Buka Kamera</button>
      )}
      <button onClick={closeCamera}>Tutup Kamera</button>
    </div>
  );
};

export default PopupMenu;