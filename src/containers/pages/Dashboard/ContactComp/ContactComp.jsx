import React from "react";
import '../Dashboard.css';
import ifaAva from '../img/ava-ifa.jpg';
import ibnuAva from '../img/ava-ibnu.jpg';
import elvaret from '../img/elvaret.jpg';
import fia from '../img/alifia.jpg';
import bestin from '../img/bestin.jpg';

const ContactComp = () => {
    return (
        <div>
            <section className="contact" id="contact">
          <h1 className="judulh1">CONTACT <br />US</h1>
          <div className="container-card">
            <div className="card-contact">
              <img src={fia} alt="inu" />
              <h1>Alifia Salma N.R.</h1>
              <p>📧alifiasalma95@gmail.com</p>
            </div>
            <div className="card-contact">
              <img src={bestin} alt="inu" />
              <h1>Bestin Yap Fortuna</h1>
              <p>📧bestinyap05@gmail.com</p>
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
              <p>📧ifaaput@gmail.com</p>
            </div>
          </div>
        </section>
        <footer>Made by 💌 ©️ 2023 Team GlassFIT Bangkit</footer>
        </div>
    )
}


export default ContactComp;