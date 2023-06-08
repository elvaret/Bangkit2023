import React, { Component } from 'react';
import './Dashboard.css';
import NavbarComp from './NavbarComp/NavbarComp';
import HomeComp from './HomeComp/HomeComp';
import AboutComp from './AboutComp/AboutComp';
import ProductComp from './ProductComp/ProductComp';
import ContactComp from './ContactComp/ContactComp';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <NavbarComp />
        <HomeComp />
        <AboutComp />
        <ProductComp />
        <ContactComp />
      </div>
    );
  }
}

export default Dashboard;
