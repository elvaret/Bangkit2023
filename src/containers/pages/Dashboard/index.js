import React, { Component } from 'react';
import logo from './img/logo.svg';
import lightIcon from './img/light.svg';
import kameraIcon from './img/kamera.svg';
import mapsIcon from './img/maps.svg';
import profileIcon from './img/icon-profile.png';
import ibnuAva from './img/ava-ibnu.jpg';
import ifaAva from './img/ava-ifa.jpg';
import './style.css'; 

class Dashboard extends Component {
  render() {
    return (
      <div>
        <nav>
          <img src={logo} style={{ width: '70px', height: 'auto' }} alt="" />
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#product">Product</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button id="logout">Logout</button>
        </nav>

        <section className="home" id="home">
          <div className="container">
            <h1>GlassFIT</h1>
            <h2>Find Your Perfect Frame</h2>
            <p>Get your perfect frame by initializing your face shape and finding the nearest glasses shops around your location!</p>
            <button><a href="#about">Get Started</a></button>
          </div>
        </section>

        <section className="about" id="about">
          <div className="main-container">
            <div className="container-content">
              <h1>About</h1>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur cumque cum totam saepe itaque nihil vel culpa ratione iure, rerum magnam corrupti facere minima voluptates accusamus ullam asperiores autem odit quod laudantium incidunt molestias. Odio quam delectus quis illo rerum quo similique quidem nam sit consectetur? Ad ipsa dolorem ex tempore repudiandae sapiente dolore molestias odit a optio doloribus facilis quibusdam eligendi doloremque quo, perferendis illum ratione voluptatibus, accusamus error non quia. Minus vel quasi ut ipsa, distinctio omnis perferendis delectus, sapiente dolores, laborum officiis optio nisi suscipit odit. Ipsa illo quis aliquid nulla! Rem tempora beatae laboriosam assumenda asperiores.</p>
            </div>
          </div>
        </section>

        <section className="product" id="product">
          <div className="product-short">
            <div className="card overlay" id="tips">
              <h1>Tips &amp; Tricks</h1>
              <img src={lightIcon} alt="lampu" />
              <p>Give you some tips &amp; tricks about glasses</p>
            </div>
            <div className="card kamera overlay" id="faceshape">
              <h1>Faceshape</h1>
              <img src={kameraIcon} alt="kamera" />
              <p>Use camera to see your faceshape and you get your recommendation type of glasses that fit with your face</p>
            </div>
            <div className="card overlay" id="maps">
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
          </div>
        </section>

        <section className="contact" id="contact">
          <h1 className="judulh1">CONTACT <br />US</h1>
          <div className="container-card">
            <div className="card-contact">
              <img src={profileIcon} alt="inu" />
              <h1>Alifia Salma N.R.</h1>
              <p>📧</p>
            </div>
            <div className="card-contact">
              <img src={profileIcon} alt="inu" />
              <h1>Bestin Yap Fortuna</h1>
              <p>📧</p>
            </div>
            <div className="card-contact">
              <img src={profileIcon} alt="inu" />
              <h1>Elvaret</h1>
              <p>📧</p>
            </div>
            <div className="card-contact">
              <img src={ibnuAva} alt="inu" />
              <h1>Ibnu Bayhaqi</h1>
              <p>📧 bayhaqiibnu8@gmail.com</p>
            </div>
            <div className="card-contact">
              <img src={ifaAva} alt="ifa" />
              <h1>Amalia Arifah P.S.</h1>
              <p>📧ifasopyan18@gmail.com</p>
            </div>
          </div>
        </section>
        <footer>Made by 💌 ©️ 2023 Team GlassFIT Bangkit</footer>
      </div>
    );
  }
}

export default Dashboard;