import React from "react";
import '../Dashboard.css';
import profileIcon from '../img/icon-profile.png';
import ifaAva from '../img/ava-ifa.jpg';
import ibnuAva from '../img/ava-ibnu.jpg';
import elvaret from '../img/elvaret.jpg';

const ContactComp = () => {
    return (
        <div>
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
              <img src={elvaret} alt="inu" />
              <h1>Elvaret</h1>
              <p>📧 elvaretharefa@gmail.com</p>
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
    )
}


export default ContactComp;