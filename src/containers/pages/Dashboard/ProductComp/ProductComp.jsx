import React from "react";
import '../Dashboard.css';
import lightIcon from '../img/light.svg';
import kameraIcon from '../img/kamera.svg';
import mapsIcon from '../img/maps.svg';

const ProductComp = () => {
    return(
        <div>
            <section className='product' id='product'>
          <div className="product-short">
            <div className="card" id="tips">
              <h1>Tips &amp; Tricks</h1>
              <img src={lightIcon} alt="lampu" />
              <p>Give you some tips &amp; tricks about glasses</p>
            </div>
            <div className="card kamera" id="faceshape">
              <h1>Faceshape</h1>
              <img src={kameraIcon} alt="kamera" />
              <p>Use camera to see your faceshape and you get your recommendation type of glasses that fit with your face</p>
            </div>
            <div className="card" id="maps">
              <h1>Maps</h1>
              <img src={mapsIcon} alt="maps" />
              <p>Give you recommendation optics and glasses shops around you</p>
            </div>
          </div>
          <div className="tips" id="tips">
            <h1 className="tips-h1">Tips &amp; Trick</h1>
            <div className="container-card">
              <div className="card-tips">
                <h1>Tips Tampil Percaya Diri Dengan Kacamata</h1>
                <a href="https://optikjoy.com/tips-tampil-percaya-diri-dengan-kacamata/">Detail</a>
              </div>
              <div className="card-tips">
                <h1>Tips Sebelum Membeli Kacamata</h1>
                <a href="https://optikjoy.com/tips-sebelum-membeli-kacamata/">Detail</a>
              </div>
              <div className="card-tips">
                <h1>Tips Mempunyai Mata Sehat dan Terhindar Dari Mata Minus</h1>
                <a href="https://optikjoy.com/hal-yang-harus-dihindari-agar-mata-terhindar-dari-minus/">Detail</a>
              </div>
            </div>
          </div>
          <div className="faceshape" id="faceshape">
            <h1>Faceshape</h1>
          </div>
          <div className="maps" id="maps">
          <h1>Maps</h1>
          <MapComp />
        </div>
      </section>
      <br></br>
        </div>
    )
}

export default ProductComp;
