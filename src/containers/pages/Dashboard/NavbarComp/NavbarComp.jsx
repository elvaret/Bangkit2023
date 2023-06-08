import React from "react";
import './NavbarComp.css';
import logo from '../img/logo.svg';

const NavbarComp = () => {
    return(
        <div>
            <nav className='navbar'>
          <img src={logo} alt="" />
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#product">Product</a></li>
            <li><a href="#contact">Contact</a></li>
            <button id="logout">Log Out</button>
          </ul>
        </nav>
        </div>
        
    )
}

export default NavbarComp;