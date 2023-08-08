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

function NavBar() {

  useEffect(() => {
    // Custom JavaScript logic

    // NAVIGATION
    const navItemLinks = document.querySelectorAll('.nav__items a');
    const navLine = document.querySelector('.nav-line');

    const handleNavItemClick = (e) => {
      if (e.target.matches('.nav__items a')) {
        const navItemActive = e.target;
        document.querySelector('.nav--active').classList.remove('nav--active');
        navItemActive.classList.add('nav--active');
        setNavLine(navItemActive);
      }
    };

    const setNavLine = (navItemActive) => {
      const offsetLeft = navItemActive.getBoundingClientRect().left;
      const width = navItemActive.getBoundingClientRect().width;
      const left = offsetLeft + width / 2 - 10;
      navLine.style.transform = 'translateX(0)';
      navLine.style.left = left + 'px';
    };

    navItemLinks.forEach((link) => {
      link.addEventListener('click', handleNavItemClick);
    });

    // ASIDE
    const asideItemLinks = document.querySelectorAll('.aside__items a');
    const asideLine = document.querySelector('.aside-line');

    const handleAsideItemClick = (e) => {
      if (e.target.matches('.aside__items a')) {
        const asideItemActive = e.target;
        document.querySelector('.aside--active').classList.remove('aside--active');
        asideItemActive.classList.add('aside--active');
        setAsideLine(asideItemActive);
        setTimeout(() => {
          const menu = document.querySelector('button.menu');
          const aside = document.querySelector('aside');
          menu.classList.remove('show');
          aside.classList.remove('show');
        }, 400);
      }
    };

    const setAsideLine = (asideItemActive) => {
      const offsetTop = asideItemActive.getBoundingClientRect().top;
      const height = asideItemActive.getBoundingClientRect().height;
      const top = offsetTop + height / 2 - 15;
      asideLine.style.top = top + 'px';
    };

    asideItemLinks.forEach((link) => {
      link.addEventListener('click', handleAsideItemClick);
    });

    // TOGGLE MENU
    const menuButton = document.querySelector('button.menu');
    const aside = document.querySelector('aside');

    const handleMenuToggle = () => {
      menuButton.classList.toggle('show');
      aside.classList.toggle('show');
    };

    menuButton.addEventListener('click', handleMenuToggle);

    // SCROLLED NAVIGATION
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    const handleScroll = () => {
      const offsetTop = header.getBoundingClientRect().top;
      const height = header.getBoundingClientRect().height;
      const topHeader = offsetTop + height;
      if (window.scrollY >= topHeader) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listeners
    return () => {
      navItemLinks.forEach((link) => {
        link.removeEventListener('click', handleNavItemClick);
      });
      asideItemLinks.forEach((link) => {
        link.removeEventListener('click', handleAsideItemClick);
      });
      menuButton.removeEventListener('click', handleMenuToggle);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div>
      <div className="bg"></div>
      <nav className="padding-5">
        <img src={logo} alt="Logo image" />
        <div className="nav__items">
          <div className="nav-line"></div>
          <a href="#home" className="nav--active">Home</a>
          <a href="#service">Service</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav__buttons">
          <button><Link to='/user-login'>Login</Link></button>
          <button><Link to='/user-register'>Sign up</Link></button>
        </div>
      </nav>

      <button className="menu">
        <span></span><span></span><span></span>
      </button>

      <aside className="padding-5">
        <img src={logo} alt="Logo image" />
        <div className="aside__items">
          <div className="aside-line"></div>
          <a href="#home" className="aside--active">Home</a>
          <a href="#service">Service</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav__buttons">
          <button><Link to='/user-login'>Login</Link></button>
          <button><Link to='/user-register'>Sign up</Link></button>
        </div>
      </aside>
    </div>

  )
}

export default NavBar
