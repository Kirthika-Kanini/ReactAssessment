import React, { useEffect, useState, useRef } from 'react';
import '../style.css';
import logo from '../img/logo.svg';
import heroBanner from '../img/hero-banner.png';
import gallery1 from '../img/gallery-1.jpg';
import gallery2 from '../img/gallery-2.jpg';
import gallery3 from '../img/gallery-3.jpg';
import gallery4 from '../img/gallery-4.jpg';
import gallery5 from '../img/gallery-5.jpg';
import gallery6 from '../img/gallery-6.jpg';
import tileicon from '../img/title-icon.svg';
import serviceIcon1 from '../img/service-icon-1.svg';
import serviceIcon2 from '../img/service-icon-2.svg';
import serviceIcon3 from '../img/service-icon-3.svg';
import experienceBanner from '../img/experience-banner.png';
import expShape from '../img/exp-shape.svg';

import { BrowserRouter as Router, Link, Route, useNavigate } from 'react-router-dom';
function Footer() {
  return (
    <div>
      <footer className="padding-5">
        <div className="footer__left">
          <img src={logo} alt="Travelia Logo" />
          <p className="description">We always make our customer happy by providing as many choices as possible</p>
          <div className="social">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </div>
        </div>
        <ul className="footer__list">
        <h2>Navs</h2>
        <li><a href="#home" className="nav--active">Home</a></li>
        <li> <a href="#service">Service</a></li> 
         <li> <a href="#pricing">Pricing</a></li>
         <li> <a href="#about">About</a></li>
         <li> <a href="#contact">Contact</a></li>
        </ul>
       
        <div className="footer__right">
          <h2>Get in Touch</h2>
          <p className="description">Question or feedback? We'd love to hear from you.</p>
          <p className="description">Phone:6383145933</p>
          <p className="description">Email:kirthikakumar123@gmail.com</p>
          <p className="description"><Link to='/feedback'>Feedback</Link></p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
